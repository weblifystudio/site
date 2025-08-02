import { Request, Response, NextFunction } from 'express';
import { rateLimit } from 'express-rate-limit';

// Protection contre les attaques par déni de service (DDoS)
export const createRateLimiter = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre
    message: {
      error: 'Trop de requêtes depuis cette IP, réessayez dans 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Protection spécifique pour les formulaires
export const createFormRateLimiter = () => {
  return rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // Max 5 soumissions de formulaire par IP toutes les 5 minutes
    message: {
      error: 'Trop de soumissions de formulaires. Réessayez dans 5 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Middleware de compression des réponses
export const compressionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Headers pour optimiser la compression
  res.setHeader('Vary', 'Accept-Encoding');
  next();
};

// Middleware de cache optimisé
export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Cache statique pour les assets
  if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 an
    res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
  } 
  // Cache court pour les pages HTML
  else if (req.url.match(/\.(html|htm)$/) || req.path === '/') {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 heure
  }
  // Pas de cache pour les API
  else if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  
  next();
};

// Protection CORS avancée
export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [
    'https://weblify-studio.com',
    'https://www.weblify-studio.com',
    process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
};

// Middleware de monitoring des performances
export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    // Log des requêtes lentes (>1000ms)
    if (duration > 1000) {
      console.warn(`⚠️ Requête lente: ${req.method} ${req.path} - ${duration}ms`);
    }
  });
  
  next();
};

// Protection contre les injections
export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Nettoyage basique des paramètres
  if (req.body) {
    sanitizeObject(req.body);
  }
  if (req.query) {
    sanitizeObject(req.query);
  }
  
  next();
};

function sanitizeObject(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      // Suppression des scripts potentiellement dangereux
      obj[key] = obj[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
}