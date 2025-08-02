import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// Configuration sécurisée - à définir dans les variables d'environnement
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

// Sessions en mémoire (pour plus de sécurité, pas de stockage persistant)
const activeSessions = new Map<string, { userId: string; createdAt: Date; lastAccess: Date }>();

// Hash sécurisé du mot de passe
function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const useSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, useSalt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: useSalt };
}

// Vérification du mot de passe
function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  const { hash } = hashPassword(password, salt);
  return hash === storedHash;
}

// Génération d'un token de session sécurisé
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Middleware de vérification d'authentification
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const sessionToken = req.headers.authorization?.replace('Bearer ', '') || 
                      req.cookies?.adminSession;

  if (!sessionToken) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }

  const session = activeSessions.get(sessionToken);
  if (!session) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired session' 
    });
  }

  // Vérifier si la session n'est pas expirée (24h)
  const now = new Date();
  const sessionAge = now.getTime() - session.lastAccess.getTime();
  if (sessionAge > 24 * 60 * 60 * 1000) { // 24 heures
    activeSessions.delete(sessionToken);
    return res.status(401).json({ 
      success: false, 
      message: 'Session expired' 
    });
  }

  // Mettre à jour le dernier accès
  session.lastAccess = now;
  next();
}

// Endpoint de connexion
export function loginHandler(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username and password required' 
    });
  }

  // Vérifier les identifiants
  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }

  // Si pas de hash configuré, créer un hash temporaire (development only)
  if (!ADMIN_PASSWORD_HASH) {
    console.warn('⚠️ ADMIN_PASSWORD_HASH not set! Using temporary password "admin123"');
    const tempHash = hashPassword('admin123');
    if (!verifyPassword(password, tempHash.hash, tempHash.salt)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
  } else {
    // Parse le hash stocké (format: salt:hash)
    const [salt, hash] = ADMIN_PASSWORD_HASH.split(':');
    if (!verifyPassword(password, hash, salt)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
  }

  // Créer une session
  const sessionToken = generateSessionToken();
  const session = {
    userId: username,
    createdAt: new Date(),
    lastAccess: new Date()
  };

  activeSessions.set(sessionToken, session);

  // Nettoyer les anciennes sessions (plus de 24h)
  const now = new Date();
  activeSessions.forEach((sess, token) => {
    if (now.getTime() - sess.lastAccess.getTime() > 24 * 60 * 60 * 1000) {
      activeSessions.delete(token);
    }
  });

  res.json({ 
    success: true, 
    token: sessionToken,
    message: 'Login successful' 
  });
}

// Endpoint de déconnexion
export function logoutHandler(req: Request, res: Response) {
  const sessionToken = req.headers.authorization?.replace('Bearer ', '') || 
                      req.cookies?.adminSession;

  if (sessionToken) {
    activeSessions.delete(sessionToken);
  }

  res.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
}

// Endpoint pour vérifier le statut de la session
export function statusHandler(req: Request, res: Response) {
  res.json({ 
    success: true, 
    authenticated: true,
    user: 'admin'
  });
}

// Utilitaire pour générer un hash de mot de passe (à utiliser en development)
export function generatePasswordHash(password: string): string {
  const { hash, salt } = hashPassword(password);
  return `${salt}:${hash}`;
}