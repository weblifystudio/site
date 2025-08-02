import { type Contact, contacts } from "@shared/schema";
import { db } from "./db";
import { sql } from "drizzle-orm";

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
}

export class DatabaseStorage implements IStorage {
  async createContact(insertContact: ContactInsert): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }


}

export const storage = new DatabaseStorage();
