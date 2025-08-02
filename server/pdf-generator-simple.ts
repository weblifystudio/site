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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: #1a1a1a;
            line-height: 1.6;
            background: #ffffff;
            font-size: 14px;
            -webkit-font-smoothing: antialiased;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            min-height: 100vh;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.4;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
        }
        
        .tagline {
            font-size: 16px;
            opacity: 0.95;
            font-weight: 400;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 60px 40px;
        }
        
        .document-title {
            text-align: center;
            margin-bottom: 60px;
            padding-bottom: 30px;
            border-bottom: 2px solid #f1f5f9;
        }
        
        .document-title h1 {
            font-size: 36px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 12px;
            letter-spacing: -0.8px;
        }
        
        .document-title .quote-number {
            font-size: 18px;
            color: #64748b;
            font-weight: 500;
            background: #f8fafc;
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 60px;
        }
        
        .info-section {
            background: #fafbfc;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 32px;
            position: relative;
            transition: all 0.2s;
        }
        
        .info-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 16px 0 0 16px;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 24px;
            letter-spacing: -0.4px;
        }
        
        .info-row {
            display: flex;
            margin-bottom: 16px;
            align-items: flex-start;
        }
        
        .info-label {
            font-weight: 500;
            color: #64748b;
            min-width: 90px;
            margin-right: 16px;
            font-size: 13px;
        }
        
        .info-value {
            color: #1a1a1a;
            font-weight: 500;
            flex: 1;
        }
        
        .project-section {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 40px;
            margin-bottom: 50px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        
        .project-title {
            font-size: 22px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 30px;
            letter-spacing: -0.4px;
        }
        
        .features-section {
            margin-top: 30px;
        }
        
        .features-title {
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 20px;
        }
        
        .features-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 12px;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            padding: 12px 0;
        }
        
        .feature-check {
            color: #10b981;
            font-weight: 700;
            margin-right: 12px;
            font-size: 14px;
        }
        
        .feature-text {
            color: #374151;
            font-weight: 500;
        }
        
        .pricing-section {
            background: linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%);
            border: 2px solid #e2e8f0;
            border-radius: 20px;
            padding: 50px 40px;
            margin: 50px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .pricing-section::before {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 20px;
            z-index: -1;
        }
        
        .price-main {
            font-size: 56px;
            font-weight: 800;
            color: #1a1a1a;
            margin-bottom: 12px;
            letter-spacing: -2px;
        }
        
        .price-subtitle {
            font-size: 18px;
            color: #64748b;
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        .price-details {
            font-size: 14px;
            color: #64748b;
            font-style: italic;
        }
        
        .signature-section {
            background: #fafbfc;
            border: 2px dashed #cbd5e1;
            border-radius: 16px;
            padding: 50px 40px;
            margin: 60px 0;
            text-align: center;
        }
        
        .signature-title {
            font-size: 22px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 20px;
        }
        
        .signature-instructions {
            font-size: 15px;
            color: #64748b;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .signature-box {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 40px;
            margin: 24px 0;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .signature-line {
            border-bottom: 1px solid #cbd5e1;
            margin: 20px 0;
        }
        
        .legal-section {
            border-top: 2px solid #f1f5f9;
            padding-top: 40px;
            margin-top: 60px;
        }
        
        .legal-title {
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 30px;
        }
        
        .legal-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 30px;
        }
        
        .legal-block {
            font-size: 13px;
            color: #4b5563;
            line-height: 1.5;
        }
        
        .legal-block h4 {
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 12px;
            font-size: 14px;
        }
        
        .legal-text {
            font-size: 12px;
            color: #6b7280;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #f3f4f6;
            line-height: 1.5;
        }
        
        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 14px 20px;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 600;
            font-size: 13px;
            box-shadow: 0 4px 16px rgba(102, 126, 234, 0.25);
            z-index: 1000;
            transition: all 0.2s;
        }
        
        .print-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.35);
        }
        
        @media print {
            .print-button { display: none !important; }
            body { font-size: 12px; }
            .container { max-width: none; }
            .header { background: linear-gradient(135deg, #667eea, #764ba2) !important; }
            .info-grid { grid-template-columns: 1fr; gap: 20px; }
            .features-list { grid-template-columns: 1fr; }
            .legal-grid { grid-template-columns: 1fr; }
            .pricing-section { break-inside: avoid; }
            .signature-section { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="container">
        <button class="print-button" onclick="window.print()">&#128438; Imprimer en PDF</button>
        
        <div class="header">
            <div class="logo">&#128640; Weblify Studio</div>
            <div class="tagline">Votre vision, notre expertise</div>
        </div>
        
        <div class="content">
            <div class="document-title">
                <h1>Devis</h1>
                <div class="quote-number">${data.quoteNumber}</div>
            </div>
            
            <div class="info-grid">
                <div class="info-section">
                    <div class="section-title">Informations Client</div>
                    <div class="info-row">
                        <div class="info-label">Nom :</div>
                        <div class="info-value">${data.name}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Email :</div>
                        <div class="info-value">${data.email}</div>
                    </div>
                    ${data.phone ? `<div class="info-row"><div class="info-label">T&eacute;l&eacute;phone :</div><div class="info-value">${data.phone}</div></div>` : ''}
                    ${data.company ? `<div class="info-row"><div class="info-label">Entreprise :</div><div class="info-value">${data.company}</div></div>` : ''}
                </div>
                
                <div class="info-section">
                    <div class="section-title">D&eacute;tails du Devis</div>
                    <div class="info-row">
                        <div class="info-label">Date :</div>
                        <div class="info-value">${data.date}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Validit&eacute; :</div>
                        <div class="info-value">30 jours</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">D&eacute;lai :</div>
                        <div class="info-value">${data.timeline}</div>
                    </div>
                </div>
            </div>
            
            <div class="project-section">
                <div class="project-title">Configuration de votre projet</div>
                <div class="info-row">
                    <div class="info-label">Type de site :</div>
                    <div class="info-value">${getWebsiteTypeLabel(data.projectType)}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Pages :</div>
                    <div class="info-value">${data.pages} pages</div>
                </div>
                
                ${data.features.length > 0 ? `
                <div class="features-section">
                    <div class="features-title">Fonctionnalit&eacute;s incluses</div>
                    <div class="features-list">
                        ${data.features.map(feature => `
                        <div class="feature-item">
                            <div class="feature-check">&check;</div>
                            <div class="feature-text">${feature}</div>
                        </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div class="pricing-section">
                <div class="price-main">${data.totalPrice}&euro;</div>
                <div class="price-subtitle">Prix tout compris TTC</div>
                <div class="price-details">TVA non applicable - Article 293 B du CGI</div>
            </div>
            
            <div class="signature-section">
                <div class="signature-title">Acceptation du devis</div>
                <div class="signature-instructions">
                    Pour accepter ce devis, merci d'ajouter la mention <strong>&laquo; Bon pour accord &raquo;</strong>, 
                    de signer et dater ci-dessous, puis nous retourner ce document par email.
                </div>
                <div class="signature-box">
                    <div><strong>Date :</strong> ________________________</div>
                    <div class="signature-line"></div>
                    <div><strong>Signature du client :</strong></div>
                </div>
            </div>
            
            <div class="legal-section">
                <div class="legal-title">Mentions l&eacute;gales</div>
                
                <div class="legal-grid">
                    <div class="legal-block">
                        <h4>Weblify Studio</h4>
                        <p>Noah Delenclos</p>
                        <p>Micro-entrepreneur</p>
                        <p>SIRET : En cours d'attribution</p>
                        <p>Adresse : Paris, France</p>
                        <p>Email : contact@weblify-studio.fr</p>
                    </div>
                    
                    <div class="legal-block">
                        <h4>Conditions du Devis</h4>
                        <p>&bull; Devis valable 30 jours</p>
                        <p>&bull; Acompte 50% &agrave; la signature</p>
                        <p>&bull; Solde &agrave; la livraison</p>
                        <p>&bull; 2 r&eacute;visions incluses</p>
                        <p>&bull; Formation 1h incluse</p>
                        <p>&bull; Garantie 3 mois</p>
                    </div>
                </div>
                
                <div class="legal-text">
                    <strong>Mentions l&eacute;gales :</strong> Ce devis est &eacute;tabli conform&eacute;ment aux articles L441-1 et suivants du Code de commerce. 
                    Les travaux ne commenceront qu'apr&egrave;s acceptation &eacute;crite du pr&eacute;sent devis avec signature du client. 
                    TVA non applicable selon l'article 293 B du Code g&eacute;n&eacute;ral des imp&ocirc;ts.
                </div>
            </div>
        </div>
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