// Composant pour générer automatiquement un devis PDF
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, FileText, Calculator } from 'lucide-react';

interface QuoteGeneratorProps {
  calculatorData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    websiteType: string;
    pages: number;
    features: string[];
    timeline: string;
    budget: string;
  };
}

export function QuoteGenerator({ calculatorData }: QuoteGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState('');

  const generateQuote = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(calculatorData),
      });

      const result = await response.json();

      if (result.success) {
        setQuoteNumber(result.quoteNumber);
        setPdfGenerated(true);
        
        // Téléchargement automatique du PDF
        const pdfBlob = new Blob([
          Uint8Array.from(atob(result.pdfBase64), c => c.charCodeAt(0))
        ], { type: 'application/pdf' });
        
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `Devis-Weblify-Studio-${result.quoteNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        console.log('📄 Devis téléchargé automatiquement');
      } else {
        console.error('Erreur génération devis:', result.error);
        alert('Erreur lors de la génération du devis. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (pdfGenerated) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          ✅ Devis généré avec succès !
        </h3>
        
        <p className="text-green-700 mb-4">
          Votre devis <strong>{quoteNumber}</strong> a été téléchargé automatiquement.
          <br />
          <span className="text-sm">
            📧 Le devis sera envoyé par email à vous ET à votre client via votre solution d'email personnelle.
          </span>
        </p>
        
        <div className="flex gap-3 justify-center">
          <Button 
            onClick={generateQuote}
            variant="outline"
            size="sm"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger à nouveau
          </Button>
          
          <Button 
            onClick={() => window.location.href = 'mailto:contact@weblify-studio.fr?subject=Devis ' + quoteNumber}
            variant="outline" 
            size="sm"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <Mail className="w-4 h-4 mr-2" />
            Nous contacter
          </Button>
        </div>
        
        <p className="text-xs text-green-600 mt-4">
          💡 Ce devis est valable 30 jours. Pour l'accepter, signez-le et renvoyez-le nous.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-blue-800 mb-2">
        📄 Générer votre devis personnalisé
      </h3>
      
      <p className="text-blue-700 mb-4">
        Recevez immédiatement votre devis professionnel au format PDF
        <br />
        avec toutes les informations légales et votre sélection détaillée.
      </p>
      
      <Button 
        onClick={generateQuote}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
        size="lg"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            Génération en cours...
          </>
        ) : (
          <>
            <Calculator className="w-5 h-5 mr-2" />
            📄 Générer et envoyer mon devis PDF
          </>
        )}
      </Button>
      
      <p className="text-xs text-blue-600 mt-3">
        ⚡ Génération instantanée • 🔒 Sécurisé • 📧 Envoi par email
      </p>
    </div>
  );
}