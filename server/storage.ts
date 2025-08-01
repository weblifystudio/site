import { type Contact, type InsertContact, contacts } from "@shared/schema";
import { db } from "./db";
import { sql } from "drizzle-orm";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class DatabaseStorage implements IStorage {
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values({
        name: insertContact.name,
        email: insertContact.email,
        phone: insertContact.phone || null,
        budget: insertContact.budget || null,
        projectTypes: insertContact.projectTypes || null,
        message: insertContact.message,
        newsletter: insertContact.newsletter || false
      })
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db
      .select()
      .from(contacts)
      .orderBy(sql`${contacts.createdAt} DESC`);
  }
}

export const storage = new DatabaseStorage();
