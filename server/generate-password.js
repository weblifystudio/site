#!/usr/bin/env node

// Utilitaire pour générer un hash de mot de passe sécurisé
// Usage: node server/generate-password.js "votre-mot-de-passe"

const crypto = require('crypto');

function hashPassword(password, salt) {
  const useSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, useSalt, 10000, 64, 'sha512').toString('hex');
  return `${useSalt}:${hash}`;
}

const password = process.argv[2];

if (!password) {
  console.log('❌ Usage: node server/generate-password.js "votre-mot-de-passe"');
  console.log('');
  console.log('Exemple:');
  console.log('  node server/generate-password.js "MonMotDePasseSecurise123!"');
  console.log('');
  console.log('⚠️ Attention: Utilisez un mot de passe fort avec:');
  console.log('  - Au moins 12 caractères');
  console.log('  - Majuscules et minuscules');
  console.log('  - Chiffres et caractères spéciaux');
  process.exit(1);
}

if (password.length < 8) {
  console.log('❌ Mot de passe trop court! Minimum 8 caractères recommandé.');
  process.exit(1);
}

const hash = hashPassword(password);

console.log('🔐 Hash généré avec succès!');
console.log('');
console.log('Variables d\'environnement à ajouter:');
console.log('ADMIN_USERNAME=admin');
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log('');
console.log('⚠️ SÉCURITÉ:');
console.log('1. Ajoutez ces variables dans les secrets Replit');
console.log('2. Ne partagez JAMAIS le hash généré');
console.log('3. Effacez l\'historique de commande après usage');
console.log('4. Supprimez ce fichier generate-password.js après usage');