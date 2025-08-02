// Générateur de devis PDF automatique avec design Weblify Studio
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';

interface QuoteData {
  // Informations client
  name: string;
  email: string;
  phone?: string;
  company?: string;
  
  // Projet sélectionné
  projectType: 'vitrine' | 'premium' | 'ecommerce' | 'sur-mesure';
  pages: number;
  features: string[];
  timeline: string;
  budget: string;
  
  // Informations calculées
  basePrice: number;
  totalPrice: number;
  
  // Métadonnées
  quoteNumber: string;
  date: string;
  validUntil: string;
}

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Devis Weblify Studio - {{quoteNumber}}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #ffffff;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
        }
        
        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #3b82f6;
        }
        
        .logo-section h1 {
            font-size: 28px;
            font-weight: 800;
            color: #1e40af;
            margin-bottom: 5px;
        }
        
        .logo-section p {
            color: #6b7280;
            font-size: 14px;
        }
        
        .quote-info {
            text-align: right;
        }
        
        .quote-number {
            font-size: 18px;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 5px;
        }
        
        .quote-date {
            color: #6b7280;
            font-size: 14px;
        }
        
        /* Client Info */
        .client-section {
            background: #f8fafc;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        
        .client-section h2 {
            color: #1e40af;
            font-size: 18px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .client-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .client-field {
            font-size: 14px;
        }
        
        .client-field strong {
            color: #374151;
            display: block;
            margin-bottom: 3px;
        }
        
        /* Project Details */
        .project-section {
            margin-bottom: 30px;
        }
        
        .project-section h2 {
            color: #1e40af;
            font-size: 20px;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .project-type {
            background: linear-gradient(135deg, #3b82f6, #1e40af);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .project-type h3 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .project-specs {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .spec-item {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            padding: 15px;
            border-radius: 6px;
        }
        
        .spec-label {
            color: #6b7280;
            font-size: 13px;
            text-transform: uppercase;
            font-weight: 500;
            margin-bottom: 5px;
        }
        
        .spec-value {
            color: #1f2937;
            font-weight: 600;
        }
        
        /* Features */
        .features-section {
            margin-bottom: 30px;
        }
        
        .features-section h3 {
            color: #1e40af;
            font-size: 16px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .features-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 10px;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            padding: 8px 0;
        }
        
        .feature-check {
            color: #10b981;
            font-weight: bold;
            margin-right: 10px;
        }
        
        /* Pricing */
        .pricing-section {
            background: #f8fafc;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
        }
        
        .pricing-header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .pricing-header h2 {
            color: #1e40af;
            font-size: 20px;
            font-weight: 600;
        }
        
        .price-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .price-label {
            color: #374151;
            font-weight: 500;
        }
        
        .price-value {
            font-weight: 600;
            color: #1f2937;
        }
        
        .total-price {
            border-top: 2px solid #3b82f6;
            padding-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .total-label {
            font-size: 18px;
            font-weight: 700;
            color: #1e40af;
        }
        
        .total-value {
            font-size: 24px;
            font-weight: 800;
            color: #1e40af;
        }
        
        /* Legal Section */
        .legal-section {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }
        
        .legal-section h3 {
            color: #1e40af;
            font-size: 16px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .legal-info {
            font-size: 12px;
            color: #6b7280;
            line-height: 1.5;
            margin-bottom: 10px;
        }
        
        .company-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .company-details h4 {
            color: #374151;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .company-details p {
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 5px;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
        }
        
        .signature-section {
            background: #fef3c7;
            border: 2px dashed #f59e0b;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
        }
        
        .signature-text {
            color: #92400e;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .signature-line {
            border-bottom: 2px solid #f59e0b;
            width: 300px;
            margin: 20px auto;
            height: 40px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo-section">
                <h1>🚀 Weblify Studio</h1>
                <p>Agence Web • Paris • Création & Innovation</p>
            </div>
            <div class="quote-info">
                <div class="quote-number">Devis N° {{quoteNumber}}</div>
                <div class="quote-date">{{date}}</div>
            </div>
        </div>

        <!-- Client Information -->
        <div class="client-section">
            <h2>Informations Client</h2>
            <div class="client-info">
                <div class="client-field">
                    <strong>Nom / Société</strong>
                    {{#if company}}{{company}}{{else}}{{name}}{{/if}}
                </div>
                <div class="client-field">
                    <strong>Contact</strong>
                    {{name}}
                </div>
                <div class="client-field">
                    <strong>Email</strong>
                    {{email}}
                </div>
                <div class="client-field">
                    <strong>Téléphone</strong>
                    {{#if phone}}{{phone}}{{else}}Non renseigné{{/if}}
                </div>
            </div>
        </div>

        <!-- Project Details -->
        <div class="project-section">
            <h2>Détails du Projet</h2>
            
            <div class="project-type">
                <h3>
                    {{#if (eq projectType 'vitrine')}}Site Vitrine Professionnel{{/if}}
                    {{#if (eq projectType 'premium')}}Site Premium Avancé{{/if}}
                    {{#if (eq projectType 'ecommerce')}}Site E-commerce Complet{{/if}}
                    {{#if (eq projectType 'sur-mesure')}}Solution Sur-Mesure{{/if}}
                </h3>
                <p>Solution adaptée à vos besoins spécifiques</p>
            </div>

            <div class="project-specs">
                <div class="spec-item">
                    <div class="spec-label">Nombre de pages</div>
                    <div class="spec-value">{{pages}} pages</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Délai de livraison</div>
                    <div class="spec-value">{{timeline}}</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Budget souhaité</div>
                    <div class="spec-value">{{budget}}</div>
                </div>
            </div>
        </div>

        <!-- Features -->
        {{#if features}}
        <div class="features-section">
            <h3>✨ Fonctionnalités Incluses</h3>
            <div class="features-list">
                {{#each features}}
                <div class="feature-item">
                    <span class="feature-check">✓</span>
                    <span>{{this}}</span>
                </div>
                {{/each}}
            </div>
        </div>
        {{/if}}

        <!-- Pricing -->
        <div class="pricing-section">
            <div class="pricing-header">
                <h2>💰 Tarification</h2>
            </div>
            
            <div class="price-details">
                <span class="price-label">Prix de base</span>
                <span class="price-value">{{basePrice}}€ HT</span>
            </div>
            
            <div class="price-details">
                <span class="price-label">Options sélectionnées</span>
                <span class="price-value">Incluses</span>
            </div>
            
            <div class="price-details">
                <span class="price-label">TVA (20%)</span>
                <span class="price-value">{{tva}}€</span>
            </div>
            
            <div class="total-price">
                <span class="total-label">Prix Total TTC</span>
                <span class="total-value">{{totalPrice}}€</span>
            </div>
        </div>

        <!-- Signature Section -->
        <div class="signature-section">
            <div class="signature-text">
                Pour accepter ce devis, merci de signer ci-dessous<br>
                <strong>"Bon pour accord"</strong>
            </div>
            <div class="signature-line"></div>
            <p style="color: #92400e; font-size: 12px; margin-top: 10px;">
                Signature du client - Date : _______________
            </p>
        </div>

        <!-- Legal Information -->
        <div class="legal-section">
            <h3>📋 Informations Légales</h3>
            
            <div class="company-info">
                <div class="company-details">
                    <h4>Weblify Studio</h4>
                    <p><strong>Statut :</strong> [Votre statut juridique]</p>
                    <p><strong>SIRET :</strong> [Votre SIRET]</p>
                    <p><strong>Adresse :</strong> [Votre adresse]</p>
                    <p><strong>Email :</strong> contact@weblify-studio.fr</p>
                </div>
                <div class="company-details">
                    <h4>Conditions du Devis</h4>
                    <p><strong>Validité :</strong> {{validUntil}}</p>
                    <p><strong>Délai de paiement :</strong> 30% à la commande, 70% à la livraison</p>
                    <p><strong>Garantie :</strong> 3 mois après livraison</p>
                    <p><strong>Propriété :</strong> Client propriétaire du domaine</p>
                </div>
            </div>
            
            <div class="legal-info">
                <strong>Mentions légales :</strong> Ce devis est établi conformément aux articles L441-1 et suivants du Code de commerce. 
                Devis reçu avant l'exécution des travaux (montant > 500€). Les travaux ne commenceront qu'après acceptation 
                écrite du présent devis avec la mention "Bon pour accord" et signature du client.
            </div>
            
            <div class="legal-info">
                <strong>TVA :</strong> [Si micro-entreprise] TVA non applicable, art. 293 B du Code général des impôts.
                [Si société] TVA au taux de 20% incluse dans le prix TTC.
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Merci de votre confiance ! 🚀</p>
            <p>Weblify Studio - Votre vision, notre expertise technique</p>
        </div>
    </div>
</body>
</html>
`;

// Helpers Handlebars
Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});

export async function generateQuotePDF(quoteData: QuoteData): Promise<Buffer> {
    const template = Handlebars.compile(htmlTemplate);
    
    // Calcul automatique de la TVA
    const tva = Math.round((quoteData.totalPrice - quoteData.basePrice) * 0.2);
    
    // Génération des données complètes
    const templateData = {
        ...quoteData,
        tva: tva,
        quoteNumber: quoteData.quoteNumber || `WS-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };
    
    const html = template(templateData);
    
    // Génération PDF avec Puppeteer
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            },
            printBackground: true
        });
        
        return Buffer.from(pdfBuffer);
        
    } finally {
        await browser.close();
    }
}

// Fonction utilitaire pour mapper les données du calculateur
export function mapCalculatorToQuote(calculatorData: any): QuoteData {
    const projectTypeMap = {
        'vitrine': { base: 690, type: 'vitrine' },
        'premium': { base: 1290, type: 'premium' },
        'ecommerce': { base: 2190, type: 'ecommerce' },
        'sur-mesure': { base: 3000, type: 'sur-mesure' }
    };
    
    const selectedType = projectTypeMap[calculatorData.websiteType as keyof typeof projectTypeMap] || projectTypeMap['vitrine'];
    const basePrice = selectedType.base;
    
    // Calcul du prix total avec options
    let totalPrice = basePrice;
    
    // Ajout des coûts selon les fonctionnalités
    const features = calculatorData.features || [];
    if (features.includes('E-commerce avancé')) totalPrice += 500;
    if (features.includes('Réservation en ligne')) totalPrice += 300;
    if (features.includes('Blog professionnel')) totalPrice += 200;
    
    return {
        name: calculatorData.name,
        email: calculatorData.email,
        phone: calculatorData.phone,
        company: calculatorData.company,
        projectType: selectedType.type as any,
        pages: calculatorData.pages || 5,
        features: features,
        timeline: calculatorData.timeline || '2-3 semaines',
        totalPrice: parseInt(calculatorData.budget?.replace('€', '') || totalPrice.toString()),
        quoteNumber: `WS-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
    };
}