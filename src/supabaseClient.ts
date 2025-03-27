import { createClient } from "@supabase/supabase-js";
import {} from "@supabase/supabase-js";
import { useContext } from "react";
import { AuthContext } from "./Auth";

const PROJECT_URL = import.meta.env.VITE_PROJECT_URL;
const ANON_KEY = import.meta.env.VITE_ANON_KEY;

if (!PROJECT_URL || !ANON_KEY) {
  throw new Error("Missing environment variables!");
}

const supabase = createClient(PROJECT_URL, ANON_KEY);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { supabase, useAuth };
