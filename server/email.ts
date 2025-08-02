// Système d'email avec MailerSend (gratuit 3000 emails/mois)
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string | null;
  budget?: string | null;
  projectTypes?: string[] | null;
  message: string;
  newsletter?: boolean;
}

export async function sendContactEmail(
  contactData: ContactEmailData,
  recipientEmail: string
): Promise<{ success: boolean; error?: string }> {
  
  try {
    // Affichage dans les logs pour debug
    const projectTypesText = contactData.projectTypes?.length 
      ? contactData.projectTypes.join(', ') 
      : 'Non spécifié';

    console.log(`📧 Nouveau contact de ${contactData.name} (${contactData.email})`);

    // Vérifier si la clé API MailerSend est disponible
    if (!process.env.MAILERSEND_API_KEY) {
      console.warn('⚠️ MAILERSEND_API_KEY non configurée, email affiché en log uniquement');
      
      console.log(`
📧 NOUVEAU CONTACT REÇU
==========================================
Nom: ${contactData.name}
Email: ${contactData.email}
Téléphone: ${contactData.phone || 'Non renseigné'}
Budget: ${contactData.budget || 'Non spécifié'}
Type de projet: ${projectTypesText}
Newsletter: ${contactData.newsletter ? 'Inscrit(e)' : 'Non inscrit(e)'}

Message:
${contactData.message}

Date: ${new Date().toLocaleString('fr-FR', { 
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
==========================================
      `);
      
      return { success: true };
    }

    // Configuration MailerSend
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    const sentFrom = new Sender("noreply@weblify-studio.fr", "Weblify Studio");
    const recipients = [new Recipient(recipientEmail, "Noah Delenclos")];

    // Contenu de l'email en HTML
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Nouveau contact Weblify Studio</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-left: 10px; }
            .message { background: white; padding: 15px; border-left: 4px solid #3b82f6; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 Nouveau contact - Weblify Studio</h1>
            </div>
            <div class="content">
                <div class="field">
                    <span class="label">Nom :</span>
                    <span class="value">${contactData.name}</span>
                </div>
                <div class="field">
                    <span class="label">Email :</span>
                    <span class="value">${contactData.email}</span>
                </div>
                <div class="field">
                    <span class="label">Téléphone :</span>
                    <span class="value">${contactData.phone || 'Non renseigné'}</span>
                </div>
                <div class="field">
                    <span class="label">Budget :</span>
                    <span class="value">${contactData.budget || 'Non spécifié'}</span>
                </div>
                <div class="field">
                    <span class="label">Type de projet :</span>
                    <span class="value">${projectTypesText}</span>
                </div>
                <div class="field">
                    <span class="label">Newsletter :</span>
                    <span class="value">${contactData.newsletter ? 'Inscrit(e)' : 'Non inscrit(e)'}</span>
                </div>
                <div class="message">
                    <h3>Message :</h3>
                    <p>${contactData.message.replace(/\n/g, '<br>')}</p>
                </div>
                <div style="margin-top: 20px; font-size: 0.9em; color: #666;">
                    <strong>Date :</strong> ${new Date().toLocaleString('fr-FR', { 
                      timeZone: 'Europe/Paris',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`🚀 Nouveau contact Weblify Studio : ${contactData.name}`)
      .setHtml(htmlContent)
      .setText(`
Nouveau contact depuis le site Weblify Studio

Informations du client :
- Nom : ${contactData.name}
- Email : ${contactData.email}
- Téléphone : ${contactData.phone || 'Non renseigné'}
- Budget : ${contactData.budget || 'Non spécifié'}
- Type de projet : ${projectTypesText}
- Newsletter : ${contactData.newsletter ? 'Inscrit(e)' : 'Non inscrit(e)'}

Message :
${contactData.message}

Date : ${new Date().toLocaleString('fr-FR', { 
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
      `);

    await mailerSend.email.send(emailParams);
    console.log('✅ Email envoyé avec succès via MailerSend');
    
    return { success: true };

  } catch (error) {
    console.error('❌ Erreur envoi email MailerSend:', error);
    
    // Fallback : afficher en log si l'envoi échoue
    const projectTypesText = contactData.projectTypes?.length 
      ? contactData.projectTypes.join(', ') 
      : 'Non spécifié';
      
    console.log(`
📧 NOUVEAU CONTACT (Email failed, logged instead)
==========================================
Nom: ${contactData.name}
Email: ${contactData.email}
Téléphone: ${contactData.phone || 'Non renseigné'}
Budget: ${contactData.budget || 'Non spécifié'}
Type de projet: ${projectTypesText}
Newsletter: ${contactData.newsletter ? 'Inscrit(e)' : 'Non inscrit(e)'}

Message:
${contactData.message}
==========================================
    `);
    
    return { success: false, error: `Failed to send email: ${error}` };
  }
}