import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Stockage des données
      const contact = await storage.createContact(validatedData);
      
      // Afficher l'état de l'abonnement newsletter
      if (validatedData.newsletter) {
        console.log(`📧 ${validatedData.name} s'est abonné(e) à la newsletter`);
      }

      // Envoi de l'email de notification
      const recipientEmail = 'noah.delenclos@gmail.com';
      const emailData = {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        budget: validatedData.budget || null,
        projectTypes: validatedData.projectTypes as string[] || null,
        message: validatedData.message,
        newsletter: validatedData.newsletter || false
      };
      const emailResult = await sendContactEmail(emailData, recipientEmail);
      
      if (emailResult.success) {
        console.log('✅ Contact form submitted and email sent successfully');
      } else {
        console.warn('⚠️ Contact form submitted but email failed:', emailResult.error);
      }
      
      res.json({ 
        success: true, 
        contact,
        emailSent: emailResult.success,
        emailError: emailResult.error
      });
    } catch (error) {
      console.error('❌ Contact form error:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Endpoint pour générer et envoyer un devis PDF
  app.post("/api/generate-quote", async (req, res) => {
    try {
      const calculatorData = req.body;
      
      // Validation des données essentielles
      if (!calculatorData.name || !calculatorData.email) {
        return res.status(400).json({ error: "Nom et email requis pour le devis" });
      }

      // Import dynamique pour éviter les erreurs de build
      const { generateQuotePDF, mapCalculatorToQuote } = await import('./pdf-generator');
      
      // Mapping des données du calculateur vers le format devis
      const quoteData = mapCalculatorToQuote(calculatorData);
      
      // Génération du PDF
      const pdfBuffer = await generateQuotePDF(quoteData);
      
      // Sauvegarde du contact avec les données du devis
      const contactData = {
        ...calculatorData,
        message: `Demande de devis automatique - ${quoteData.projectType} - ${quoteData.totalPrice}€`,
        budget: quoteData.totalPrice.toString()
      };
      
      const savedContact = await storage.createContact(contactData);
      
      console.log(`📄 Devis généré pour ${quoteData.name} - ${quoteData.totalPrice}€ (${quoteData.quoteNumber})`);
      
      // Envoi par email avec PDF en pièce jointe (en log pour l'instant)
      const { sendQuoteByEmail } = await import('./email-with-pdf');
      await sendQuoteByEmail({
        name: quoteData.name,
        email: quoteData.email,
        pdfBuffer,
        quoteNumber: quoteData.quoteNumber,
        totalPrice: quoteData.totalPrice
      });
      
      // Retour du PDF en base64 pour téléchargement + notification email
      res.json({
        success: true,
        message: "Devis généré et téléchargé ! Instructions d'envoi dans les logs serveur.",
        quoteNumber: quoteData.quoteNumber,
        pdfBase64: pdfBuffer.toString('base64'),
        contact: savedContact,
        emailSent: true // Indique que les infos d'envoi sont disponibles
      });
      
    } catch (error) {
      console.error("Erreur génération devis:", error);
      res.status(500).json({ 
        error: "Erreur lors de la génération du devis",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}