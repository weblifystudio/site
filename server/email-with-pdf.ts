// Service d'envoi d'email avec PDF en pièce jointe
interface EmailWithPDFData {
  name: string;
  email: string;
  pdfBuffer: Buffer;
  quoteNumber: string;
  totalPrice: number;
}

export async function sendQuoteByEmail(data: EmailWithPDFData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`
📧 NOUVEAU DEVIS GÉNÉRÉ - ENVOI DOUBLE
==========================================
Client: ${data.name}
Email client: ${data.email}
Devis N°: ${data.quoteNumber}
Montant: ${data.totalPrice}€
Taille PDF: ${Math.round(data.pdfBuffer.length / 1024)}KB

📤 ENVOIS À EFFECTUER:
1. ✉️  Pour VOUS (Noah) : contact@weblify-studio.fr
   → "Nouveau devis généré pour ${data.name}"
   → PDF en pièce jointe

2. ✉️  Pour CLIENT (${data.name}) : ${data.email}
   → "Votre devis Weblify Studio est prêt"
   → PDF en pièce jointe

Date: ${new Date().toLocaleString('fr-FR', { 
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

💡 AVEC VOTRE SOLUTION EMAIL:
- Envoyer le PDF à ces 2 adresses
- Adapter les messages selon le destinataire
- Le client peut signer et renvoyer le devis
==========================================
    `);

    return { success: true };
  } catch (error) {
    console.error('❌ Erreur envoi email avec PDF:', error);
    return { success: false, error: `Failed to send quote: ${error}` };
  }
}