import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const createClient = (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  return { supabase, response: supabaseResponse };
};

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    // Public routes accessible without login
    const publicRoutes = [
      '/auth/login',
      '/auth/register',
      '/auth/reset-password',
    ];

    const isPublicRoute = publicRoutes.some(
      (route) => path === route || path.startsWith(`${route}/`)
    );

    // If user is NOT authenticated and tries to access protected route, redirect to login
    if (authError || !user) {
      if (!isPublicRoute) {
        const redirectUrl = new URL('/auth/login', request.url);
        redirectUrl.searchParams.set('redirectTo', path); // for post-login redirect
        return NextResponse.redirect(redirectUrl);
      }
      return response; // allow access to public routes
    }

    // If user IS authenticated and tries to access any auth page, redirect to /main or protected page
    if (user && isPublicRoute) {
      return NextResponse.redirect(new URL('/main', request.url));
    }

    // Authenticated user accessing protected routes - continue
    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/admission',
    '/admission/:path*',
    '/contact',
    '/contact/:path*',
    '/faq',
    '/faq/:path*',
    '/logout',
    '/logout/:path*',
    '/main',
    '/main/:path*',
  ],
};
