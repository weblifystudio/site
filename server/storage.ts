import { type Contact, type InsertContact, contacts } from "@shared/schema";
import { db } from "./db";
import { sql } from "drizzle-orm";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
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


}

export const storage = new DatabaseStorage();
