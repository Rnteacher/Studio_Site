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

        // Student flow: ensure portfolio exists
        const { data: existingPortfolio } = await supabase
          .from("portfolios")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (!existingPortfolio) {
          // Try to find a matching student record by email
          const { data: student } = await supabase
            .from("students")
            .select("id")
            .eq("email", user.email ?? "")
            .is("user_id", null)
            .single();

          if (student) {
            // Link the student record to this auth user
            await supabase
              .from("students")
              .update({ user_id: user.id })
              .eq("id", student.id);

            // Create a portfolio for this student
            const slug = student.id.replace(/\s+/g, "-").toLowerCase();
            await supabase.from("portfolios").insert({
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
