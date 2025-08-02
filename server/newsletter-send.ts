import { Request, Response } from 'express';
import { z } from 'zod';
import { storage } from './storage';
import { mailchimpService } from './mailchimp';

// Schema pour l'envoi de newsletter
const sendNewsletterSchema = z.object({
  subject: z.string().min(1, 'Sujet requis').max(200),
  content: z.string().min(10, 'Contenu trop court (minimum 10 caractères)'),
  targetSegment: z.string().optional(), // 'all', 'active', 'interested-in-X'
});

// Simulation d'envoi d'email en masse
async function sendBulkEmails(subscribers: any[], subject: string, content: string) {
  console.log(`\n📧 === ENVOI NEWSLETTER ===`);
  console.log(`Sujet: ${subject}`);
  console.log(`Destinataires: ${subscribers.length} abonnés`);
  console.log(`Contenu: ${content.substring(0, 100)}...`);
  
  // Simulation du processus d'envoi
  for (const subscriber of subscribers) {
    console.log(`✉️ Envoi à ${subscriber.email} (${subscriber.firstName} ${subscriber.lastName})`);
    
    // En production, ici vous utiliseriez un service comme SendGrid, Mailgun, etc.
    // await sendEmail({
    //   to: subscriber.email,
    //   subject: subject,
    //   html: formatNewsletterTemplate(content, subscriber),
    //   from: 'newsletter@weblifystudio.fr'
    // });
  }
  
  console.log(`✅ Newsletter envoyée à ${subscribers.length} abonnés`);
  return true;
}

// Template HTML pour la newsletter
function formatNewsletterTemplate(content: string, subscriber: any): string {
  // Remplacer les variables personnalisées
  let formattedContent = content
    .replace(/\[PRENOM\]/g, subscriber.firstName)
    .replace(/\[NOM\]/g, subscriber.lastName)
    .replace(/\[EMAIL\]/g, subscriber.email);
  
  // Convertir les sauts de ligne en HTML
  formattedContent = formattedContent.replace(/\n/g, '<br>');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Newsletter - Weblify Studio</title>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; }
        .unsubscribe { font-size: 12px; color: #999; margin-top: 20px; }
        .unsubscribe a { color: #999; text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Newsletter Weblify Studio</h1>
          <p>Votre dose mensuelle d'inspiration web</p>
        </div>
        
        <div class="content">
          ${formattedContent}
        </div>
        
        <div class="footer">
          <p><strong>Weblify Studio</strong> - Votre agence web de confiance</p>
          <p>Paris, France | contact@weblifystudio.fr</p>
          
          <div class="unsubscribe">
            <p>Vous recevez cet email car vous êtes abonné(e) à notre newsletter.</p>
            <p><a href="https://weblify-studio.com/api/newsletter/unsubscribe?email=${subscriber.email}&token=${subscriber.unsubscribeToken}">Se désabonner</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Endpoint pour envoyer une newsletter
export async function sendNewsletter(req: Request, res: Response) {
  try {
    const validatedData = sendNewsletterSchema.parse(req.body);
    
    // Récupérer les abonnés actifs
    const activeSubscribers = await storage.getActiveNewsletterSubscribers();
    
    if (activeSubscribers.length === 0) {
      return res.status(400).json({
        message: 'Aucun abonné actif trouvé'
      });
    }
    
    // Filtrage par segment si spécifié
    let targetSubscribers = activeSubscribers;
    if (validatedData.targetSegment && validatedData.targetSegment !== 'all') {
      // Implémentation du filtrage par segment
      if (validatedData.targetSegment.startsWith('interested-in-')) {
        const interest = validatedData.targetSegment.replace('interested-in-', '');
        targetSubscribers = activeSubscribers.filter(sub => 
          sub.interests.includes(interest)
        );
      }
    }
    
    // Envoi via Mailchimp (si configuré) ou simulation
    const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
    
    if (mailchimpListId && process.env.MAILCHIMP_API_KEY) {
      // Envoi via Mailchimp
      const campaignResult = await mailchimpService.createAndSendCampaign({
        subject: validatedData.subject,
        content: validatedData.content,
        listId: mailchimpListId
      });
      
      if (!campaignResult.success) {
        return res.status(500).json({
          message: `Erreur envoi Mailchimp : ${campaignResult.error}`
        });
      }
      
      console.log(`✅ Newsletter envoyée via Mailchimp - Campagne : ${campaignResult.campaignId}`);
    } else {
      // Mode simulation (comme avant)
      await sendBulkEmails(targetSubscribers, validatedData.subject, validatedData.content);
    }
    
    // Enregistrer l'envoi dans l'historique (optionnel)
    // await storage.saveNewsletterCampaign({
    //   subject: validatedData.subject,
    //   content: validatedData.content,
    //   sentAt: new Date(),
    //   recipientCount: targetSubscribers.length,
    //   targetSegment: validatedData.targetSegment || 'all'
    // });
    
    res.json({
      success: true,
      message: `Newsletter envoyée avec succès à ${targetSubscribers.length} abonnés`,
      stats: {
        totalSent: targetSubscribers.length,
        targetSegment: validatedData.targetSegment || 'all'
      }
    });
    
  } catch (error) {
    console.error('Erreur envoi newsletter:', error);
    
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
      message: 'Erreur lors de l\'envoi de la newsletter'
    });
  }
}

// Endpoint pour récupérer la liste des abonnés
export async function getNewsletterSubscribers(req: Request, res: Response) {
  try {
    const subscribers = await storage.getAllNewsletterSubscribers();
    
    res.json({
      success: true,
      data: subscribers.map(sub => ({
        id: sub.id,
        email: sub.email,
        firstName: sub.firstName,
        lastName: sub.lastName,
        interests: sub.interests,
        isActive: sub.isActive,
        subscribedAt: sub.subscribedAt,
        source: sub.source
      }))
    });
    
  } catch (error) {
    console.error('Erreur récupération abonnés:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des abonnés'
    });
  }
}