// Service de newsletter avec Brevo
interface BrevoContact {
  email: string;
  attributes?: {
    FIRSTNAME?: string;
    LASTNAME?: string;
  };
  listIds?: number[];
}

export async function addToNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
  if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY not configured');
    return { success: false, error: 'Service de newsletter non configuré' };
  }

  try {
    // Créer ou mettre à jour le contact dans Brevo
    const contactData: BrevoContact = {
      email: email,
      attributes: {},
      listIds: [2] // ID de votre liste newsletter (à configurer dans Brevo)
    };

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify(contactData)
    });

    if (response.ok) {
      return { success: true };
    } else if (response.status === 400) {
      // Contact existe déjà - c'est OK
      const errorData = await response.json();
      if (errorData.code === 'duplicate_parameter') {
        return { success: true }; // Contact déjà inscrit
      }
    }
    
    const errorData = await response.text();
    console.error('Brevo newsletter error:', response.status, errorData);
    return { success: false, error: 'Erreur lors de l\'inscription' };
    
  } catch (error) {
    console.error('Newsletter service error:', error);
    return { success: false, error: 'Erreur réseau lors de l\'inscription' };
  }
}