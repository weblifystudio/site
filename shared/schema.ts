import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  budget: text("budget"),
  projectTypes: json("project_types").$type<string[]>(),
  message: text("message").notNull(),
  newsletter: boolean("newsletter").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});



export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide. Veuillez réessayer.'),
  phone: z.string().optional().refine((val) => {
    if (!val) return true; // Optional field
    // Regex qui accepte tous les numéros français y compris DOM-TOM (05)
    const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
    const cleanPhone = val.replace(/\s/g, '');
    return phoneRegex.test(cleanPhone);
  }, 'Numéro de téléphone français invalide (ex: 06 12 34 56 78, 05 94 12 34 56)'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Newsletter subscribers table
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  firstName: varchar("firstName").notNull(),
  lastName: varchar("lastName").notNull(),
  interests: json("interests").default([]),
  source: varchar("source").default('website'),
  unsubscribeToken: varchar("unsubscribeToken").notNull(),
  isActive: boolean("isActive").default(true),
  subscribedAt: timestamp("subscribedAt").defaultNow(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
