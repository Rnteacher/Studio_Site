import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

function redirectToPath(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh the auth session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isAdminLogin = request.nextUrl.pathname.startsWith("/admin/login");

    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && !isAdminLogin) {
      if (!user) {
        return redirectToPath(request, "/auth/login");
      }
    }

    // Protect /dashboard routes (require auth)
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (!user) {
        return redirectToPath(request, "/auth/login");
      }
    }

    return supabaseResponse;
  } catch (e) {
    // If middleware fails, allow the request to continue
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|lovable-uploads/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
