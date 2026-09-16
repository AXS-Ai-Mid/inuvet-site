import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  ownerName: varchar("owner_name", { length: 255 }).notNull(),
  ownerPhone: varchar("owner_phone", { length: 50 }).notNull(),
  ownerEmail: varchar("owner_email", { length: 255 }),
  petName: varchar("pet_name", { length: 255 }).notNull(),
  petSpecies: varchar("pet_species", { length: 50 }).notNull(), // 'Cão', 'Gato', 'Outro'
  petBreed: varchar("pet_breed", { length: 100 }),
  petAge: varchar("pet_age", { length: 50 }),
  serviceRequested: varchar("service_requested", { length: 150 }).notNull(),
  urgencyLevel: varchar("urgency_level", { length: 50 }).default("Rotina"), // 'Rotina', 'Urgente', 'Emergência'
  preferredDate: varchar("preferred_date", { length: 50 }),
  preferredTimeSlot: varchar("preferred_time_slot", { length: 50 }),
  notes: text("notes"),
  status: varchar("status", { length: 50 }).default("Pendente"), // 'Pendente', 'Confirmado', 'Atendido', 'Cancelado'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const triageSubmissions = pgTable("triage_submissions", {
  id: serial("id").primaryKey(),
  petName: varchar("pet_name", { length: 255 }).notNull(),
  petSpecies: varchar("pet_species", { length: 50 }).notNull(),
  symptomsSelected: text("symptoms_selected").notNull(),
  urgencyScore: varchar("urgency_score", { length: 50 }).notNull(), // 'Emergência Imediata', 'Urgência', 'Acompanhamento/Rotina'
  ownerPhone: varchar("owner_phone", { length: 50 }),
  recommendation: text("recommendation").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("Novo"), // 'Novo', 'Respondido', 'Arquivado'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const vaccineCalculatorLeads = pgTable("vaccine_calculator_leads", {
  id: serial("id").primaryKey(),
  ownerName: varchar("owner_name", { length: 255 }),
  ownerPhone: varchar("owner_phone", { length: 50 }).notNull(),
  petName: varchar("pet_name", { length: 255 }).notNull(),
  petSpecies: varchar("pet_species", { length: 50 }).notNull(),
  petAgeMonths: integer("pet_age_months"),
  scheduledVaccines: text("scheduled_vaccines"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
export type TriageSubmission = typeof triageSubmissions.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type VaccineLead = typeof vaccineCalculatorLeads.$inferSelect;
