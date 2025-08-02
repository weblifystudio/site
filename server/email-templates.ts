// Templates d'emails pour l'envoi de devis
export const emailTemplates = {
  // Email pour vous (Noah)
  forOwner: (data: { name: string; email: string; quoteNumber: string; totalPrice: number }) => ({
    subject: `🚀 Nouveau devis généré - ${data.quoteNumber} - ${data.name}`,
    text: `
Nouveau devis généré automatiquement depuis le calculateur Weblify Studio

CLIENT:
- Nom: ${data.name}
- Email: ${data.email}
- Montant: ${data.totalPrice}€

DEVIS:
- Numéro: ${data.quoteNumber}
- Date: ${new Date().toLocaleDateString('fr-FR')}
- PDF en pièce jointe

ACTIONS À FAIRE:
1. Vérifier le devis en pièce jointe
2. Le client a également reçu une copie
3. Contacter le client pour suivi si nécessaire

---
Weblify Studio - Système automatique
    `,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #3b82f6; color: white; padding: 20px; text-align: center;">
            <h1>🚀 Nouveau Devis Généré</h1>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
            <h2 style="color: #1e40af;">Détails du Client</h2>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Nom:</strong> ${data.name}</li>
                <li><strong>Email:</strong> ${data.email}</li>
                <li><strong>Montant:</strong> ${data.totalPrice}€</li>
            </ul>
            
            <h2 style="color: #1e40af;">Informations du Devis</h2>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Numéro:</strong> ${data.quoteNumber}</li>
                <li><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR')}</li>
                <li><strong>Statut:</strong> En attente de signature</li>
            </ul>
            
            <div style="background: #e0f2fe; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #0277bd; margin-top: 0;">Actions à effectuer:</h3>
                <ol>
                    <li>Vérifier le devis PDF en pièce jointe</li>
                    <li>Le client a reçu une copie automatiquement</li>
                    <li>Contacter le client pour suivi si nécessaire</li>
                </ol>
            </div>
        </div>
        
        <div style="background: #374151; color: white; padding: 15px; text-align: center; font-size: 12px;">
            Weblify Studio - Système de devis automatique
        </div>
    </div>
    `
  }),

  // Email pour le client
  forClient: (data: { name: string; quoteNumber: string; totalPrice: number }) => ({
    subject: `Votre devis Weblify Studio est prêt - ${data.quoteNumber}`,
    text: `
Bonjour ${data.name},

Merci pour votre intérêt pour nos services web !

Votre devis personnalisé est maintenant prêt :
- Numéro de devis : ${data.quoteNumber}
- Montant total : ${data.totalPrice}€
- Validité : 30 jours

Le devis détaillé est joint à cet email au format PDF.

PROCHAINES ÉTAPES :
1. Consultez le devis en pièce jointe
2. Si vous acceptez : signez le devis avec la mention "Bon pour accord"
3. Renvoyez-nous le devis signé par email
4. Nous vous contacterons pour lancer votre projet !

Des questions ? Répondez simplement à cet email ou appelez-nous.

Cordialement,
L'équipe Weblify Studio

---
🚀 Weblify Studio - Votre vision, notre expertise
contact@weblify-studio.fr
    `,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; padding: 25px; text-align: center;">
            <h1 style="margin: 0;">🚀 Weblify Studio</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Votre devis est prêt !</p>
        </div>
        
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #1f2937;">Bonjour <strong>${data.name}</strong>,</p>
            
            <p>Merci pour votre intérêt pour nos services web ! Votre devis personnalisé est maintenant prêt.</p>
            
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #0c4a6e; margin-top: 0;">📄 Détails de votre devis</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin: 8px 0;"><strong>Numéro :</strong> ${data.quoteNumber}</li>
                    <li style="margin: 8px 0;"><strong>Montant :</strong> ${data.totalPrice}€</li>
                    <li style="margin: 8px 0;"><strong>Validité :</strong> 30 jours</li>
                </ul>
            </div>
            
            <div style="background: #f0fdf4; border: 1px solid #22c55e; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #15803d; margin-top: 0;">✅ Prochaines étapes</h3>
                <ol style="color: #166534; padding-left: 20px;">
                    <li style="margin: 8px 0;">Consultez le devis détaillé en pièce jointe</li>
                    <li style="margin: 8px 0;">Si vous acceptez : signez avec la mention <strong>"Bon pour accord"</strong></li>
                    <li style="margin: 8px 0;">Renvoyez-nous le devis signé par email</li>
                    <li style="margin: 8px 0;">Nous lançons votre projet immédiatement !</li>
                </ol>
            </div>
            
            <p>Des questions ? Répondez simplement à cet email ou contactez-nous directement.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:contact@weblify-studio.fr" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    📧 Nous contacter
                </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
                Cordialement,<br>
                <strong>L'équipe Weblify Studio</strong>
            </p>
        </div>
        
        <div style="background: #374151; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 16px; font-weight: bold;">🚀 Weblify Studio</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Votre vision, notre expertise</p>
            <p style="margin: 10px 0 0 0; font-size: 12px;">contact@weblify-studio.fr</p>
        </div>
    </div>
    `
  })
};