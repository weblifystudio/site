import React, { useState, useEffect } from 'react';
import { Newsletter } from './newsletter';
import { X } from 'lucide-react';

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fermé le popup
    const dismissed = localStorage.getItem('newsletter-popup-dismissed');
    const lastShown = localStorage.getItem('newsletter-popup-last-shown');
    
    if (dismissed === 'true') {
      // Si fermé récemment (moins de 7 jours), ne pas montrer
      const dismissedTime = parseInt(lastShown || '0');
      const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 jours en ms
      
      if (Date.now() - dismissedTime < oneWeek) {
        setIsDismissed(true);
        return;
      }
    }

    // Conditions intelligentes pour afficher le popup
    const showPopup = () => {
      // Vérifier le comportement de l'utilisateur
      const timeSpent = Date.now() - (window as any).pageLoadTime;
      const hasScrolled = window.scrollY > 100;
      
      // Afficher après 15 secondes OU si scroll significatif après 8 secondes
      if (timeSpent > 15000 || (hasScrolled && timeSpent > 8000)) {
        setIsVisible(true);
      }
    };

    // Marquer le temps de chargement de la page
    (window as any).pageLoadTime = Date.now();

    // Timer pour vérifier les conditions
    const timer = setInterval(showPopup, 2000);

    // Écouter le scroll
    const handleScroll = () => {
      if (window.scrollY > 200 && Date.now() - (window as any).pageLoadTime > 8000) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('newsletter-popup-dismissed', 'true');
    localStorage.setItem('newsletter-popup-last-shown', Date.now().toString());
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative animate-in zoom-in-95 duration-300">
          {/* Bouton fermer */}
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-2 transition-colors duration-200 z-10"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
          
          {/* Newsletter component */}
          <Newsletter variant="popup" />
        </div>
      </div>
    </>
  );
}