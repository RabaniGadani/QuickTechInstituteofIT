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

    // Public routes anyone can access without login
    const publicRoutes = [
      '/auth/login',
      '/auth/register',
      '/auth/reset-password',
    ];

    const isPublicRoute = publicRoutes.some(
      (route) => path === route || path.startsWith(`${route}/`)
    );

    // If user not authenticated and tries to access protected route, redirect to login
    if (authError || !user) {
      if (!isPublicRoute) {
        const redirectUrl = new URL('/auth/login', request.url);
        redirectUrl.searchParams.set('redirectTo', path); // so you can redirect back after login
        return NextResponse.redirect(redirectUrl);
      }
      // Allow access to public routes without login
      return response;
    }

    // If user is logged in and tries to access any auth page, redirect to /protected
    if (user && isPublicRoute) {
      return NextResponse.redirect(new URL('/protected', request.url));
    }

    // For logged-in user accessing protected routes, just continue
    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/main',
    '/main/:path*',
  ],
};
