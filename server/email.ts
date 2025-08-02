// Système d'email autonome avec base de données locale
import { db } from "./db";
import { emails } from "@shared/schema";

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

    // Stockage de l'email dans la base de données locale
    const emailContent = `
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
    `.trim();

    // Sauvegarde dans la base de données
    await db.insert(emails).values({
      fromName: contactData.name,
      fromEmail: contactData.email,
      toEmail: 'noah.delenclos@gmail.com',
      subject: `Nouveau contact Weblify Studio : ${contactData.name}`,
      content: emailContent,
    });

    console.log(`📧 Email de ${contactData.name} stocké dans la base de données`);
    return { success: true };

  } catch (error) {
    console.error('❌ Error processing contact email:', error);
    return { success: false, error: `Failed to process email: ${error}` };
  }
}