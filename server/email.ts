// Alternative simple - utilisation directe de fetch pour l'API Brevo
interface BrevoEmailData {
  sender: { name: string; email: string };
  to: { email: string }[];
  subject: string;
  htmlContent: string;
}

async function sendBrevoEmail(emailData: BrevoEmailData): Promise<{ success: boolean; error?: string }> {
  if (!process.env.BREVO_API_KEY) {
    return { success: false, error: 'Brevo API key not configured' };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.text();
      return { success: false, error: `Brevo API error: ${response.status} - ${errorData}` };
    }
  } catch (error) {
    return { success: false, error: `Network error: ${error}` };
  }
}

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
  
  if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const projectTypesText = contactData.projectTypes?.length 
      ? contactData.projectTypes.join(', ') 
      : 'Non spécifié';

    const emailData: BrevoEmailData = {
      sender: { name: 'Weblify Studio Contact', email: 'contact@weblify.fr' },
      to: [{ email: 'noah.delenclos@gmail.com' }],
      subject: `🔔 Nouveau contact Weblify Studio : ${contactData.name}`,
      htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #2563eb; margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            ✨ Nouveau message de contact
          </h1>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h2 style="color: #374151; margin-top: 0; font-size: 18px;">Informations du client</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280; width: 120px;">Nom :</td>
                <td style="padding: 8px 0; color: #111827;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Email :</td>
                <td style="padding: 8px 0; color: #111827;">
                  <a href="mailto:${contactData.email}" style="color: #2563eb; text-decoration: none;">
                    ${contactData.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Téléphone :</td>
                <td style="padding: 8px 0; color: #111827;">${contactData.phone || 'Non renseigné'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Budget :</td>
                <td style="padding: 8px 0; color: #111827;">${contactData.budget || 'Non spécifié'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Projet :</td>
                <td style="padding: 8px 0; color: #111827;">${projectTypesText}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Newsletter :</td>
                <td style="padding: 8px 0; color: #111827;">
                  ${contactData.newsletter ? 
                    '<span style="color: #059669; font-weight: bold;">✅ Inscrit(e)</span>' : 
                    '<span style="color: #6b7280;">❌ Non inscrit(e)</span>'
                  }
                </td>
              </tr>
            </table>
          </div>

          <div style="background-color: #fefefe; padding: 20px; border-left: 4px solid #2563eb; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0; font-size: 16px;">Message :</h3>
            <p style="color: #111827; line-height: 1.6; margin: 0;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </p>
          </div>

          <div style="background-color: #dbeafe; padding: 15px; border-radius: 6px; text-align: center;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              📧 Email envoyé automatiquement depuis le formulaire de contact Weblify Studio
            </p>
            <p style="margin: 5px 0 0 0; color: #64748b; font-size: 12px;">
              ${new Date().toLocaleString('fr-FR', { 
                timeZone: 'Europe/Paris',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${contactData.email}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              📧 Répondre au client
            </a>
          </div>
        </div>
      </div>
      `
    };

    return await sendBrevoEmail(emailData);

  } catch (error) {
    console.error('❌ Error sending email via Brevo:', error);
    return { success: false, error: `Failed to send email: ${error}` };
  }
}