// Fonction commune pour formater le numéro de téléphone français automatiquement
export const formatPhoneNumber = (value: string) => {
  // Enlever tous les caractères non-numériques sauf le +
  const cleaned = value.replace(/[^\d+]/g, '');
  
  // Si commence par +33, remplacer par 0
  let formatted = cleaned.replace(/^\+33/, '0');
  
  // Prendre seulement les 10 premiers chiffres
  formatted = formatted.substring(0, 10);
  
  // Formatage automatique dès le 3ème chiffre : XX XX XX XX XX
  if (formatted.length >= 3) {
    const parts = [];
    for (let i = 0; i < formatted.length; i += 2) {
      if (i === 0) {
        parts.push(formatted.substring(i, i + 2)); // 2 premiers chiffres
      } else {
        parts.push(formatted.substring(i, i + 2)); // Groupes de 2
      }
    }
    formatted = parts.filter(part => part.length > 0).join(' ');
  }
  
  return formatted;
};

// Fonction de validation pour les numéros français
export const isValidPhoneNumber = (phone: string) => {
  if (!phone) return true; // Optionnel
  const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
  const cleanPhone = phone.replace(/\s/g, '');
  return phoneRegex.test(cleanPhone);
};

// Fonction de validation pour les emails
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};