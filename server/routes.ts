import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

// Schéma de validation strict pour l'API
const contactValidationSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide. Veuillez réessayer.'),
  phone: z.string().optional().refine((val) => {
    if (!val) return true; // Optional field
    // Regex qui accepte tous les numéros français y compris DOM-TOM (05)
    const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
    const cleanPhone = val.replace(/\s/g, '');
    return phoneRegex.test(cleanPhone);
  }, 'Numéro de téléphone français invalide (ex: 06 12 34 56 78, 05 94 12 34 56)'),
  budget: z.string().optional(),
  projectTypes: z.array(z.string()).optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  privacy: z.boolean().optional().default(true),
  newsletter: z.boolean().default(false),
});
import { sendContactEmail } from "./email";
import { createFormRateLimiter } from "./security-middleware";
import { subscribeToNewsletter, unsubscribeFromNewsletter, getNewsletterStats, updateNewsletterPreferences } from "./newsletter";
import { sendNewsletter, getNewsletterSubscribers } from "./newsletter-send";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission avec protection renforcée
  app.post("/api/contact", createFormRateLimiter(), async (req, res) => {
    try {
      const validatedData = contactValidationSchema.parse(req.body);
      
      // Stockage des données (retirer privacy qui n'est pas dans la DB car validation côté client seulement)
      const { privacy, ...contactData } = validatedData;

      const contact = await storage.createContact(contactData);
      
      // Afficher l'état de l'abonnement newsletter
      if (validatedData.newsletter) {
        console.log(`📧 ${validatedData.name} s'est abonné(e) à la newsletter`);
      }

      // Envoi de l'email de notification
      const recipientEmail = 'contact@weblifystudio.fr';
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

  // Endpoint pour demande de devis (envoi simple par email)
  app.post("/api/generate-quote", async (req, res) => {
    try {
      const calculatorData = req.body;
      
      // Validation des données essentielles
      if (!calculatorData.name || !calculatorData.email) {
        return res.status(400).json({ error: "Nom et email requis pour la demande de devis" });
      }

      // Calcul simple du prix estimé
      const estimatedPrice = calculatorData.totalPrice || "À définir";
      
      // Sauvegarde du contact avec les données du devis
      const contactData = {
        name: calculatorData.name,
        email: calculatorData.email,
        phone: calculatorData.phone || null,
        budget: estimatedPrice.toString(),
        projectTypes: calculatorData.projectTypes || ["Site vitrine"],
        message: `Demande de devis via calculateur:\n\nType de projet: ${calculatorData.projectType || "Non spécifié"}\nEstimation: ${estimatedPrice}€\n\nDétails:\n${JSON.stringify(calculatorData, null, 2)}`,
        newsletter: calculatorData.newsletter || false
      };
      
      const savedContact = await storage.createContact(contactData);
      
      // Envoi de l'email de notification à l'agence
      const emailResult = await sendContactEmail(contactData, 'contact@weblifystudio.fr');
      
      console.log(`📧 Demande de devis reçue de ${calculatorData.name} - Estimation: ${estimatedPrice}€`);
      
      res.json({
        success: true,
        message: "Votre demande de devis a été envoyée ! Notre équipe vous contactera dans les 24h pour vous proposer un devis personnalisé.",
        contact: savedContact,
        emailSent: emailResult.success
      });
      
    } catch (error) {
      console.error("Erreur demande devis:", error);
      res.status(500).json({ 
        error: "Erreur lors de l'envoi de la demande de devis",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Newsletter endpoints
  app.post("/api/newsletter/subscribe", createFormRateLimiter(), subscribeToNewsletter);
  app.get("/api/newsletter/unsubscribe", unsubscribeFromNewsletter);
  app.get("/api/newsletter/stats", getNewsletterStats);
  app.put("/api/newsletter/preferences/:email", updateNewsletterPreferences);
  app.post("/api/newsletter/send", createFormRateLimiter(), sendNewsletter);
  app.get("/api/newsletter/subscribers", getNewsletterSubscribers);

  const httpServer = createServer(app);
  return httpServer;
}