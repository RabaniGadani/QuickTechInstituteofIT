
import { createServerClient, type CookieOptions } from "@supabase/ssr";
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
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    // Define protected routes
    const protectedRoutes = [
      '/main/courses',
      '/main/admission',
      '/main/contact',
      '/main/faq',
      'auth/logout',
      '/main,
      
      
    ];

    const isProtectedRoute = protectedRoutes.some(route => path === route || path.startsWith(`${route}/`));

    // Public routes anyone can access
    const publicRoutes = [ '/','auth/login', 'auth/register', '/auth/reset-password'];
    const isPublicRoute = publicRoutes.some(route => path === route || path.startsWith(`${route}/`));

    if ((authError || !user) && isProtectedRoute) {
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('redirectTo', path);
      return NextResponse.redirect(redirectUrl);
    }

    if (user && path.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/protected', request.url));
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};
