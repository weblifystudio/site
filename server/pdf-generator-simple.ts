// Générateur de devis HTML simple (solution temporaire sans Puppeteer)
export interface QuoteData {
  quoteNumber: string;
  date: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: 'vitrine' | 'premium' | 'ecommerce' | 'sur-mesure';
  pages: number;
  features: string[];
  timeline: string;
  totalPrice: number;
}

// Fonction utilitaire pour convertir le type de projet en label
function getWebsiteTypeLabel(projectType: string): string {
  const labels: Record<string, string> = {
    'vitrine': 'Site Vitrine',
    'premium': 'Site Premium', 
    'ecommerce': 'Site E-commerce',
    'sur-mesure': 'Site Sur-Mesure'
  };
  return labels[projectType] || projectType;
}

// Génère un HTML de devis que l'utilisateur peut imprimer en PDF
export async function generateQuoteHTML(data: QuoteData): Promise<string> {
  try {
    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Devis ${data.quoteNumber} - Weblify Studio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
            color: #1f2937;
            line-height: 1.6;
            background: white;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .header {
            background: linear-gradient(135deg, #3b82f6, #1e40af);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .tagline {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .quote-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .client-info, .quote-details {
            flex: 1;
        }
        
        .client-info {
            margin-right: 40px;
        }
        
        h2 {
            color: #1e40af;
            font-size: 20px;
            margin-bottom: 15px;
            border-bottom: 1px solid #3b82f6;
            padding-bottom: 5px;
        }
        
        .info-item {
            margin-bottom: 8px;
        }
        
        .info-label {
            font-weight: 600;
            color: #374151;
        }
        
        .project-details {
            background: #f8fafc;
            padding: 30px;
            border-radius: 10px;
            margin: 30px 0;
        }
        
        .feature-list {
            list-style: none;
            margin: 20px 0;
        }
        
        .feature-list li {
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .feature-list li:before {
            content: "✓";
            color: #059669;
            font-weight: bold;
            margin-right: 10px;
        }
        
        .pricing {
            background: #f0f9ff;
            border: 2px solid #0ea5e9;
            border-radius: 10px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
        }
        
        .total-price {
            font-size: 36px;
            font-weight: bold;
            color: #0c4a6e;
            margin-bottom: 10px;
        }
        
        .legal {
            font-size: 12px;
            color: #6b7280;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }
        
        .signature-zone {
            margin-top: 40px;
            padding: 30px;
            border: 2px dashed #d1d5db;
            text-align: center;
        }
        
        .footer {
            background: #374151;
            color: white;
            padding: 30px;
            text-align: center;
            margin-top: 40px;
        }
        
        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            z-index: 1000;
        }
        
        .print-button:hover {
            background: #1e40af;
        }
        
        @media print {
            .print-button { display: none; }
            body { margin: 0; }
            .header { background: #3b82f6 !important; }
        }
    </style>
</head>
<body>
    <button class="print-button" onclick="window.print()">🖨️ Imprimer en PDF</button>
    
    <div class="header">
        <div class="logo">🚀 Weblify Studio</div>
        <div class="tagline">Votre vision, notre expertise</div>
    </div>
    
    <div class="content">
        <div class="quote-info">
            <div class="client-info">
                <h2>Informations Client</h2>
                <div class="info-item">
                    <span class="info-label">Nom :</span> ${data.name}
                </div>
                <div class="info-item">
                    <span class="info-label">Email :</span> ${data.email}
                </div>
                ${data.phone ? `<div class="info-item"><span class="info-label">T&eacute;l&eacute;phone :</span> ${data.phone}</div>` : ''}
                ${data.company ? `<div class="info-item"><span class="info-label">Entreprise :</span> ${data.company}</div>` : ''}
            </div>
            
            <div class="quote-details">
                <h2>D&eacute;tails du Devis</h2>
                <div class="info-item">
                    <span class="info-label">Num&eacute;ro :</span> ${data.quoteNumber}
                </div>
                <div class="info-item">
                    <span class="info-label">Date :</span> ${data.date}
                </div>
                <div class="info-item">
                    <span class="info-label">Validit&eacute; :</span> 30 jours
                </div>
                <div class="info-item">
                    <span class="info-label">D&eacute;lai :</span> ${data.timeline}
                </div>
            </div>
        </div>
        
        <div class="project-details">
            <h2>Configuration de votre site web</h2>
            <div class="info-item">
                <span class="info-label">Type de site :</span> ${getWebsiteTypeLabel(data.projectType)}
            </div>
            <div class="info-item">
                <span class="info-label">Nombre de pages :</span> ${data.pages} pages
            </div>
            
            ${data.features.length > 0 ? `
            <h3 style="margin-top: 20px; color: #1e40af;">Fonctionnalit&eacute;s incluses :</h3>
            <ul class="feature-list">
                ${data.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            ` : ''}
        </div>
        
        <div class="pricing">
            <div class="total-price">${data.totalPrice}&euro;</div>
            <p>Prix tout compris TTC</p>
            <p style="font-size: 14px; margin-top: 10px;">
                TVA non applicable - Article 293 B du CGI
            </p>
        </div>
        
        <div class="signature-zone">
            <h3>&#9998;&#65039; Acceptation du devis</h3>
            <p>Pour accepter ce devis, merci de :</p>
            <p>1. Ajouter la mention <strong>"Bon pour accord"</strong></p>
            <p>2. Signer et dater ci-dessous</p>
            <p>3. Nous retourner ce devis sign&eacute; par email</p>
            <br>
            <div style="border: 1px solid #d1d5db; padding: 20px; margin: 20px 0; min-height: 80px;">
                <p><strong>Date :</strong> ____________________</p>
                <br>
                <p><strong>Signature du client :</strong></p>
                <br><br>
            </div>
        </div>
        
        <div class="legal">
            <h3>Mentions l&eacute;gales</h3>
            <p><strong>Weblify Studio</strong> - Noah Delenclos</p>
            <p>Micro-entrepreneur &bull; SIRET : En cours d'attribution</p>
            <p>Adresse : Paris, France</p>
            <p>Email : contact@weblify-studio.fr</p>
            <br>
            <p><strong>Conditions g&eacute;n&eacute;rales :</strong></p>
            <p>&bull; Devis valable 30 jours &agrave; compter de la date d'&eacute;mission</p>
            <p>&bull; Acompte de 50% &agrave; la signature du devis, solde &agrave; la livraison</p>
            <p>&bull; D&eacute;lais indicatifs, d&eacute;but des travaux apr&egrave;s signature et r&eacute;ception de l'acompte</p>
            <p>&bull; R&eacute;visions incluses : 2 allers-retours sur le design initial</p>
            <p>&bull; Formation &agrave; l'utilisation du site incluse (1 heure)</p>
            <p>&bull; Garantie technique : 3 mois apr&egrave;s livraison</p>
            <p>&bull; TVA non applicable - Article 293 B du Code g&eacute;n&eacute;ral des imp&ocirc;ts</p>
        </div>
    </div>
    
    <div class="footer">
        <p>Merci de votre confiance ! &#128640;</p>
        <p>Weblify Studio - Cr&eacute;ation de sites web professionnels</p>
        <p>contact@weblify-studio.fr &bull; Bas&eacute; &agrave; Paris</p>
    </div>
</body>
</html>
    `;
    
    return html;
    
  } catch (error) {
    console.error('Erreur génération HTML:', error);
    throw new Error(`Impossible de générer le devis HTML: ${error}`);
  }
}