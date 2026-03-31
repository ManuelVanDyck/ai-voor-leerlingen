CREATE TABLE IF NOT EXISTS opdracht_voortgang (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  module_slug TEXT NOT NULL,
  les_slug TEXT NOT NULL,
  opdracht_type TEXT NOT NULL CHECK (opdracht_type IN (tekst, quiz)),
  antwoorden JSONB DEFAULT '{}',
  score NUMERIC,
  feedback JSONB DEFAULT '{}',
  status TEXT DEFAULT ingediend CHECK (status IN (ingediend, gecorrigeerd)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_email, module_slug, les_slug, opdracht_type)
);