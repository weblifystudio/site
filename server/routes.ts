import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
// Email système supprimé par l'utilisateur

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

      // Log simple du contact (email système supprimé)
      console.log(`📧 Nouveau contact: ${validatedData.name} (${validatedData.email})`);
      
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
      const { mapCalculatorToQuote } = await import('./pdf-generator');
      
      // Mapping des données du calculateur vers le format devis
      const quoteData = mapCalculatorToQuote(calculatorData);
      
      // Sauvegarde du contact avec les données du devis
      const contactData = {
        ...calculatorData,
        message: `Demande de devis automatique - ${quoteData.projectType} - ${quoteData.totalPrice}€`,
        budget: quoteData.totalPrice.toString()
      };
      
      const savedContact = await storage.createContact(contactData);
      
      // Génération du devis HTML avec le beau design minimaliste
      const { generateQuoteHTML } = await import('./pdf-generator-simple');
      const htmlContent = await generateQuoteHTML(quoteData);
      
      console.log(`📄 Devis HTML généré pour ${quoteData.name} - ${quoteData.totalPrice}€ (${quoteData.quoteNumber})`);
      
      // Configuration de l'en-tête pour UTF-8
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      
      // Retour du HTML en base64 pour téléchargement direct avec encodage UTF-8
      res.json({
        success: true,
        message: "Devis généré et téléchargé ! Ouvrez le fichier HTML pour l'imprimer en PDF.",
        quoteNumber: quoteData.quoteNumber,
        htmlContent: Buffer.from(htmlContent, 'utf8').toString('base64'),
        contact: savedContact,
        isHtml: true
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