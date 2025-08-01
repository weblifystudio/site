import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { X, Cookie, Settings } from 'lucide-react';
import { initGA } from '@/lib/analytics';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const cookiePrefs = localStorage.getItem('cookiePreferences');
    if (!cookiePrefs) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: false
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    
    // Initialize GA if analytics accepted
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      initGA();
    }
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', { 
      detail: allAccepted 
    }));
    
    setIsVisible(false);
  };

  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(essentialOnly));
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', { 
      detail: essentialOnly 
    }));
    
    setIsVisible(false);
  };

  const customizeSettings = () => {
    // Redirect to cookie settings page
    window.location.href = '/cookies';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
      <div className="container mx-auto p-4">
        {!showDetails ? (
          // Simple view
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Respect de votre vie privée</h3>
                <p className="text-sm text-muted-foreground">
                  Nous utilisons des cookies essentiels pour le fonctionnement du site et des cookies optionnels 
                  pour améliorer votre expérience et analyser notre audience avec votre consentement.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <Button onClick={() => setShowDetails(true)} variant="outline" size="sm" className="text-xs">
                <Settings className="w-3 h-3 mr-1" />
                Personnaliser
              </Button>
              <Button onClick={acceptEssential} variant="outline" size="sm" className="text-xs">
                Essentiel uniquement
              </Button>
              <Button onClick={acceptAll} size="sm" className="text-xs">
                Tout accepter
              </Button>
            </div>
          </div>
        ) : (
          // Detailed view
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Cookie className="w-4 h-4 text-primary" />
                Paramètres des cookies
              </h3>
              <Button
                onClick={() => setShowDetails(false)}
                variant="ghost"
                size="sm"
                className="p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <strong>Cookies essentiels</strong>
                  <p className="text-xs text-muted-foreground">Nécessaires au fonctionnement du site</p>
                </div>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded">
                  Toujours actifs
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <strong>Cookies d'analyse</strong>
                  <p className="text-xs text-muted-foreground">Google Analytics pour les statistiques anonymisées</p>
                </div>
                <span className="text-xs text-muted-foreground">Optionnel</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button onClick={customizeSettings} variant="outline" size="sm" className="text-xs">
                Paramètres détaillés
              </Button>
              <Button onClick={acceptEssential} variant="outline" size="sm" className="text-xs">
                Essentiel uniquement
              </Button>
              <Button onClick={acceptAll} size="sm" className="text-xs">
                Tout accepter
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground border-t pt-3">
              En continuant, vous acceptez notre{' '}
              <Link href="/politique-confidentialite" className="underline hover:text-foreground">
                politique de confidentialité
              </Link>{' '}
              et notre{' '}
              <Link href="/cookies" className="underline hover:text-foreground">
                politique de cookies
              </Link>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
