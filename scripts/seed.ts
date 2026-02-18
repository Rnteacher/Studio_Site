/**
 * Seed script for Studio Durian database.
 * Reads the exported JSON and upserts into the new Supabase project.
 *
 * Usage:
 *   1. Set env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *   2. npx tsx scripts/seed.ts
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  db: {
    schema: "public",
  },
  global: {
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
  },
});

// Try to find the export file
const exportPath = resolve(
  process.argv[2] || "C:/Users/ronen/Downloads/studio-dorian-export.json"
);

console.log(`Reading export from: ${exportPath}`);
const raw = readFileSync(exportPath, "utf-8");
const data = JSON.parse(raw);

async function seed() {
  // 1. Upsert students
  const students = data.students as any[];
  console.log(`Seeding ${students.length} students...`);
  const { error: studentsErr } = await supabase
    .from("students")
    .upsert(students, { onConflict: "id" });
  if (studentsErr) {
    console.error("Error seeding students:", studentsErr.message);
  } else {
    console.log(`  ✓ ${students.length} students seeded`);
  }

  // 2. Upsert services
  const services = data.services as any[];
  console.log(`Seeding ${services.length} services...`);
  const { error: servicesErr } = await supabase
    .from("services")
    .upsert(services, { onConflict: "id" });
  if (servicesErr) {
    console.error("Error seeding services:", servicesErr.message);
  } else {
    console.log(`  ✓ ${services.length} services seeded`);
  }

  // 3. Upsert service_students links
  const links = data.service_students as any[];
  console.log(`Seeding ${links.length} service-student links...`);
  const { error: linksErr } = await supabase
    .from("service_students")
    .upsert(links, { onConflict: "id" });
  if (linksErr) {
    console.error("Error seeding links:", linksErr.message);
  } else {
    console.log(`  ✓ ${links.length} links seeded`);
  }

  console.log("\nDone!");
}

seed().catch(console.error);
