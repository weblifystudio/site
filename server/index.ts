import express, { type Request, Response, NextFunction } from "express";
import http from "http";
import path from "path";
import compression from "compression";
import helmet from "helmet";
import { registerRoutes } from "./routes";

const app = express();

// Configuration trust proxy pour production
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

// Headers de sécurité SSL
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Middleware de redirection HTTPS (uniquement en production)
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});

// Logging middleware simplifié
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
        logLine += ` :: ${JSON.stringify(capturedJsonResponse).substring(0, 100)}...`;
      }

      if (duration > 1000) {
        console.warn(`⚠️ Requête lente: ${logLine}`);
      }
    }
  });

  next();
});

// Configuration serveur HTTP simple
const httpServer = createServer();

function createServer() {
  const server = http.createServer(app);
  
  registerRoutes(app);

  // Serve static files from client/dist in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("dist/public", { maxAge: '1y' }));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), "dist/public/index.html"));
    });
  } else {
    // Development mode - serve from dist/public
    app.use(express.static("dist/public", { maxAge: 0 }));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), "dist/public/index.html"));
    });
  }

  return server;
}

// Démarrage du serveur
const PORT = Number(process.env.PORT) || 5000;

httpServer.listen(PORT, "0.0.0.0", () => {
  const timestamp = new Date().toLocaleTimeString('fr-FR');
  console.log(`${timestamp} [express] 🌐 HTTP Server serving on port ${PORT}`);
  console.log(`${timestamp} [express] 🔒 SSL Security headers enabled`);
  console.log(`${timestamp} [express] ✅ Ready for HTTPS deployment`);
});