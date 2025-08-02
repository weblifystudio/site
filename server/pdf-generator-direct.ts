// Générateur PDF direct avec jsPDF
import jsPDF from 'jspdf';

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

function getWebsiteTypeLabel(projectType: string): string {
  const labels: Record<string, string> = {
    'vitrine': 'Site Vitrine',
    'premium': 'Site Premium', 
    'ecommerce': 'Site E-commerce',
    'sur-mesure': 'Site Sur-Mesure'
  };
  return labels[projectType] || projectType;
}

export async function generateQuotePDF(data: QuoteData): Promise<Buffer> {
  try {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Header avec dégradé simulé
    doc.setFillColor(102, 126, 234); // #667eea
    doc.rect(0, 0, pageWidth, 60, 'F');
    
    // Logo et titre
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('🚀 Weblify Studio', pageWidth / 2, 25, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Votre vision, notre expertise', pageWidth / 2, 35, { align: 'center' });
    
    // Titre du document
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('DEVIS', pageWidth / 2, 80, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139);
    doc.text(data.quoteNumber, pageWidth / 2, 90, { align: 'center' });
    
    let yPos = 110;
    
    // Informations client et devis
    doc.setFillColor(250, 251, 252);
    doc.rect(20, yPos, 80, 60, 'F');
    doc.rect(110, yPos, 80, 60, 'F');
    
    // Bordures colorées
    doc.setDrawColor(102, 126, 234);
    doc.setLineWidth(2);
    doc.line(20, yPos, 20, yPos + 60);
    doc.line(110, yPos, 110, yPos + 60);
    
    // Informations client
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Informations Client', 25, yPos + 10);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    
    let clientY = yPos + 20;
    doc.text('Nom :', 25, clientY);
    doc.setTextColor(26, 26, 26);
    doc.text(data.name, 45, clientY);
    
    clientY += 8;
    doc.setTextColor(75, 85, 99);
    doc.text('Email :', 25, clientY);
    doc.setTextColor(26, 26, 26);
    doc.text(data.email, 45, clientY);
    
    if (data.phone) {
      clientY += 8;
      doc.setTextColor(75, 85, 99);
      doc.text('Téléphone :', 25, clientY);
      doc.setTextColor(26, 26, 26);
      doc.text(data.phone, 50, clientY);
    }
    
    if (data.company) {
      clientY += 8;
      doc.setTextColor(75, 85, 99);
      doc.text('Entreprise :', 25, clientY);
      doc.setTextColor(26, 26, 26);
      doc.text(data.company, 50, clientY);
    }
    
    // Détails du devis
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Détails du Devis', 115, yPos + 10);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    
    let devisY = yPos + 20;
    doc.text('Date :', 115, devisY);
    doc.setTextColor(26, 26, 26);
    doc.text(data.date, 135, devisY);
    
    devisY += 8;
    doc.setTextColor(75, 85, 99);
    doc.text('Validité :', 115, devisY);
    doc.setTextColor(26, 26, 26);
    doc.text('30 jours', 140, devisY);
    
    devisY += 8;
    doc.setTextColor(75, 85, 99);
    doc.text('Délai :', 115, devisY);
    doc.setTextColor(26, 26, 26);
    doc.text(data.timeline, 135, devisY);
    
    yPos += 80;
    
    // Configuration du projet
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.rect(20, yPos, 170, 50, 'FD');
    
    doc.setDrawColor(102, 126, 234);
    doc.setLineWidth(2);
    doc.line(20, yPos, 20, yPos + 50);
    
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Configuration de votre projet', 25, yPos + 12);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    
    let projectY = yPos + 22;
    doc.text('Type de site :', 25, projectY);
    doc.setTextColor(26, 26, 26);
    doc.text(getWebsiteTypeLabel(data.projectType), 55, projectY);
    
    projectY += 8;
    doc.setTextColor(75, 85, 99);
    doc.text('Pages :', 25, projectY);
    doc.setTextColor(26, 26, 26);
    doc.text(`${data.pages} pages`, 45, projectY);
    
    // Fonctionnalités
    if (data.features.length > 0) {
      projectY += 12;
      doc.setTextColor(55, 65, 81);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Fonctionnalités incluses', 25, projectY);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      data.features.forEach((feature, index) => {
        projectY += 6;
        doc.setTextColor(16, 185, 129);
        doc.text('✓', 25, projectY);
        doc.setTextColor(55, 65, 81);
        doc.text(feature, 32, projectY);
      });
    }
    
    yPos += 70;
    
    // Prix - Section mise en valeur
    doc.setFillColor(248, 250, 255);
    doc.setDrawColor(102, 126, 234);
    doc.setLineWidth(2);
    doc.rect(20, yPos, 170, 40, 'FD');
    
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.text(`${data.totalPrice}€`, pageWidth / 2, yPos + 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139);
    doc.text('Prix tout compris TTC', pageWidth / 2, yPos + 28, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text('TVA non applicable - Article 293 B du CGI', pageWidth / 2, yPos + 35, { align: 'center' });
    
    yPos += 60;
    
    // Zone signature
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(1);
    doc.setFillColor(250, 251, 252);
    doc.rect(20, yPos, 170, 50, 'FD');
    
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Acceptation du devis', pageWidth / 2, yPos + 12, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Pour accepter, ajoutez "Bon pour accord", signez et datez ci-dessous', pageWidth / 2, yPos + 20, { align: 'center' });
    
    doc.setTextColor(26, 26, 26);
    doc.text('Date : ____________________', 30, yPos + 35);
    doc.text('Signature du client :', 120, yPos + 35);
    
    // Nouvelle page pour mentions légales si nécessaire
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    } else {
      yPos += 70;
    }
    
    // Mentions légales
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Mentions légales', 20, yPos);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    
    yPos += 10;
    doc.text('Weblify Studio - Noah Delenclos', 20, yPos);
    yPos += 5;
    doc.text('Micro-entrepreneur • SIRET : En cours d\'attribution', 20, yPos);
    yPos += 5;
    doc.text('Adresse : Paris, France', 20, yPos);
    yPos += 5;
    doc.text('Email : contact@weblify-studio.fr', 20, yPos);
    
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Conditions :', 20, yPos);
    doc.setFont('helvetica', 'normal');
    
    yPos += 5;
    doc.text('• Devis valable 30 jours • Acompte 50% à la signature', 20, yPos);
    yPos += 4;
    doc.text('• Solde à la livraison • 2 révisions incluses', 20, yPos);
    yPos += 4;
    doc.text('• Formation 1h incluse • Garantie 3 mois', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    const legalText = 'Ce devis est établi conformément aux articles L441-1 du Code de commerce. TVA non applicable selon l\'article 293 B du CGI.';
    const splitText = doc.splitTextToSize(legalText, 170);
    doc.text(splitText, 20, yPos);
    
    return Buffer.from(doc.output('arraybuffer'));
    
  } catch (error) {
    console.error('Erreur génération PDF:', error);
    throw new Error(`Impossible de générer le PDF: ${error}`);
  }
}