// Service de newsletter autonome avec base de données
import { db } from "./db";
import { newsletterSubscribers } from "@shared/schema";
import { eq, sql } from "drizzle-orm";

export async function addToNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Vérifier si l'email est valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Adresse email invalide' };
    }

    // Vérifier si le contact existe déjà
    const existingSubscriber = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email.toLowerCase()))
      .limit(1);

    if (existingSubscriber.length > 0) {
      // Si l'abonné existe mais est inactif, le réactiver
      if (!existingSubscriber[0].isActive) {
        await db
          .update(newsletterSubscribers)
          .set({ 
            isActive: true,
            subscribedAt: sql`NOW()`
          })
          .where(eq(newsletterSubscribers.email, email.toLowerCase()));
        
        console.log(`📧 Newsletter: Réabonnement de ${email}`);
        return { success: true };
      } else {
        // Déjà abonné et actif
        return { success: true };
      }
    }

    // Ajouter le nouvel abonné
    await db
      .insert(newsletterSubscribers)
      .values({
        email: email.toLowerCase(),
        isActive: true,
      });

    console.log(`📧 Newsletter: Nouveau abonné ${email}`);
    return { success: true };
    
  } catch (error) {
    console.error('Newsletter database error:', error);
    return { success: false, error: 'Erreur lors de l\'inscription à la newsletter' };
  }
}

// Récupérer tous les abonnés actifs (pour l'admin)
export async function getAllActiveSubscribers(): Promise<{ success: boolean; subscribers?: any[]; error?: string }> {
  try {
    const subscribers = await db
      .select({
        id: newsletterSubscribers.id,
        email: newsletterSubscribers.email,
        subscribedAt: newsletterSubscribers.subscribedAt,
      })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.isActive, true))
      .orderBy(sql`${newsletterSubscribers.subscribedAt} DESC`);

    return { success: true, subscribers };
  } catch (error) {
    console.error('Newsletter fetch error:', error);
    return { success: false, error: 'Erreur lors de la récupération des abonnés' };
  }
}

// Désabonner un utilisateur
export async function unsubscribeFromNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    await db
      .update(newsletterSubscribers)
      .set({ isActive: false })
      .where(eq(newsletterSubscribers.email, email.toLowerCase()));

    console.log(`📧 Newsletter: Désabonnement de ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return { success: false, error: 'Erreur lors du désabonnement' };
  }
}