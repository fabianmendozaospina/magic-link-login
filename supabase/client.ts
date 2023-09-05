import { createClient } from "@supabase/supabase-js";
import config from "./config.json" assert { type: "json" };

const { SUPABASE_URL, SUPABASE_ANON_KEY } = config;

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);
