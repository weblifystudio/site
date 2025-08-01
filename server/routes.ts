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
      const recipientEmail = process.env.CONTACT_EMAIL || 'contact@weblify.fr';
      const emailData = {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        budget: validatedData.budget || null,
        projectTypes: validatedData.projectTypes as string[] || null,
        message: validatedData.message,
        newsletter: validatedData.newsletter
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

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contacts" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
