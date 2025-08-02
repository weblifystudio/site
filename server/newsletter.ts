import { Request, Response } from 'express';
import { z } from 'zod';
import { storage } from './storage';
import { sendNewsletterConfirmationEmail, sendNewsletterWelcomeEmail } from './email-templates';
import { mailchimpService } from './mailchimp';

// Validation des données newsletter
const newsletterSchema = z.object({
  email: z.string().email('Email invalide').min(1, 'Email requis'),
  firstName: z.string().min(2, 'Prénom requis (min 2 caractères)').max(50),
  lastName: z.string().min(2, 'Nom requis (min 2 caractères)').max(50),
  interests: z.array(z.string()).optional().default([]),
  source: z.string().optional().default('website'),
});

const unsubscribeSchema = z.object({
  email: z.string().email('Email invalide'),
  token: z.string().min(1, 'Token requis'),
});

// Génération de token de désabonnement sécurisé
function generateUnsubscribeToken(email: string): string {
  const timestamp = Date.now();
  const secret = process.env.NEWSLETTER_SECRET || 'default-secret-key';
  const data = `${email}:${timestamp}:${secret}`;
  
  // Simple hash (en production, utiliser crypto.createHash)
  return Buffer.from(data).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
}

// Validation du token de désabonnement
function validateUnsubscribeToken(email: string, token: string): boolean {
  // En production, implémenter une validation plus robuste avec crypto
  return token.length === 32;
}

// Inscription à la newsletter
export async function subscribeToNewsletter(req: Request, res: Response) {
  try {
    const validatedData = newsletterSchema.parse(req.body);
    
    // Vérifier si l'email existe déjà
    const existingSubscriber = await storage.getNewsletterSubscriber(validatedData.email);
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({
          message: 'Cet email est déjà abonné à notre newsletter'
        });
      } else {
        // Réactiver l'abonnement
        await storage.updateNewsletterSubscriber(validatedData.email, {
          isActive: true,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          interests: validatedData.interests,
          subscribedAt: new Date(),
        });
        
        await sendNewsletterWelcomeEmail(validatedData.email, validatedData.firstName);
        
        return res.json({
          success: true,
          message: 'Abonnement réactivé avec succès !'
        });
      }
    }
    
    // Créer un nouvel abonnement
    const unsubscribeToken = generateUnsubscribeToken(validatedData.email);
    
    const subscriber = await storage.createNewsletterSubscriber({
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      interests: validatedData.interests,
      source: validatedData.source,
      unsubscribeToken,
      isActive: true,
    });
    
    // Ajouter à Mailchimp (si configuré)
    const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
    if (mailchimpListId) {
      const mailchimpResult = await mailchimpService.addSubscriber({
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        interests: validatedData.interests,
        source: validatedData.source
      }, mailchimpListId);
      
      if (mailchimpResult.success) {
        console.log(`✅ Abonné ajouté à Mailchimp : ${validatedData.email}`);
      } else {
        console.warn(`⚠️ Erreur Mailchimp : ${mailchimpResult.error}`);
      }
    }

    // Envoyer email de confirmation
    await sendNewsletterConfirmationEmail(
      validatedData.email, 
      validatedData.firstName,
      unsubscribeToken
    );
    
    res.json({
      success: true,
      message: 'Inscription réussie ! Vérifiez votre email pour confirmer votre abonnement.'
    });
    
  } catch (error) {
    console.error('Erreur inscription newsletter:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Données invalides',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    
    res.status(500).json({
      message: 'Erreur lors de l\'inscription à la newsletter'
    });
  }
}

// Désabonnement de la newsletter
export async function unsubscribeFromNewsletter(req: Request, res: Response) {
  try {
    const { email, token } = unsubscribeSchema.parse(req.query);
    
    // Valider le token
    if (!validateUnsubscribeToken(email, token)) {
      return res.status(400).json({
        message: 'Token de désabonnement invalide'
      });
    }
    
    // Vérifier si l'abonnement existe
    const subscriber = await storage.getNewsletterSubscriber(email);
    if (!subscriber) {
      return res.status(404).json({
        message: 'Abonnement introuvable'
      });
    }
    
    // Désactiver l'abonnement
    await storage.updateNewsletterSubscriber(email, {
      isActive: false,
      unsubscribedAt: new Date(),
    });
    
    res.json({
      success: true,
      message: 'Désabonnement réussi. Vous ne recevrez plus nos newsletters.'
    });
    
  } catch (error) {
    console.error('Erreur désabonnement newsletter:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Paramètres invalides',
        errors: error.errors
      });
    }
    
    res.status(500).json({
      message: 'Erreur lors du désabonnement'
    });
  }
}

// Obtenir les statistiques de la newsletter (admin)
export async function getNewsletterStats(req: Request, res: Response) {
  try {
    const stats = await storage.getNewsletterStats();
    
    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Erreur stats newsletter:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
}

// Mise à jour des préférences d'un abonné
export async function updateNewsletterPreferences(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const { interests, firstName, lastName } = req.body;
    
    const subscriber = await storage.getNewsletterSubscriber(email);
    if (!subscriber || !subscriber.isActive) {
      return res.status(404).json({
        message: 'Abonnement introuvable ou inactif'
      });
    }
    
    await storage.updateNewsletterSubscriber(email, {
      interests: interests || subscriber.interests,
      firstName: firstName || subscriber.firstName,
      lastName: lastName || subscriber.lastName,
    });
    
    res.json({
      success: true,
      message: 'Préférences mises à jour avec succès'
    });
    
  } catch (error) {
    console.error('Erreur mise à jour préférences:', error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour des préférences'
    });
  }
}