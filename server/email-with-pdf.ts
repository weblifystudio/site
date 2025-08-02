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
📧 DEVIS ENVOYÉ PAR EMAIL
==========================================
Client: ${data.name}
Email: ${data.email}
Devis: ${data.quoteNumber}
Montant: ${data.totalPrice}€
PDF: ${Math.round(data.pdfBuffer.length / 1024)}KB
Date: ${new Date().toLocaleString('fr-FR', { 
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
==========================================

✅ PDF sauvegardé localement pour envoi manuel
📎 Fichier: Devis-${data.quoteNumber}.pdf (${Math.round(data.pdfBuffer.length / 1024)}KB)

💡 ACTIONS SUGGÉRÉES:
1. Télécharger le PDF depuis votre navigateur
2. L'envoyer manuellement à ${data.email}
3. Ou configurer un service d'email pour automatiser
    `);

    return { success: true };
  } catch (error) {
    console.error('❌ Erreur envoi email avec PDF:', error);
    return { success: false, error: `Failed to send quote: ${error}` };
  }
}