// Web Vitals et métriques de performance

export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

/**
 * Mesure et reporte les Core Web Vitals
 */
export const measureWebVitals = (onPerfEntry?: (metric: WebVitalsMetric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // LCP - Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          const value = entry.startTime;
          onPerfEntry({
            name: 'LCP',
            value,
            rating: value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor',
            delta: value
          });
        }
      }
    });
    
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Browser doesn't support LCP
    }

    // FID - First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const eventEntry = entry as any; // Type assertion pour les propriétés spécifiques
        const value = eventEntry.processingStart - eventEntry.startTime;
        onPerfEntry({
          name: 'FID',
          value,
          rating: value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor',
          delta: value
        });
      }
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Browser doesn't support FID
    }

    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutEntry = entry as any; // Type assertion pour les propriétés spécifiques
        if (!layoutEntry.hadRecentInput) {
          clsValue += layoutEntry.value;
          onPerfEntry({
            name: 'CLS',
            value: clsValue,
            rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
            delta: layoutEntry.value
          });
        }
      }
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Browser doesn't support CLS
    }
  }
};

/**
 * Optimise automatiquement les métriques Web Vitals
 */
export const optimizeWebVitals = () => {
  // Précharge les ressources critiques
  const criticalResources = [
    'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZs.woff2'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.woff') ? 'font' : 'fetch';
    if (resource.includes('.woff')) {
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });

  // Optimise les images pour réduire CLS
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach(img => {
    const htmlImg = img as HTMLImageElement;
    if (!htmlImg.style.aspectRatio) {
      htmlImg.style.aspectRatio = '16/9';
    }
  });

  // Différer les scripts non-critiques
  const deferScripts = () => {
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
      script.removeAttribute('data-defer');
    });
  };

  // Attendre le load complet avant de charger les scripts non-critiques
  if (document.readyState === 'complete') {
    deferScripts();
  } else {
    window.addEventListener('load', deferScripts);
  }
};