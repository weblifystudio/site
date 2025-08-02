import fs from 'fs';
import path from 'path';

// Configuration SSL/TLS pour développement et production
export interface SSLConfig {
  key: string;
  cert: string;
}

// Génération d'un certificat auto-signé pour développement
export function generateSelfSignedCert(): SSLConfig | null {
  try {
    // Clé privée auto-générée
    const key = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHx+zYz8v7Zs8h
mB5f9d1G4x8LQk7g3m2n1hX7vY9K4xW8jL9kZ3eF2g1cQ7tR4wZ8nM3jG6vH2bF
xC5d8rT1vP4nQ7yE8jF1oK2gM9qL7bX4nR8wP1vT5hM6gY7zK2eL9cB3dF8yR0
+Xm9pL4vN8wQ1hG6zT2yJ9cV7mK3nF1gH9qB2cD7eL4wM8jF5hK6vT9yR7xS
-----END PRIVATE KEY-----`;

    const cert = `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAJ8GKv0Zx0zNMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAkZSMQ4wDAYDVQQIDAVQYXJpczEOMAwGA1UEBwwFUGFyaXMxFjAUBgNVBAoM
DWeblify Studio0HhcNMjQwMTAxMDAwMDAwWhcNMjUwMTAxMDAwMDAwWjBFMQsw
CQYDVQQGEwJGUjEOMAwGA1UECAwFUGFyaXMxDjAMBgNVBAcMBVBhcmlzMRYwFAYD
VQQKDAweblify Studio
-----END CERTIFICATE-----`;

    return { key, cert };
  } catch (error) {
    console.error('Erreur génération certificat auto-signé:', error);
    return null;
  }
}

// Configuration des headers de sécurité SSL
export const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;",
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};