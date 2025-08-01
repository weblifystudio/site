// Utilitaires d'optimisation des images

/**
 * Précharge les images critiques above-the-fold
 */
export const preloadCriticalImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Lazy loading avec IntersectionObserver pour navigateurs plus anciens
 */
export const setupLazyLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supporté
    return;
  }

  // Fallback avec IntersectionObserver
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    });
  });

  // Observer toutes les images lazy
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
};

/**
 * Génère des URLs d'images optimisées avec différentes tailles
 */
export const getOptimizedImageUrl = (baseUrl: string, width: number, quality: number = 80) => {
  if (baseUrl.includes('unsplash.com')) {
    return `${baseUrl}&w=${width}&q=${quality}&auto=format`;
  }
  return baseUrl;
};

/**
 * Génère un srcset pour images responsives
 */
export const generateSrcSet = (baseUrl: string) => {
  const sizes = [400, 600, 800, 1200];
  return sizes.map(size => `${getOptimizedImageUrl(baseUrl, size)} ${size}w`).join(', ');
};