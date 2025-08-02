import { type Contact, contacts, newsletterSubscribers, type NewsletterSubscriber, type InsertNewsletterSubscriber } from "@shared/schema";
import { db } from "./db";
import { sql, eq, and, count } from "drizzle-orm";

// Type pour l'insertion sans privacy
type ContactInsert = {
  name: string;
  email: string;
  phone?: string;
  budget?: string;
  projectTypes?: string[];
  message: string;
  newsletter?: boolean;
};

export interface IStorage {
  createContact(contact: ContactInsert): Promise<Contact>;
  // Newsletter methods
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscriber(email: string): Promise<NewsletterSubscriber | undefined>;
  updateNewsletterSubscriber(email: string, updates: Partial<NewsletterSubscriber>): Promise<NewsletterSubscriber>;
  getNewsletterStats(): Promise<{
    totalSubscribers: number;
    activeSubscribers: number;
    recentSubscriptions: number;
    unsubscribeRate: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async createContact(insertContact: ContactInsert): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  // Newsletter methods implementation
  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [newSubscriber] = await db
      .insert(newsletterSubscribers)
      .values(subscriber)
      .returning();
    return newSubscriber;
  }

  async getNewsletterSubscriber(email: string): Promise<NewsletterSubscriber | undefined> {
    const [subscriber] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email));
    return subscriber;
  }

  async updateNewsletterSubscriber(email: string, updates: Partial<NewsletterSubscriber>): Promise<NewsletterSubscriber> {
    const [updatedSubscriber] = await db
      .update(newsletterSubscribers)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(newsletterSubscribers.email, email))
      .returning();
    return updatedSubscriber;
  }

  async getNewsletterStats(): Promise<{
    totalSubscribers: number;
    activeSubscribers: number;
    recentSubscriptions: number;
    unsubscribeRate: number;
  }> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Total subscribers
    const [totalResult] = await db
      .select({ count: count() })
      .from(newsletterSubscribers);

    // Active subscribers
    const [activeResult] = await db
      .select({ count: count() })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.isActive, true));

    // Recent subscriptions (last 30 days)
    const [recentResult] = await db
      .select({ count: count() })
      .from(newsletterSubscribers)
      .where(and(
        eq(newsletterSubscribers.isActive, true),
        sql`${newsletterSubscribers.subscribedAt} >= ${thirtyDaysAgo}`
      ));

    // Unsubscribed count
    const [unsubscribedResult] = await db
      .select({ count: count() })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.isActive, false));

    const totalSubscribers = totalResult.count;
    const activeSubscribers = activeResult.count;
    const recentSubscriptions = recentResult.count;
    const unsubscribedCount = unsubscribedResult.count;

    const unsubscribeRate = totalSubscribers > 0 
      ? (unsubscribedCount / totalSubscribers) * 100 
      : 0;

    return {
      totalSubscribers,
      activeSubscribers,
      recentSubscriptions,
      unsubscribeRate: Math.round(unsubscribeRate * 100) / 100, // Round to 2 decimals
    };
  }
}

export const storage = new DatabaseStorage();
