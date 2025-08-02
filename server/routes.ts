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
      const { generateQuoteHTML } = await import('./pdf-generator-simple');
      const { mapCalculatorToQuote } = await import('./pdf-generator');
      
      // Mapping des données du calculateur vers le format devis
      const quoteData = mapCalculatorToQuote(calculatorData);
      
      // Génération du HTML simple (solution temporaire sans Puppeteer)
      const htmlContent = await generateQuoteHTML(quoteData);
      
      // Sauvegarde du contact avec les données du devis
      const contactData = {
        ...calculatorData,
        message: `Demande de devis automatique - ${quoteData.projectType} - ${quoteData.totalPrice}€`,
        budget: quoteData.totalPrice.toString()
      };
      
      const savedContact = await storage.createContact(contactData);
      
      // Log pour information sur le devis généré
      console.log(`📄 Devis HTML généré pour ${quoteData.name} - ${quoteData.totalPrice}€ (${quoteData.quoteNumber})`);
      
      // Retour du HTML en base64 pour ouverture dans nouvel onglet
      res.json({
        success: true,
        message: "Devis généré ! Ouverture dans un nouvel onglet pour impression PDF.",
        quoteNumber: quoteData.quoteNumber,
        htmlContent: Buffer.from(htmlContent).toString('base64'),
        contact: savedContact,
        isHtml: true // Indique que c'est du HTML, pas du PDF
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