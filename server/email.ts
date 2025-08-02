// Système de contact simplifié - utilisateur gère ses propres emails
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

  } catch (error) {
    console.error('❌ Erreur traitement contact:', error);
    return { success: false, error: `Failed to process contact: ${error}` };
  }
}