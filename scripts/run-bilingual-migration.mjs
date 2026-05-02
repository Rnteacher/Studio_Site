import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://dcjkljwutyfucnhtplhw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjamtsand1dHlmdWNuaHRwbGh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTMwNTM4OCwiZXhwIjoyMDg2ODgxMzg4fQ.3MH1xG9_RzPfyFtSKWl3bsaPo8nO2P_-BZvYJ5ShB6E"
);

// Test: check if columns already exist by trying a select
const { data, error } = await supabase
  .from("portfolios")
  .select("about_title_en")
  .limit(1);

if (!error) {
  console.log("Column about_title_en already exists. Migration may have already been applied.");
} else {
  console.log("Column missing, need to run migration:", error.message);
}

// We'll use the SQL editor API via fetch
const projectRef = "dcjkljwutyfucnhtplhw";
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjamtsand1dHlmdWNuaHRwbGh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTMwNTM4OCwiZXhwIjoyMDg2ODgxMzg4fQ.3MH1xG9_RzPfyFtSKWl3bsaPo8nO2P_-BZvYJ5ShB6E";

const statements = [
  "ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS about_title_en TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS about_body_en TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS about_subtitle_en TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE students ADD COLUMN IF NOT EXISTS name_en TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE projects ADD COLUMN IF NOT EXISTS title_en TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE projects ADD COLUMN IF NOT EXISTS description_en TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags_en TEXT[] DEFAULT '{}'",
  "ALTER TABLE cv_sections ADD COLUMN IF NOT EXISTS title_en TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE cv_sections ADD COLUMN IF NOT EXISTS entries_en JSONB DEFAULT '[]'",
];

for (const sql of statements) {
  const res = await fetch(
    `https://${projectRef}.supabase.co/rest/v1/rpc/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({ query: sql }),
    }
  );
  // The REST API doesn't support raw SQL, so let's try the management API
}

// Alternative: use pg directly via the Supabase connection string
// Let's verify by trying to select the new columns
const { data: d2, error: e2 } = await supabase
  .from("portfolios")
  .select("about_title_en")
  .limit(1);

if (!e2) {
  console.log("✅ Migration successful - about_title_en exists");
} else {
  console.log("❌ Migration needed. Please run this SQL in the Supabase dashboard SQL editor:");
  console.log(statements.join(";\n") + ";");
}
