import { Request, Response, NextFunction } from 'express';

// Système de monitoring des erreurs
export class ErrorMonitor {
  private static errors: Array<{
    timestamp: Date;
    error: string;
    path: string;
    method: string;
    ip: string;
  }> = [];

  static logError(req: Request, error: any) {
    this.errors.push({
      timestamp: new Date(),
      error: error.message || String(error),
      path: req.path,
      method: req.method,
      ip: req.ip || 'unknown'
    });

    // Garder seulement les 100 dernières erreurs
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-100);
    }

    console.error(`🚨 [${new Date().toISOString()}] ${req.method} ${req.path} - ${error.message}`);
  }

  static getRecentErrors() {
    return this.errors.slice(-20); // 20 dernières erreurs
  }
}

// Middleware de monitoring de santé
export const healthCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/health' || req.path === '/api/health') {
    const healthData = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version,
      environment: process.env.NODE_ENV || 'development',
      recentErrors: ErrorMonitor.getRecentErrors().length
    };

    res.json(healthData);
    return;
  }
  
  next();
};

// Middleware de métriques
export class MetricsCollector {
  private static requests = 0;
  private static errors = 0;
  private static responseTimes: number[] = [];

  static incrementRequests() {
    this.requests++;
  }

  static incrementErrors() {
    this.errors++;
  }

  static addResponseTime(time: number) {
    this.responseTimes.push(time);
    // Garder seulement les 1000 derniers temps de réponse
    if (this.responseTimes.length > 1000) {
      this.responseTimes = this.responseTimes.slice(-1000);
    }
  }

  static getMetrics() {
    const avgResponseTime = this.responseTimes.length > 0 
      ? this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length 
      : 0;

    return {
      totalRequests: this.requests,
      totalErrors: this.errors,
      averageResponseTime: Math.round(avgResponseTime),
      errorRate: this.requests > 0 ? ((this.errors / this.requests) * 100).toFixed(2) : '0.00'
    };
  }
}

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/metrics' || req.path === '/api/metrics') {
    res.json(MetricsCollector.getMetrics());
    return;
  }

  const startTime = Date.now();
  MetricsCollector.incrementRequests();

  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    MetricsCollector.addResponseTime(responseTime);

    if (res.statusCode >= 400) {
      MetricsCollector.incrementErrors();
    }
  });

  next();
};