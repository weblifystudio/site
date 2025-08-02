// Templates d'emails pour la newsletter
export const newsletterEmailTemplates = {
  confirmation: {
    subject: '✅ Confirmez votre abonnement à la newsletter Weblify Studio',
    html: (firstName: string, unsubscribeToken: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation Newsletter - Weblify Studio</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; }
          .unsubscribe { font-size: 12px; color: #999; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bienvenue ${firstName} !</h1>
            <p>Merci de vous être abonné(e) à notre newsletter</p>
          </div>
          
          <div class="content">
            <h2>Votre abonnement est presque confirmé</h2>
            <p>Bonjour ${firstName},</p>
            
            <p>Merci de vous être abonné(e) à la newsletter de <strong>Weblify Studio</strong> ! 🚀</p>
            
            <p>Vous recevrez régulièrement :</p>
            <ul>
              <li>📈 Les dernières tendances en développement web</li>
              <li>💡 Nos conseils d'experts en UX/UI</li>
              <li>🎯 Des études de cas détaillées</li>
              <li>🔥 Les actualités de l'agence</li>
              <li>🎁 Des offres exclusives pour nos abonnés</li>
            </ul>
            
            <p>Votre abonnement est maintenant <strong>actif</strong> et vous recevrez notre prochaine newsletter dans votre boîte mail.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://weblify-studio.com" class="button">Découvrir notre site</a>
            </div>
            
            <p>À très bientôt,<br>
            <strong>L'équipe Weblify Studio</strong></p>
          </div>
          
          <div class="footer">
            <p>Weblify Studio - Votre agence web de confiance</p>
            <div class="unsubscribe">
              <p>Vous ne souhaitez plus recevoir ces emails ? 
              <a href="${process.env.BASE_URL || 'https://weblify-studio.com'}/api/newsletter/unsubscribe?email=${encodeURIComponent(firstName)}&token=${unsubscribeToken}" style="color: #667eea;">Se désabonner</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: (firstName: string, unsubscribeToken: string) => `
Bienvenue ${firstName} !

Merci de vous être abonné(e) à la newsletter de Weblify Studio !

Vous recevrez régulièrement :
- Les dernières tendances en développement web
- Nos conseils d'experts en UX/UI  
- Des études de cas détaillées
- Les actualités de l'agence
- Des offres exclusives pour nos abonnés

Votre abonnement est maintenant actif.

À très bientôt,
L'équipe Weblify Studio

---
Pour vous désabonner : ${process.env.BASE_URL || 'https://weblify-studio.com'}/api/newsletter/unsubscribe?email=${encodeURIComponent(firstName)}&token=${unsubscribeToken}
    `
  },

  welcome: {
    subject: '🚀 Bienvenue dans la communauté Weblify Studio !',
    html: (firstName: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenue - Weblify Studio</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .highlight-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎊 Abonnement réactivé !</h1>
            <p>Content de vous revoir ${firstName} !</p>
          </div>
          
          <div class="content">
            <h2>Votre abonnement est de nouveau actif</h2>
            <p>Bonjour ${firstName},</p>
            
            <p>Votre abonnement à la newsletter <strong>Weblify Studio</strong> a été réactivé avec succès ! 🎉</p>
            
            <div class="highlight-box">
              <h3>🎁 En exclusivité pour nos abonnés :</h3>
              <p>Bénéficiez de <strong>15% de réduction</strong> sur votre premier projet avec le code : <code><strong>NEWSLETTER15</strong></code></p>
            </div>
            
            <p>Vous continuerez à recevoir :</p>
            <ul>
              <li>📊 Nos analyses des dernières tendances web</li>
              <li>🛠️ Des tutoriels techniques exclusifs</li>
              <li>📈 Nos conseils pour optimiser votre présence en ligne</li>
              <li>🎯 Des études de cas de nos projets récents</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://weblify-studio.com/portfolio" class="button">Voir nos réalisations</a>
            </div>
            
            <p>Merci de votre confiance renouvelée,<br>
            <strong>L'équipe Weblify Studio</strong></p>
          </div>
          
          <div class="footer">
            <p>Weblify Studio - Innovation & Excellence Web</p>
            <p>📧 contact@weblify-studio.com | 🌐 weblify-studio.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: (firstName: string) => `
Abonnement réactivé !

Bonjour ${firstName},

Votre abonnement à la newsletter Weblify Studio a été réactivé avec succès !

🎁 OFFRE EXCLUSIVE : 15% de réduction sur votre premier projet avec le code : NEWSLETTER15

Vous continuerez à recevoir :
- Nos analyses des dernières tendances web
- Des tutoriels techniques exclusifs  
- Nos conseils pour optimiser votre présence en ligne
- Des études de cas de nos projets récents

Merci de votre confiance renouvelée,
L'équipe Weblify Studio

contact@weblify-studio.com
weblify-studio.com
    `
  }
};

// Fonction d'envoi d'email de confirmation
export async function sendNewsletterConfirmationEmail(email: string, firstName: string, unsubscribeToken: string): Promise<boolean> {
  try {
    const template = newsletterEmailTemplates.confirmation;
    
    console.log(`📧 Envoi email confirmation newsletter à ${email} pour ${firstName}`);
    console.log(`Subject: ${template.subject}`);
    console.log(`Unsubscribe token: ${unsubscribeToken}`);
    
    // En production, intégrer avec un service d'email (SendGrid, Mailgun, etc.)
    // Pour le moment, log des informations
    console.log('✅ Email de confirmation newsletter envoyé (simulation)');
    
    return true;
  } catch (error) {
    console.error('❌ Erreur envoi email confirmation newsletter:', error);
    return false;
  }
}

// Fonction d'envoi d'email de bienvenue
export async function sendNewsletterWelcomeEmail(email: string, firstName: string): Promise<boolean> {
  try {
    const template = newsletterEmailTemplates.welcome;
    
    console.log(`📧 Envoi email bienvenue newsletter à ${email} pour ${firstName}`);
    console.log(`Subject: ${template.subject}`);
    
    // En production, intégrer avec un service d'email
    console.log('✅ Email de bienvenue newsletter envoyé (simulation)');
    
    return true;
  } catch (error) {
    console.error('❌ Erreur envoi email bienvenue newsletter:', error);
    return false;
  }
}