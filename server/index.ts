import express, { type Request, Response, NextFunction } from "express";
import https from "https";
import http from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { generateSelfSignedCert, securityHeaders } from "./ssl-config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

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
