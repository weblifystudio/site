import sgMail from '@sendgrid/mail';

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
    const projectTypesText = contactData.projectTypes?.length 
      ? contactData.projectTypes.join(', ') 
      : 'Non spécifié';

    // Affichage dans les logs pour référence
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

    // Configuration SendGrid pour envoi d'email réel
    const sendGridApiKey = process.env.SENDGRID_API_KEY;
    
    if (!sendGridApiKey) {
      console.warn('⚠️ SENDGRID_API_KEY non configuré - Mode simulation activé');
      console.log(`📧 SIMULATION - Email à envoyer à : ${recipientEmail}`);
      return { success: true };
    }

    // Configuration SendGrid
    sgMail.setApiKey(sendGridApiKey);

    // Template HTML professionnel pour l'email
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau Contact - Weblify Studio</title>
        <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .info-row { margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 4px; }
            .label { font-weight: bold; color: #495057; }
            .value { color: #212529; }
            .message-box { background: #e7f3ff; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; }
            .contact-btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 Nouveau Contact</h1>
                <p>Demande de projet via le site web</p>
            </div>
            
            <div class="content">
                <h2>Informations du contact</h2>
                
                <div class="info-row">
                    <span class="label">👤 Nom :</span>
                    <span class="value">${contactData.name}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">📧 Email :</span>
                    <span class="value">${contactData.email}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">📱 Téléphone :</span>
                    <span class="value">${contactData.phone || 'Non renseigné'}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">💰 Budget :</span>
                    <span class="value">${contactData.budget || 'Non spécifié'}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">🎯 Type de projet :</span>
                    <span class="value">${projectTypesText}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">📰 Newsletter :</span>
                    <span class="value">${contactData.newsletter ? '✅ Inscrit(e)' : '❌ Non inscrit(e)'}</span>
                </div>
                
                <div class="message-box">
                    <h3>💬 Message :</h3>
                    <p>${contactData.message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="mailto:${contactData.email}" class="contact-btn">Répondre au client</a>
                </div>
                
                <p><small>📅 Reçu le ${new Date().toLocaleString('fr-FR', { 
                  timeZone: 'Europe/Paris',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</small></p>
            </div>
            
            <div class="footer">
                <p><strong>Weblify Studio</strong> - Notification automatique</p>
                <p>Système de contact du site web</p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Version texte pour compatibilité
    const emailText = `
NOUVEAU CONTACT - Weblify Studio
================================

Nom: ${contactData.name}
Email: ${contactData.email}
Téléphone: ${contactData.phone || 'Non renseigné'}
Budget: ${contactData.budget || 'Non spécifié'}
Type de projet: ${projectTypesText}
Newsletter: ${contactData.newsletter ? 'Inscrit(e)' : 'Non inscrit(e)'}

MESSAGE:
${contactData.message}

Date: ${new Date().toLocaleString('fr-FR', { 
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

Pour répondre au client: ${contactData.email}
    `;

    // Configuration de l'email
    const emailConfig = {
      to: recipientEmail, // contact@weblifystudio.fr
      from: {
        email: 'noreply@weblifystudio.fr',
        name: 'Weblify Studio - Contact'
      },
      replyTo: contactData.email, // Réponse directe au client
      subject: `🚀 Nouveau contact: ${contactData.name} - ${projectTypesText}`,
      text: emailText,
      html: emailHTML,
    };

    // Envoi de l'email
    await sgMail.send(emailConfig);
    
    console.log(`✅ Email de contact envoyé à ${recipientEmail} via SendGrid`);
    return { success: true };

  } catch (error) {
    console.error('❌ Erreur envoi email contact:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}