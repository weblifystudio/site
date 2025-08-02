import express, { type Request, Response, NextFunction } from "express";
import https from "https";
import http from "http";
import compression from "compression";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { generateSelfSignedCert, securityHeaders } from "./ssl-config";
import { 
  createRateLimiter, 
  createFormRateLimiter, 
  compressionMiddleware, 
  cacheMiddleware, 
  corsMiddleware, 
  performanceMiddleware, 
  sanitizeMiddleware 
} from "./security-middleware";
import { 
  healthCheckMiddleware, 
  metricsMiddleware, 
  ErrorMonitor 
} from "./monitoring";
import { 
  seoMiddleware, 
  sitemapMiddleware, 
  robotsMiddleware, 
  webVitalsMiddleware 
} from "./seo-optimization";

const app = express();

// Configuration trust proxy pour Replit
app.set('trust proxy', 1);

// Middleware de base
app.use(compression()); // Compression gzip
app.use(helmet({ 
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  }
})); // Protection avec CSP adaptée
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Middleware de sécurité et optimisation
app.use(createRateLimiter()); // Protection DDoS
app.use(corsMiddleware); // CORS sécurisé
app.use(sanitizeMiddleware); // Protection injections
app.use(performanceMiddleware); // Monitoring performances
app.use(cacheMiddleware); // Optimisation cache
app.use(compressionMiddleware); // Headers compression

// Middleware SEO
app.use(seoMiddleware); // Headers SEO
app.use(webVitalsMiddleware); // Core Web Vitals
app.use(sitemapMiddleware); // Sitemap automatique
app.use(robotsMiddleware); // Robots.txt

// Monitoring
app.use(healthCheckMiddleware); // /health endpoint
app.use(metricsMiddleware); // /metrics endpoint

// Middleware de redirection HTTPS (uniquement en production)
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

// Middleware de sécurité SSL
app.use((req, res, next) => {
  // Application des headers de sécurité
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log l'erreur dans le système de monitoring
    ErrorMonitor.logError(req, err);

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Configuration SSL/HTTPS
  const port = parseInt(process.env.PORT || '5000', 10);
  const httpsPort = parseInt(process.env.HTTPS_PORT || '5443', 10);

  // Serveur HTTP principal (requis par Replit)
  server.listen(port, "0.0.0.0", () => {
    log(`🌐 HTTP Server serving on port ${port}`);
    log(`🔒 SSL Security headers enabled`);
    log(`✅ Ready for HTTPS deployment on Replit`);
  });

  // Configuration HTTPS pour développement local (optionnel)
  if (process.env.NODE_ENV === 'development' && process.env.ENABLE_HTTPS === 'true') {
    try {
      const sslConfig = generateSelfSignedCert();
      if (sslConfig) {
        const httpsServer = https.createServer(sslConfig, app);
        httpsServer.listen(httpsPort, "0.0.0.0", () => {
          log(`🔐 HTTPS Development server on port ${httpsPort}`);
          log(`⚠️ Using self-signed certificate for development`);
        });
      }
    } catch (error) {
      log(`⚠️ HTTPS development setup failed: ${error}`);
    }
  }
})();
