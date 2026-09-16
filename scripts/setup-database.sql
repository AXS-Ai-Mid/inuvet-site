-- Inuvet: estrutura inicial do PostgreSQL
-- Compatível com Neon, Supabase, Railway e PostgreSQL convencional.

CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  owner_name VARCHAR(255) NOT NULL,
  owner_phone VARCHAR(50) NOT NULL,
  owner_email VARCHAR(255),
  pet_name VARCHAR(255) NOT NULL,
  pet_species VARCHAR(50) NOT NULL,
  pet_breed VARCHAR(100),
  pet_age VARCHAR(50),
  service_requested VARCHAR(150) NOT NULL,
  urgency_level VARCHAR(50) DEFAULT 'Rotina',
  preferred_date VARCHAR(50),
  preferred_time_slot VARCHAR(50),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'Pendente',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS triage_submissions (
  id SERIAL PRIMARY KEY,
  pet_name VARCHAR(255) NOT NULL,
  pet_species VARCHAR(50) NOT NULL,
  symptoms_selected TEXT NOT NULL,
  urgency_score VARCHAR(50) NOT NULL,
  owner_phone VARCHAR(50),
  recommendation TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Novo',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS vaccine_calculator_leads (
  id SERIAL PRIMARY KEY,
  owner_name VARCHAR(255),
  owner_phone VARCHAR(50) NOT NULL,
  pet_name VARCHAR(255) NOT NULL,
  pet_species VARCHAR(50) NOT NULL,
  pet_age_months INTEGER,
  scheduled_vaccines TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS appointments_status_idx
  ON appointments (status);
CREATE INDEX IF NOT EXISTS appointments_created_at_idx
  ON appointments (created_at DESC);
CREATE INDEX IF NOT EXISTS triage_created_at_idx
  ON triage_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_created_at_idx
  ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS vaccine_leads_created_at_idx
  ON vaccine_calculator_leads (created_at DESC);
