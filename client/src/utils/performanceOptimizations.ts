// Optimisations de performance pour le site
import React from 'react';

/**
 * Précharge les routes critiques
 */
export const preloadCriticalRoutes = () => {
  const criticalRoutes = ['/offres', '/contact', '/blog'];
  
  criticalRoutes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

/**
 * Debounce pour les événements fréquents (scroll, resize)
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Optimise les animations avec requestAnimationFrame
 */
export const optimizeAnimation = (callback: () => void) => {
  let ticking = false;
  
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};

/**
 * Lazy loading pour les composants React
 */
export const createLazyComponent = <T extends Record<string, any>>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>
) => {
  return React.lazy(importFn);
};

/**
 * Minification CSS inline critique
 */
export const injectCriticalCSS = () => {
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    .hero-section { display: flex; min-height: 100vh; }
    .header { position: fixed; top: 0; z-index: 50; }
    .loading-spinner { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

/**
 * Service Worker pour mise en cache
 */
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker enregistré:', registration.scope);
    } catch (error) {
      console.log('Échec enregistrement Service Worker:', error);
    }
  }
};

/**
 * Compression et optimisation des ressources
 */
export const optimizeResources = () => {
  // Précharge les fonts critiques
  const criticalFonts = [
    'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZs.woff2',
  ];
  
  criticalFonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = fontUrl;
    document.head.appendChild(link);
  });
};

/**
 * Optimisation des Web Vitals
 */
export const optimizeWebVitals = () => {
  // Améliore le CLS (Cumulative Layout Shift)
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach(img => {
    const htmlImg = img as HTMLImageElement;
    htmlImg.style.aspectRatio = '16/9'; // Ratio par défaut
  });
  
  // Améliore le FID (First Input Delay)
  const deferNonCriticalJS = () => {
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
      script.removeAttribute('data-defer');
    });
  };
  
  // Différer après le load
  window.addEventListener('load', deferNonCriticalJS);
};