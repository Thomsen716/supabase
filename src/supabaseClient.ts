import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = import.meta.env.VITE_PROJECT_URL;
const ANON_KEY = import.meta.env.VITE_ANON_KEY;

if (!PROJECT_URL || !ANON_KEY) {
  throw new Error("Missing environment variables!");
}

const supabase = createClient(PROJECT_URL, ANON_KEY);

function signUpSupabase(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}

function signInSupabase(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

function signOutSupabase() {
  return supabase.auth.signOut();
}

export { supabase, signUpSupabase, signInSupabase, signOutSupabase };
