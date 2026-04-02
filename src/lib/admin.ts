// Admin whitelist — alleen deze emails hebben toegang tot /admin/*
export const ADMIN_EMAILS = [
  'nathalie.vandenbossche@classroomatheneum.be',
  'tom.boerhave@classroomatheneum.be',
  'mdm@classroomatheneum.be',
] as const;

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return (ADMIN_EMAILS as readonly string[]).includes(email.toLowerCase());
}
