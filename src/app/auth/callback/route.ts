import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Check if admin
        const { data: isAdmin } = await supabase.rpc("has_role", {
          _user_id: user.id,
          _role: "admin",
        });

        if (isAdmin) {
          return NextResponse.redirect(`${origin}/admin`);
        }

        // Try to get an admin client (service role, bypasses RLS).
        // Falls back to the regular anon-key client if the env var isn't set.
        let db: ReturnType<typeof import("@supabase/supabase-js").createClient> | Awaited<ReturnType<typeof createClient>>;
        try {
          const { createAdminClient } = await import("@/lib/supabase/admin");
          db = createAdminClient();
        } catch {
          // Service role key not available (e.g. not set in Vercel) — use regular client
          console.warn("SUPABASE_SERVICE_ROLE_KEY not set, falling back to anon client for callback");
          db = supabase;
        }

        // Verify the user's email exists in the students table
        const { data: student } = await db
          .from("students")
          .select("id, user_id")
          .eq("email", user.email ?? "")
          .single();

        if (!student) {
          // Email not registered — sign out and redirect with error
          await supabase.auth.signOut();
          return NextResponse.redirect(
            `${origin}/auth/login?error=not_registered`
          );
        }

        // Link student record to this auth user if not yet linked.
        // With admin client this always works.
        // With anon client this only works if user_id is already set to auth.uid().
        if (!student.user_id) {
          await db
            .from("students")
            .update({ user_id: user.id })
            .eq("id", student.id);
        }

        // Ensure a portfolio exists — check by student_id first, then by user_id
        const { data: existingPortfolio } = await db
          .from("portfolios")
          .select("id")
          .eq("student_id", student.id)
          .single();

        if (!existingPortfolio) {
          // Also check by user_id (edge case: portfolio exists but student_id mismatch)
          const { data: userPortfolio } = await db
            .from("portfolios")
            .select("id")
            .eq("user_id", user.id)
            .single();

          if (!userPortfolio) {
            // No portfolio at all — create one
            const slug = student.id.replace(/\s+/g, "-").toLowerCase();
            await db.from("portfolios").insert({
              student_id: student.id,
              user_id: user.id,
              slug,
              contact_email: user.email ?? "",
            });
          }
        }

        return NextResponse.redirect(`${origin}/dashboard`);
      }
    }
  }

  // Auth error - redirect to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
