import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://dcjkljwutyfucnhtplhw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjamtsand1dHlmdWNuaHRwbGh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTMwNTM4OCwiZXhwIjoyMDg2ODgxMzg4fQ.3MH1xG9_RzPfyFtSKWl3bsaPo8nO2P_-BZvYJ5ShB6E"
);

// Corrected mapping: name → correct email (fixed the shuffled rows)
// Phone numbers are kept as-is from the Excel row (associated with the name)
const updates = [
  { id: "miyael",   email: "mielabr@chamama.org",    phone: "0543666959" },
  { id: "tzvi",     email: "tzvidls@chamama.org",     phone: "0539611939" },
  { id: "moriah",   email: "moriah.ami@chamama.org",  phone: "0534403764" },
  { id: "emma",     email: "emabrn@chamama.org",      phone: "0522248849" },    // Fixed: was noga.ari
  { id: "yaara",    email: "yaara.gob@chamama.org",   phone: "0503303057" },    // Fixed: was emabrn
  { id: "idan",     email: "idangnz@chamama.org",     phone: "0526000468" },    // Fixed: was yaara.gob
  { id: "aviv",     email: "avivgrt@chamama.org",     phone: "0526899177" },    // Fixed: was idangnz
  { id: "finn",     email: "finn.gat@chamama.org",    phone: "0512812821" },    // Fixed: was avivgrt
  { id: "bar",      email: "barwis@chamama.org",      phone: "0525292126" },    // Fixed: was finn.gat
  { id: "noga",     email: "noga.ari@chamama.org",    phone: "0584920118" },    // Fixed: was barwis
  { id: "naama",    email: "naama.zhv@chamama.org",   phone: "0547747160" },
  { id: "noya",     email: "noyachn@chamama.org",     phone: "0528404880" },
  { id: "yishai",   email: "ishaytrg@chamama.org",    phone: "0507663319" },
  { id: "yoav",     email: "yoav.yat@chamama.org",    phone: "0503777643" },
  { id: "toby",     email: "tovicnz@chamama.org",     phone: "0559366276" },
  { id: "eden",     email: "eden.lav@chamama.org",    phone: "0512277320" },
  { id: "hillel",   email: "hillel.lei@chamama.org",  phone: "0535221080" },    // Fixed: was binyaminlbs
  { id: "binyamin", email: "binyaminlbs@chamama.org", phone: "0545660543" },    // Fixed: was refael.lbs
  { id: "rafael",   email: "refael.lbs@chamama.org",  phone: "0547475816" },    // Fixed: was hillel.lei
  { id: "maya",     email: "mayalmp@chamama.org",     phone: "0542801128" },
  { id: "alon",     email: "alon.men@chamama.org",    phone: "0548001607" },
  { id: "natali",   email: "natalieffr@chamama.org",  phone: "0535235301" },
  { id: "ido",      email: "ido.pri@chamama.org",     phone: "0543628881" },
  { id: "shiri",    email: "shiri.rei@chamama.org",   phone: "0559235010" },
  { id: "oren",     email: "oransmr@chamama.org",     phone: "0559919004" },
];

// New students not yet in the DB
const newStudents = [
  { id: "yaheli",  name: "יהלי",  email: "yalimno@chamama.org",  phone: "0509000087" },
  { id: "yuval",   name: "יובל",  email: "yuval.mas@chamama.org", phone: "0532307776" },
];

async function main() {
  console.log("=== Updating existing students ===\n");

  let successCount = 0;
  let errorCount = 0;

  for (const { id, email, phone } of updates) {
    const { data, error } = await supabase
      .from("students")
      .update({ email, phone })
      .eq("id", id)
      .select("id, name, email, phone");

    if (error) {
      console.error(`❌ ${id}: ${error.message}`);
      errorCount++;
    } else if (data && data.length > 0) {
      console.log(`✅ ${id} → ${email} | ${phone}`);
      successCount++;
    } else {
      console.warn(`⚠️  ${id}: no row matched`);
      errorCount++;
    }
  }

  console.log(`\n=== Creating new students ===\n`);

  for (const student of newStudents) {
    const { data, error } = await supabase
      .from("students")
      .insert({
        id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        short_description: "",
        long_description: "",
        image: "",
        categories: [],
        services: {},
        social_links: {},
      })
      .select("id, name, email, phone");

    if (error) {
      console.error(`❌ NEW ${student.id}: ${error.message}`);
      errorCount++;
    } else {
      console.log(`✅ NEW ${student.id} (${student.name}) → ${student.email} | ${student.phone}`);
      successCount++;
    }
  }

  console.log(`\n=== Summary: ${successCount} success, ${errorCount} errors ===`);

  // Verify final state
  console.log("\n=== Final state ===\n");
  const { data: allStudents } = await supabase
    .from("students")
    .select("id, name, email, phone")
    .order("name");

  if (allStudents) {
    for (const s of allStudents) {
      console.log(`${s.id.padEnd(12)} | ${s.name.padEnd(10)} | ${s.email.padEnd(30)} | ${s.phone}`);
    }
  }
}

main().catch(console.error);
