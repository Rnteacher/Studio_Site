import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

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

        // Use admin client (bypasses RLS) for student linking & portfolio creation.
        // The normal anon-key client cannot update a student record whose
        // user_id is still NULL because RLS policy requires user_id = auth.uid().
        const admin = createAdminClient();

        // Verify the user's email exists in the students table
        const { data: student } = await admin
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

        // Link student record to this auth user if not yet linked
        if (!student.user_id) {
          await admin
            .from("students")
            .update({ user_id: user.id })
            .eq("id", student.id);
        }

        // Ensure a portfolio exists for this student
        const { data: existingPortfolio } = await admin
          .from("portfolios")
          .select("id")
          .eq("student_id", student.id)
          .single();

        if (!existingPortfolio) {
          // No portfolio yet — create one
          const slug = student.id.replace(/\s+/g, "-").toLowerCase();
          await admin.from("portfolios").insert({
            student_id: student.id,
            user_id: user.id,
            slug,
            contact_email: user.email ?? "",
          });
        }

        return NextResponse.redirect(`${origin}/dashboard`);
      }
    }
  }

  // Auth error - redirect to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
