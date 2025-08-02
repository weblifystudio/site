import { Request, Response, NextFunction } from 'express';

// Middleware d'optimisation SEO
export const seoMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Headers SEO optimisés
  res.setHeader('X-Robots-Tag', 'index, follow');
  
  // Preconnect pour améliorer les performances
  const preconnectLinks = [
    '<https://www.googletagmanager.com>; rel=preconnect',
    '<https://fonts.googleapis.com>; rel=preconnect',
    '<https://fonts.gstatic.com>; rel=preconnect; crossorigin'
  ];
  
  res.setHeader('Link', preconnectLinks.join(', '));
  
  // Headers pour l'indexation
  res.setHeader('X-Content-Language', 'fr');
  
  next();
};

// Génération automatique de sitemap
export const generateSitemap = () => {
  const baseUrl = process.env.BASE_URL || 'https://weblify-studio.com';
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/services', priority: 0.9, changefreq: 'weekly' },
    { url: '/portfolio', priority: 0.8, changefreq: 'weekly' },
    { url: '/about', priority: 0.7, changefreq: 'monthly' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' },
    { url: '/faq', priority: 0.6, changefreq: 'monthly' },
    { url: '/legal', priority: 0.3, changefreq: 'yearly' },
    { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
    { url: '/cookies', priority: 0.3, changefreq: 'yearly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// Middleware pour servir le sitemap
export const sitemapMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/sitemap.xml') {
    res.set('Content-Type', 'application/xml');
    res.send(generateSitemap());
    return;
  }
  
  next();
};

// Robots.txt optimisé
export const robotsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/robots.txt') {
    const baseUrl = process.env.BASE_URL || 'https://weblify-studio.com';
    const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;

    res.set('Content-Type', 'text/plain');
    res.send(robots);
    return;
  }
  
  next();
};

// Headers pour améliorer Core Web Vitals
export const webVitalsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Preload des ressources critiques
  if (req.path === '/' || req.path.endsWith('.html')) {
    const preloadHeaders = [
      '</font/inter.woff2>; rel=preload; as=font; type=font/woff2; crossorigin',
      '</css/critical.css>; rel=preload; as=style'
    ];
    
    res.setHeader('Link', preloadHeaders.join(', '));
  }
  
  // Headers pour optimiser le rendu
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  
  next();
};