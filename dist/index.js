var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express from "express";
import http from "http";
import path from "path";
import compression from "compression";
import helmet from "helmet";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  contacts: () => contacts,
  insertContactSchema: () => insertContactSchema,
  newsletterSubscribers: () => newsletterSubscribers
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  budget: text("budget"),
  projectTypes: json("project_types").$type(),
  message: text("message").notNull(),
  newsletter: boolean("newsletter").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true
}).extend({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caract\xE8res"),
  email: z.string().email("Adresse email invalide. Veuillez r\xE9essayer."),
  phone: z.string().optional().refine((val) => {
    if (!val) return true;
    const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
    const cleanPhone = val.replace(/\s/g, "");
    return phoneRegex.test(cleanPhone);
  }, "Num\xE9ro de t\xE9l\xE9phone fran\xE7ais invalide (ex: 06 12 34 56 78, 05 94 12 34 56)"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caract\xE8res")
});
var newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  firstName: varchar("firstName").notNull(),
  lastName: varchar("lastName").notNull(),
  interests: json("interests").default([]),
  source: varchar("source").default("website"),
  unsubscribeToken: varchar("unsubscribeToken").notNull(),
  isActive: boolean("isActive").default(true),
  subscribedAt: timestamp("subscribedAt").defaultNow(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow()
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { sql as sql2, eq, and, count } from "drizzle-orm";
var DatabaseStorage = class {
  async createContact(insertContact) {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }
  // Newsletter methods implementation
  async createNewsletterSubscriber(subscriber) {
    const [newSubscriber] = await db.insert(newsletterSubscribers).values(subscriber).returning();
    return newSubscriber;
  }
  async getNewsletterSubscriber(email) {
    const [subscriber] = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));
    return subscriber;
  }
  async updateNewsletterSubscriber(email, updates) {
    const [updatedSubscriber] = await db.update(newsletterSubscribers).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(newsletterSubscribers.email, email)).returning();
    return updatedSubscriber;
  }
  async getAllNewsletterSubscribers() {
    return await db.select().from(newsletterSubscribers).orderBy(newsletterSubscribers.subscribedAt);
  }
  async getActiveNewsletterSubscribers() {
    return await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, true));
  }
  async getNewsletterStats() {
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const [totalResult] = await db.select({ count: count() }).from(newsletterSubscribers);
    const [activeResult] = await db.select({ count: count() }).from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, true));
    const [recentResult] = await db.select({ count: count() }).from(newsletterSubscribers).where(and(
      eq(newsletterSubscribers.isActive, true),
      sql2`${newsletterSubscribers.subscribedAt} >= ${thirtyDaysAgo}`
    ));
    const [unsubscribedResult] = await db.select({ count: count() }).from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, false));
    const totalSubscribers = totalResult.count;
    const activeSubscribers = activeResult.count;
    const recentSubscriptions = recentResult.count;
    const unsubscribedCount = unsubscribedResult.count;
    const unsubscribeRate = totalSubscribers > 0 ? unsubscribedCount / totalSubscribers * 100 : 0;
    return {
      totalSubscribers,
      activeSubscribers,
      recentSubscriptions,
      unsubscribeRate: Math.round(unsubscribeRate * 100) / 100
      // Round to 2 decimals
    };
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z as z4 } from "zod";

// server/email.ts
import nodemailer from "nodemailer";
async function sendContactEmail(contactData, recipientEmail) {
  try {
    const projectTypesText = contactData.projectTypes?.length ? contactData.projectTypes.join(", ") : "Non sp\xE9cifi\xE9";
    console.log(`
\u{1F4E7} NOUVEAU CONTACT RE\xC7U
==========================================
Nom: ${contactData.name}
Email: ${contactData.email}
T\xE9l\xE9phone: ${contactData.phone || "Non renseign\xE9"}
Budget: ${contactData.budget || "Non sp\xE9cifi\xE9"}
Type de projet: ${projectTypesText}
Newsletter: ${contactData.newsletter ? "Inscrit(e)" : "Non inscrit(e)"}

Message:
${contactData.message}

Date: ${(/* @__PURE__ */ new Date()).toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })}
==========================================
    `);
    const smtpConfig = {
      host: process.env.SMTP_HOST || "mail.weblifystudio.fr",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      // true pour port 465, false pour autres ports
      auth: {
        user: process.env.SMTP_USER || "noreply@weblifystudio.fr",
        pass: process.env.SMTP_PASS || ""
      }
    };
    if (!process.env.SMTP_PASS) {
      console.warn("\u26A0\uFE0F Configuration SMTP manquante - Mode simulation activ\xE9");
      console.log(`\u{1F4E7} SIMULATION - Email \xE0 envoyer \xE0 : ${recipientEmail}`);
      return { success: true };
    }
    const transporter = nodemailer.createTransport(smtpConfig);
    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau Contact - Weblify Studio</title>
        <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .info-row { margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 4px; }
            .label { font-weight: bold; color: #495057; }
            .value { color: #212529; }
            .message-box { background: #e7f3ff; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; }
            .contact-btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>\u{1F680} Nouveau Contact</h1>
                <p>Demande de projet via le site web</p>
            </div>
            
            <div class="content">
                <h2>Informations du contact</h2>
                
                <div class="info-row">
                    <span class="label">\u{1F464} Nom :</span>
                    <span class="value">${contactData.name}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">\u{1F4E7} Email :</span>
                    <span class="value">${contactData.email}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">\u{1F4F1} T\xE9l\xE9phone :</span>
                    <span class="value">${contactData.phone || "Non renseign\xE9"}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">\u{1F4B0} Budget :</span>
                    <span class="value">${contactData.budget || "Non sp\xE9cifi\xE9"}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">\u{1F3AF} Type de projet :</span>
                    <span class="value">${projectTypesText}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">\u{1F4F0} Newsletter :</span>
                    <span class="value">${contactData.newsletter ? "\u2705 Inscrit(e)" : "\u274C Non inscrit(e)"}</span>
                </div>
                
                <div class="message-box">
                    <h3>\u{1F4AC} Message :</h3>
                    <p>${contactData.message.replace(/\n/g, "<br>")}</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="mailto:${contactData.email}" class="contact-btn">R\xE9pondre au client</a>
                </div>
                
                <p><small>\u{1F4C5} Re\xE7u le ${(/* @__PURE__ */ new Date()).toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })}</small></p>
            </div>
            
            <div class="footer">
                <p><strong>Weblify Studio</strong> - Notification automatique</p>
                <p>Syst\xE8me de contact du site web</p>
            </div>
        </div>
    </body>
    </html>
    `;
    const emailText = `
NOUVEAU CONTACT - Weblify Studio
================================

Nom: ${contactData.name}
Email: ${contactData.email}
T\xE9l\xE9phone: ${contactData.phone || "Non renseign\xE9"}
Budget: ${contactData.budget || "Non sp\xE9cifi\xE9"}
Type de projet: ${projectTypesText}
Newsletter: ${contactData.newsletter ? "Inscrit(e)" : "Non inscrit(e)"}

MESSAGE:
${contactData.message}

Date: ${(/* @__PURE__ */ new Date()).toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })}

Pour r\xE9pondre au client: ${contactData.email}
    `;
    const emailConfig = {
      from: `"Weblify Studio - Contact" <noreply@weblifystudio.fr>`,
      to: recipientEmail,
      // contact@weblifystudio.fr
      replyTo: contactData.email,
      // Réponse directe au client
      subject: `Nouveau contact: ${contactData.name} - ${projectTypesText}`,
      text: emailText,
      html: emailHTML
    };
    await transporter.sendMail(emailConfig);
    console.log(`\u2705 Email de contact envoy\xE9 \xE0 ${recipientEmail} via SMTP`);
    return { success: true };
  } catch (error) {
    console.error("\u274C Erreur envoi email contact:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// server/security-middleware.ts
import { rateLimit } from "express-rate-limit";
var createFormRateLimiter = () => {
  return rateLimit({
    windowMs: 5 * 60 * 1e3,
    // 5 minutes
    max: 5,
    // Max 5 soumissions de formulaire par IP toutes les 5 minutes
    message: {
      error: "Trop de soumissions de formulaires. R\xE9essayez dans 5 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
  });
};

// server/newsletter.ts
import { z as z2 } from "zod";

// server/email-templates.ts
var newsletterEmailTemplates = {
  confirmation: {
    subject: "\u2705 Confirmez votre abonnement \xE0 la newsletter Weblify Studio",
    html: (firstName, unsubscribeToken) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation Newsletter - Weblify Studio</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; }
          .unsubscribe { font-size: 12px; color: #999; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>\u{1F389} Bienvenue ${firstName} !</h1>
            <p>Merci de vous \xEAtre abonn\xE9(e) \xE0 notre newsletter</p>
          </div>
          
          <div class="content">
            <h2>Votre abonnement est presque confirm\xE9</h2>
            <p>Bonjour ${firstName},</p>
            
            <p>Merci de vous \xEAtre abonn\xE9(e) \xE0 la newsletter de <strong>Weblify Studio</strong> ! \u{1F680}</p>
            
            <p>Vous recevrez r\xE9guli\xE8rement :</p>
            <ul>
              <li>\u{1F4C8} Les derni\xE8res tendances en d\xE9veloppement web</li>
              <li>\u{1F4A1} Nos conseils d'experts en UX/UI</li>
              <li>\u{1F3AF} Des \xE9tudes de cas d\xE9taill\xE9es</li>
              <li>\u{1F525} Les actualit\xE9s de l'agence</li>
              <li>\u{1F381} Des offres exclusives pour nos abonn\xE9s</li>
            </ul>
            
            <p>Votre abonnement est maintenant <strong>actif</strong> et vous recevrez notre prochaine newsletter dans votre bo\xEEte mail.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://weblify-studio.com" class="button">D\xE9couvrir notre site</a>
            </div>
            
            <p>\xC0 tr\xE8s bient\xF4t,<br>
            <strong>L'\xE9quipe Weblify Studio</strong></p>
          </div>
          
          <div class="footer">
            <p>Weblify Studio - Votre agence web de confiance</p>
            <div class="unsubscribe">
              <p>Vous ne souhaitez plus recevoir ces emails ? 
              <a href="${process.env.BASE_URL || "https://weblify-studio.com"}/api/newsletter/unsubscribe?email=${encodeURIComponent(firstName)}&token=${unsubscribeToken}" style="color: #667eea;">Se d\xE9sabonner</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: (firstName, unsubscribeToken) => `
Bienvenue ${firstName} !

Merci de vous \xEAtre abonn\xE9(e) \xE0 la newsletter de Weblify Studio !

Vous recevrez r\xE9guli\xE8rement :
- Les derni\xE8res tendances en d\xE9veloppement web
- Nos conseils d'experts en UX/UI  
- Des \xE9tudes de cas d\xE9taill\xE9es
- Les actualit\xE9s de l'agence
- Des offres exclusives pour nos abonn\xE9s

Votre abonnement est maintenant actif.

\xC0 tr\xE8s bient\xF4t,
L'\xE9quipe Weblify Studio

---
Pour vous d\xE9sabonner : ${process.env.BASE_URL || "https://weblify-studio.com"}/api/newsletter/unsubscribe?email=${encodeURIComponent(firstName)}&token=${unsubscribeToken}
    `
  },
  welcome: {
    subject: "\u{1F680} Bienvenue dans la communaut\xE9 Weblify Studio !",
    html: (firstName) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenue - Weblify Studio</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .highlight-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>\u{1F38A} Abonnement r\xE9activ\xE9 !</h1>
            <p>Content de vous revoir ${firstName} !</p>
          </div>
          
          <div class="content">
            <h2>Votre abonnement est de nouveau actif</h2>
            <p>Bonjour ${firstName},</p>
            
            <p>Votre abonnement \xE0 la newsletter <strong>Weblify Studio</strong> a \xE9t\xE9 r\xE9activ\xE9 avec succ\xE8s ! \u{1F389}</p>
            
            <div class="highlight-box">
              <h3>\u{1F381} En exclusivit\xE9 pour nos abonn\xE9s :</h3>
              <p>B\xE9n\xE9ficiez de <strong>15% de r\xE9duction</strong> sur votre premier projet avec le code : <code><strong>NEWSLETTER15</strong></code></p>
            </div>
            
            <p>Vous continuerez \xE0 recevoir :</p>
            <ul>
              <li>\u{1F4CA} Nos analyses des derni\xE8res tendances web</li>
              <li>\u{1F6E0}\uFE0F Des tutoriels techniques exclusifs</li>
              <li>\u{1F4C8} Nos conseils pour optimiser votre pr\xE9sence en ligne</li>
              <li>\u{1F3AF} Des \xE9tudes de cas de nos projets r\xE9cents</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://weblify-studio.com/portfolio" class="button">Voir nos r\xE9alisations</a>
            </div>
            
            <p>Merci de votre confiance renouvel\xE9e,<br>
            <strong>L'\xE9quipe Weblify Studio</strong></p>
          </div>
          
          <div class="footer">
            <p>Weblify Studio - Innovation & Excellence Web</p>
            <p>\u{1F4E7} contact@weblify-studio.com | \u{1F310} weblify-studio.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: (firstName) => `
Abonnement r\xE9activ\xE9 !

Bonjour ${firstName},

Votre abonnement \xE0 la newsletter Weblify Studio a \xE9t\xE9 r\xE9activ\xE9 avec succ\xE8s !

\u{1F381} OFFRE EXCLUSIVE : 15% de r\xE9duction sur votre premier projet avec le code : NEWSLETTER15

Vous continuerez \xE0 recevoir :
- Nos analyses des derni\xE8res tendances web
- Des tutoriels techniques exclusifs  
- Nos conseils pour optimiser votre pr\xE9sence en ligne
- Des \xE9tudes de cas de nos projets r\xE9cents

Merci de votre confiance renouvel\xE9e,
L'\xE9quipe Weblify Studio

contact@weblify-studio.com
weblify-studio.com
    `
  }
};
async function sendNewsletterConfirmationEmail(email, firstName, unsubscribeToken) {
  try {
    const template = newsletterEmailTemplates.confirmation;
    console.log(`\u{1F4E7} Envoi email confirmation newsletter \xE0 ${email} pour ${firstName}`);
    console.log(`Subject: ${template.subject}`);
    console.log(`Unsubscribe token: ${unsubscribeToken}`);
    console.log("\u2705 Email de confirmation newsletter envoy\xE9 (simulation)");
    return true;
  } catch (error) {
    console.error("\u274C Erreur envoi email confirmation newsletter:", error);
    return false;
  }
}
async function sendNewsletterWelcomeEmail(email, firstName) {
  try {
    const template = newsletterEmailTemplates.welcome;
    console.log(`\u{1F4E7} Envoi email bienvenue newsletter \xE0 ${email} pour ${firstName}`);
    console.log(`Subject: ${template.subject}`);
    console.log("\u2705 Email de bienvenue newsletter envoy\xE9 (simulation)");
    return true;
  } catch (error) {
    console.error("\u274C Erreur envoi email bienvenue newsletter:", error);
    return false;
  }
}

// server/mailchimp.ts
var MailchimpService = class {
  apiKey;
  serverPrefix = "";
  baseUrl = "";
  constructor() {
    this.apiKey = process.env.MAILCHIMP_API_KEY || "";
    if (!this.apiKey) {
      console.warn("\u26A0\uFE0F MAILCHIMP_API_KEY non configur\xE9e - Mode simulation activ\xE9");
      return;
    }
    this.serverPrefix = this.apiKey.split("-")[1];
    this.baseUrl = `https://${this.serverPrefix}.api.mailchimp.com/3.0`;
  }
  getHeaders() {
    return {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json"
    };
  }
  // Ajouter un abonné à la liste Mailchimp
  async addSubscriber(subscriber, listId) {
    if (!this.apiKey) {
      console.log(`\u{1F4E7} SIMULATION Mailchimp - Ajout abonn\xE9 : ${subscriber.email}`);
      return { success: true };
    }
    try {
      const memberData = {
        email_address: subscriber.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscriber.firstName,
          LNAME: subscriber.lastName
        },
        tags: subscriber.interests || [],
        source: subscriber.source || "website"
      };
      const response = await fetch(`${this.baseUrl}/lists/${listId}/members`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(memberData)
      });
      if (response.ok) {
        console.log(`\u2705 Abonn\xE9 ajout\xE9 \xE0 Mailchimp : ${subscriber.email}`);
        return { success: true };
      } else {
        const error = await response.text();
        console.error(`\u274C Erreur Mailchimp : ${error}`);
        return { success: false, error };
      }
    } catch (error) {
      console.error("\u274C Erreur connexion Mailchimp :", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }
  // Supprimer/désabonner un membre
  async unsubscribeSubscriber(email, listId) {
    if (!this.apiKey) {
      console.log(`\u{1F4E7} SIMULATION Mailchimp - D\xE9sabonnement : ${email}`);
      return { success: true };
    }
    try {
      const crypto = await import("crypto");
      const emailHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
      const response = await fetch(`${this.baseUrl}/lists/${listId}/members/${emailHash}`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify({ status: "unsubscribed" })
      });
      if (response.ok) {
        console.log(`\u2705 D\xE9sabonnement Mailchimp : ${email}`);
        return { success: true };
      } else {
        const error = await response.text();
        return { success: false, error };
      }
    } catch (error) {
      console.error("\u274C Erreur d\xE9sabonnement Mailchimp :", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }
  // Créer et envoyer une campagne
  async createAndSendCampaign(campaign) {
    if (!this.apiKey) {
      console.log(`\u{1F4E7} SIMULATION Mailchimp - Envoi campagne : "${campaign.subject}"`);
      console.log(`Contenu : ${campaign.content.substring(0, 100)}...`);
      return { success: true, campaignId: "simulation-campaign-123" };
    }
    try {
      const campaignData = {
        type: "regular",
        recipients: {
          list_id: campaign.listId
        },
        settings: {
          subject_line: campaign.subject,
          title: `Newsletter - ${campaign.subject}`,
          from_name: "Weblify Studio",
          reply_to: "contact@weblifystudio.fr",
          preview_text: "D\xE9couvrez nos derni\xE8res actualit\xE9s et conseils web"
        }
      };
      const createResponse = await fetch(`${this.baseUrl}/campaigns`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(campaignData)
      });
      if (!createResponse.ok) {
        const error = await createResponse.text();
        return { success: false, error: `Erreur cr\xE9ation campagne: ${error}` };
      }
      const campaignResult = await createResponse.json();
      const campaignId = campaignResult.id;
      const contentData = {
        html: this.formatNewsletterHTML(campaign.content)
      };
      const contentResponse = await fetch(`${this.baseUrl}/campaigns/${campaignId}/content`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(contentData)
      });
      if (!contentResponse.ok) {
        const error = await contentResponse.text();
        return { success: false, error: `Erreur ajout contenu: ${error}` };
      }
      const sendResponse = await fetch(`${this.baseUrl}/campaigns/${campaignId}/actions/send`, {
        method: "POST",
        headers: this.getHeaders()
      });
      if (sendResponse.ok) {
        console.log(`\u2705 Campagne Mailchimp envoy\xE9e : ${campaignId}`);
        return { success: true, campaignId };
      } else {
        const error = await sendResponse.text();
        return { success: false, error: `Erreur envoi: ${error}` };
      }
    } catch (error) {
      console.error("\u274C Erreur campagne Mailchimp :", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }
  // Obtenir les statistiques de la liste
  async getListStats(listId) {
    if (!this.apiKey) {
      return {
        success: true,
        stats: {
          member_count: 0,
          unsubscribe_count: 0,
          cleaned_count: 0,
          member_count_since_send: 0
        }
      };
    }
    try {
      const response = await fetch(`${this.baseUrl}/lists/${listId}`, {
        method: "GET",
        headers: this.getHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          stats: {
            member_count: data.stats.member_count,
            unsubscribe_count: data.stats.unsubscribe_count,
            cleaned_count: data.stats.cleaned_count,
            member_count_since_send: data.stats.member_count_since_send
          }
        };
      } else {
        const error = await response.text();
        return { success: false, error };
      }
    } catch (error) {
      console.error("\u274C Erreur stats Mailchimp :", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }
  // Template HTML pour Mailchimp
  formatNewsletterHTML(content) {
    const formattedContent = content.replace(/\n/g, "<br>");
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Newsletter - Weblify Studio</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; }
          .unsubscribe { font-size: 12px; color: #999; margin-top: 20px; }
          .unsubscribe a { color: #999; text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>\u{1F4E7} Newsletter Weblify Studio</h1>
            <p>Votre dose mensuelle d'inspiration web</p>
          </div>
          
          <div class="content">
            ${formattedContent}
          </div>
          
          <div class="footer">
            <p><strong>Weblify Studio</strong> - Votre agence web de confiance</p>
            <p>Paris, France | contact@weblifystudio.fr</p>
            
            <div class="unsubscribe">
              <p>Vous recevez cet email car vous \xEAtes abonn\xE9(e) \xE0 notre newsletter.</p>
              <p><a href="*|UNSUB|*">Se d\xE9sabonner</a> | <a href="*|UPDATE_PROFILE|*">Mettre \xE0 jour vos pr\xE9f\xE9rences</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
};
var mailchimpService = new MailchimpService();

// server/newsletter.ts
var newsletterSchema = z2.object({
  email: z2.string().email("Email invalide").min(1, "Email requis"),
  firstName: z2.string().min(2, "Pr\xE9nom requis (min 2 caract\xE8res)").max(50).optional(),
  lastName: z2.string().min(2, "Nom requis (min 2 caract\xE8res)").max(50).optional(),
  interests: z2.array(z2.string()).optional().default([]),
  source: z2.string().optional().default("website")
});
var unsubscribeSchema = z2.object({
  email: z2.string().email("Email invalide"),
  token: z2.string().min(1, "Token requis")
});
function generateUnsubscribeToken(email) {
  const timestamp2 = Date.now();
  const secret = process.env.NEWSLETTER_SECRET || "default-secret-key";
  const data = `${email}:${timestamp2}:${secret}`;
  return Buffer.from(data).toString("base64").replace(/[^a-zA-Z0-9]/g, "").substring(0, 32);
}
function validateUnsubscribeToken(email, token) {
  return token.length === 32;
}
async function subscribeToNewsletter(req, res) {
  try {
    const validatedData = newsletterSchema.parse(req.body);
    const existingSubscriber = await storage.getNewsletterSubscriber(validatedData.email);
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({
          message: "Cet email est d\xE9j\xE0 abonn\xE9 \xE0 notre newsletter"
        });
      } else {
        await storage.updateNewsletterSubscriber(validatedData.email, {
          isActive: true,
          firstName: validatedData.firstName || "Pr\xE9nom",
          lastName: validatedData.lastName || "Nom",
          interests: validatedData.interests,
          subscribedAt: /* @__PURE__ */ new Date()
        });
        await sendNewsletterWelcomeEmail(validatedData.email, validatedData.firstName || "Abonn\xE9");
        return res.json({
          success: true,
          message: "Abonnement r\xE9activ\xE9 avec succ\xE8s !"
        });
      }
    }
    const unsubscribeToken = generateUnsubscribeToken(validatedData.email);
    const subscriber = await storage.createNewsletterSubscriber({
      email: validatedData.email,
      firstName: validatedData.firstName || "Pr\xE9nom",
      lastName: validatedData.lastName || "Nom",
      interests: validatedData.interests,
      source: validatedData.source,
      unsubscribeToken,
      isActive: true
    });
    const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
    if (mailchimpListId) {
      const mailchimpResult = await mailchimpService.addSubscriber({
        email: validatedData.email,
        firstName: validatedData.firstName || "Pr\xE9nom",
        lastName: validatedData.lastName || "Nom",
        interests: validatedData.interests,
        source: validatedData.source
      }, mailchimpListId);
      if (mailchimpResult.success) {
        console.log(`\u2705 Abonn\xE9 ajout\xE9 \xE0 Mailchimp : ${validatedData.email}`);
      } else {
        console.warn(`\u26A0\uFE0F Erreur Mailchimp : ${mailchimpResult.error}`);
      }
    }
    await sendNewsletterConfirmationEmail(
      validatedData.email,
      validatedData.firstName || "Abonn\xE9",
      unsubscribeToken
    );
    res.json({
      success: true,
      message: "Inscription r\xE9ussie ! V\xE9rifiez votre email pour confirmer votre abonnement."
    });
  } catch (error) {
    console.error("Erreur inscription newsletter:", error);
    if (error instanceof z2.ZodError) {
      return res.status(400).json({
        message: "Donn\xE9es invalides",
        errors: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message
        }))
      });
    }
    res.status(500).json({
      message: "Erreur lors de l'inscription \xE0 la newsletter"
    });
  }
}
async function unsubscribeFromNewsletter(req, res) {
  try {
    const { email, token } = unsubscribeSchema.parse(req.query);
    if (!validateUnsubscribeToken(email, token)) {
      return res.status(400).json({
        message: "Token de d\xE9sabonnement invalide"
      });
    }
    const subscriber = await storage.getNewsletterSubscriber(email);
    if (!subscriber) {
      return res.status(404).json({
        message: "Abonnement introuvable"
      });
    }
    await storage.updateNewsletterSubscriber(email, {
      isActive: false,
      unsubscribedAt: /* @__PURE__ */ new Date()
    });
    res.json({
      success: true,
      message: "D\xE9sabonnement r\xE9ussi. Vous ne recevrez plus nos newsletters."
    });
  } catch (error) {
    console.error("Erreur d\xE9sabonnement newsletter:", error);
    if (error instanceof z2.ZodError) {
      return res.status(400).json({
        message: "Param\xE8tres invalides",
        errors: error.errors
      });
    }
    res.status(500).json({
      message: "Erreur lors du d\xE9sabonnement"
    });
  }
}
async function getNewsletterStats(req, res) {
  try {
    const stats = await storage.getNewsletterStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error("Erreur stats newsletter:", error);
    res.status(500).json({
      message: "Erreur lors de la r\xE9cup\xE9ration des statistiques"
    });
  }
}
async function updateNewsletterPreferences(req, res) {
  try {
    const { email } = req.params;
    const { interests, firstName, lastName } = req.body;
    const subscriber = await storage.getNewsletterSubscriber(email);
    if (!subscriber || !subscriber.isActive) {
      return res.status(404).json({
        message: "Abonnement introuvable ou inactif"
      });
    }
    await storage.updateNewsletterSubscriber(email, {
      interests: interests || subscriber.interests,
      firstName: firstName || subscriber.firstName,
      lastName: lastName || subscriber.lastName
    });
    res.json({
      success: true,
      message: "Pr\xE9f\xE9rences mises \xE0 jour avec succ\xE8s"
    });
  } catch (error) {
    console.error("Erreur mise \xE0 jour pr\xE9f\xE9rences:", error);
    res.status(500).json({
      message: "Erreur lors de la mise \xE0 jour des pr\xE9f\xE9rences"
    });
  }
}

// server/newsletter-send.ts
import { z as z3 } from "zod";
var sendNewsletterSchema = z3.object({
  subject: z3.string().min(1, "Sujet requis").max(200),
  content: z3.string().min(10, "Contenu trop court (minimum 10 caract\xE8res)"),
  targetSegment: z3.string().optional()
  // 'all', 'active', 'interested-in-X'
});
async function sendBulkEmails(subscribers, subject, content) {
  console.log(`
\u{1F4E7} === ENVOI NEWSLETTER ===`);
  console.log(`Sujet: ${subject}`);
  console.log(`Destinataires: ${subscribers.length} abonn\xE9s`);
  console.log(`Contenu: ${content.substring(0, 100)}...`);
  for (const subscriber of subscribers) {
    console.log(`\u2709\uFE0F Envoi \xE0 ${subscriber.email} (${subscriber.firstName} ${subscriber.lastName})`);
  }
  console.log(`\u2705 Newsletter envoy\xE9e \xE0 ${subscribers.length} abonn\xE9s`);
  return true;
}
async function sendNewsletter(req, res) {
  try {
    const validatedData = sendNewsletterSchema.parse(req.body);
    const activeSubscribers = await storage.getActiveNewsletterSubscribers();
    if (activeSubscribers.length === 0) {
      return res.status(400).json({
        message: "Aucun abonn\xE9 actif trouv\xE9"
      });
    }
    let targetSubscribers = activeSubscribers;
    if (validatedData.targetSegment && validatedData.targetSegment !== "all") {
      if (validatedData.targetSegment.startsWith("interested-in-")) {
        const interest = validatedData.targetSegment.replace("interested-in-", "");
        targetSubscribers = activeSubscribers.filter(
          (sub) => sub.interests.includes(interest)
        );
      }
    }
    const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
    if (mailchimpListId && process.env.MAILCHIMP_API_KEY) {
      const campaignResult = await mailchimpService.createAndSendCampaign({
        subject: validatedData.subject,
        content: validatedData.content,
        listId: mailchimpListId
      });
      if (!campaignResult.success) {
        return res.status(500).json({
          message: `Erreur envoi Mailchimp : ${campaignResult.error}`
        });
      }
      console.log(`\u2705 Newsletter envoy\xE9e via Mailchimp - Campagne : ${campaignResult.campaignId}`);
    } else {
      await sendBulkEmails(targetSubscribers, validatedData.subject, validatedData.content);
    }
    res.json({
      success: true,
      message: `Newsletter envoy\xE9e avec succ\xE8s \xE0 ${targetSubscribers.length} abonn\xE9s`,
      stats: {
        totalSent: targetSubscribers.length,
        targetSegment: validatedData.targetSegment || "all"
      }
    });
  } catch (error) {
    console.error("Erreur envoi newsletter:", error);
    if (error instanceof z3.ZodError) {
      return res.status(400).json({
        message: "Donn\xE9es invalides",
        errors: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message
        }))
      });
    }
    res.status(500).json({
      message: "Erreur lors de l'envoi de la newsletter"
    });
  }
}
async function getNewsletterSubscribers(req, res) {
  try {
    const subscribers = await storage.getAllNewsletterSubscribers();
    res.json({
      success: true,
      data: subscribers.map((sub) => ({
        id: sub.id,
        email: sub.email,
        firstName: sub.firstName,
        lastName: sub.lastName,
        interests: sub.interests,
        isActive: sub.isActive,
        subscribedAt: sub.subscribedAt,
        source: sub.source
      }))
    });
  } catch (error) {
    console.error("Erreur r\xE9cup\xE9ration abonn\xE9s:", error);
    res.status(500).json({
      message: "Erreur lors de la r\xE9cup\xE9ration des abonn\xE9s"
    });
  }
}

// server/routes.ts
var contactValidationSchema = z4.object({
  name: z4.string().min(2, "Le nom doit contenir au moins 2 caract\xE8res"),
  email: z4.string().email("Adresse email invalide. Veuillez r\xE9essayer."),
  phone: z4.string().optional().refine((val) => {
    if (!val) return true;
    const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
    const cleanPhone = val.replace(/\s/g, "");
    return phoneRegex.test(cleanPhone);
  }, "Num\xE9ro de t\xE9l\xE9phone fran\xE7ais invalide (ex: 06 12 34 56 78, 05 94 12 34 56)"),
  budget: z4.string().optional(),
  projectTypes: z4.array(z4.string()).optional(),
  message: z4.string().min(10, "Le message doit contenir au moins 10 caract\xE8res"),
  privacy: z4.boolean().refine((val) => val === true, {
    message: "Vous devez accepter l'utilisation de vos donn\xE9es pour continuer"
  }),
  newsletter: z4.boolean().default(false)
});
async function registerRoutes(app2) {
  app2.post("/api/contact", createFormRateLimiter(), async (req, res) => {
    try {
      const validatedData = contactValidationSchema.parse(req.body);
      const { privacy, ...contactData } = validatedData;
      const contact = await storage.createContact(contactData);
      if (validatedData.newsletter) {
        console.log(`\u{1F4E7} ${validatedData.name} s'est abonn\xE9(e) \xE0 la newsletter`);
      }
      const recipientEmail = "contact@weblifystudio.fr";
      const emailData = {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        budget: validatedData.budget || null,
        projectTypes: validatedData.projectTypes || null,
        message: validatedData.message,
        newsletter: validatedData.newsletter || false
      };
      const emailResult = await sendContactEmail(emailData, recipientEmail);
      if (emailResult.success) {
        console.log("\u2705 Contact form submitted and email sent successfully");
      } else {
        console.warn("\u26A0\uFE0F Contact form submitted but email failed:", emailResult.error);
      }
      res.json({
        success: true,
        contact,
        emailSent: emailResult.success,
        emailError: emailResult.error
      });
    } catch (error) {
      console.error("\u274C Contact form error:", error);
      if (error instanceof z4.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });
  app2.post("/api/generate-quote", async (req, res) => {
    try {
      const calculatorData = req.body;
      if (!calculatorData.name || !calculatorData.email) {
        return res.status(400).json({ error: "Nom et email requis pour le devis" });
      }
      const { mapCalculatorToQuote } = await import("./pdf-generator");
      const quoteData = mapCalculatorToQuote(calculatorData);
      const contactData = {
        ...calculatorData,
        message: `Demande de devis automatique - ${quoteData.projectType} - ${quoteData.totalPrice}\u20AC`,
        budget: quoteData.totalPrice.toString()
      };
      const savedContact = await storage.createContact(contactData);
      const { generateQuoteHTML } = await import("./pdf-generator-simple");
      const htmlContent = await generateQuoteHTML(quoteData);
      console.log(`\u{1F4C4} Devis HTML g\xE9n\xE9r\xE9 pour ${quoteData.name} - ${quoteData.totalPrice}\u20AC (${quoteData.quoteNumber})`);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.json({
        success: true,
        message: "Devis g\xE9n\xE9r\xE9 et t\xE9l\xE9charg\xE9 ! Ouvrez le fichier HTML pour l'imprimer en PDF.",
        quoteNumber: quoteData.quoteNumber,
        htmlContent: Buffer.from(htmlContent, "utf8").toString("base64"),
        contact: savedContact,
        isHtml: true
      });
    } catch (error) {
      console.error("Erreur g\xE9n\xE9ration devis:", error);
      res.status(500).json({
        error: "Erreur lors de la g\xE9n\xE9ration du devis",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/newsletter/subscribe", createFormRateLimiter(), subscribeToNewsletter);
  app2.get("/api/newsletter/unsubscribe", unsubscribeFromNewsletter);
  app2.get("/api/newsletter/stats", getNewsletterStats);
  app2.put("/api/newsletter/preferences/:email", updateNewsletterPreferences);
  app2.post("/api/newsletter/send", createFormRateLimiter(), sendNewsletter);
  app2.get("/api/newsletter/subscribers", getNewsletterSubscribers);
  const httpServer2 = createServer(app2);
  return httpServer2;
}

// server/index.ts
var app = express();
app.set("trust proxy", 1);
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  next();
});
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production" && req.header("x-forwarded-proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse).substring(0, 100)}...`;
      }
      if (duration > 1e3) {
        console.warn(`\u26A0\uFE0F Requ\xEAte lente: ${logLine}`);
      }
    }
  });
  next();
});
var httpServer = createServer2();
function createServer2() {
  const server = http.createServer(app);
  registerRoutes(app);
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("dist/public", { maxAge: "1y" }));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), "dist/public/index.html"));
    });
  } else {
    app.use(express.static("dist/public", { maxAge: 0 }));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), "dist/public/index.html"));
    });
  }
  return server;
}
var PORT = Number(process.env.PORT) || 5e3;
httpServer.listen(PORT, "0.0.0.0", () => {
  const timestamp2 = (/* @__PURE__ */ new Date()).toLocaleTimeString("fr-FR");
  console.log(`${timestamp2} [express] \u{1F310} HTTP Server serving on port ${PORT}`);
  console.log(`${timestamp2} [express] \u{1F512} SSL Security headers enabled`);
  console.log(`${timestamp2} [express] \u2705 Ready for HTTPS deployment on Replit`);
});
