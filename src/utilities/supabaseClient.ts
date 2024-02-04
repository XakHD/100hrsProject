import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://bprlhfkwzgwibsmgjfgr.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwcmxoZmt3emd3aWJzbWdqZmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTIwMjIsImV4cCI6MjAyMjQ2ODAyMn0.mjfiMtAoVV3fZsjAG7EpfvNCPgCKCdhJZWJ6SmfKST8";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
