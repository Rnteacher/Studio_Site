import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [studentsRes, servicesRes, serviceStudentsRes] = await Promise.all([
    supabase.from("students").select("*"),
    supabase.from("services").select("*"),
    supabase.from("service_students").select("*"),
  ]);

  const exportData = {
    exported_at: new Date().toISOString(),
    students: studentsRes.data || [],
    services: servicesRes.data || [],
    service_students: serviceStudentsRes.data || [],
  };

  return new Response(JSON.stringify(exportData, null, 2), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="studio-dorian-export.json"',
    },
  });
});
