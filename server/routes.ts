import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, emails } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail } from "./email";
import { addToNewsletter } from "./newsletter";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";
import { requireAuth, loginHandler, logoutHandler, statusHandler } from "./auth";

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

  // Routes d'authentification admin
  app.post("/api/admin/login", loginHandler);
  app.post("/api/admin/logout", requireAuth, logoutHandler);
  app.get("/api/admin/status", requireAuth, statusHandler);

  // Routes admin sécurisées pour les emails
  app.get("/api/admin/emails", requireAuth, async (req, res) => {
    try {
      const allEmails = await db.select().from(emails).orderBy(desc(emails.createdAt));
      res.json({ success: true, emails: allEmails });
    } catch (error) {
      console.error('❌ Error fetching emails:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve emails" 
      });
    }
  });

  // Marquer un email comme lu (sécurisé)
  app.patch("/api/admin/emails/:id/read", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await db.update(emails).set({ isRead: true }).where(eq(emails.id, id));
      res.json({ success: true });
    } catch (error) {
      console.error('❌ Error marking email as read:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to mark email as read" 
      });
    }
  });

  // Envoyer un email depuis l'interface admin
  app.post("/api/admin/send-email", requireAuth, async (req, res) => {
    try {
      const { to, subject, content } = req.body;
      
      if (!to || !subject || !content) {
        return res.status(400).json({
          success: false,
          message: "Destinataire, sujet et contenu requis"
        });
      }

      // Stocker l'email envoyé dans la base
      await db.insert(emails).values({
        fromName: 'Noah Delenclos (Weblify Studio)',
        fromEmail: 'noah.delenclos@gmail.com',
        toEmail: to,
        subject: subject,
        content: content,
        isRead: true // Les emails envoyés sont marqués comme "lus"
      });

      console.log(`📧 Email envoyé depuis l'admin vers ${to}: ${subject}`);
      
      res.json({ 
        success: true, 
        message: "Email envoyé et stocké avec succès" 
      });
    } catch (error) {
      console.error('❌ Error sending admin email:', error);
      res.status(500).json({ 
        success: false, 
        message: "Erreur lors de l'envoi de l'email" 
      });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ 
          success: false, 
          error: "Adresse email invalide" 
        });
      }

      const result = await addToNewsletter(email);
      
      if (result.success) {
        console.log(`📧 Newsletter subscription successful for: ${email}`);
        res.json({ success: true });
      } else {
        console.error('Newsletter subscription failed:', result.error);
        res.status(500).json({ 
          success: false, 
          error: result.error 
        });
      }
    } catch (error) {
      console.error('Newsletter API error:', error);
      res.status(500).json({ 
        success: false, 
        error: "Erreur interne du serveur" 
      });
    }
  });

  // Admin route pour voir les abonnés newsletter
  app.get("/api/newsletter/subscribers", async (req, res) => {
    try {
      const { getAllActiveSubscribers } = await import("./newsletter");
      const result = await getAllActiveSubscribers();
      
      if (result.success) {
        res.json({ success: true, subscribers: result.subscribers });
      } else {
        res.status(500).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error('Newsletter subscribers fetch error:', error);
      res.status(500).json({ 
        success: false, 
        error: "Erreur lors de la récupération des abonnés" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
