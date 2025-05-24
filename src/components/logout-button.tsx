'use client'; // Only for App Router

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const signOut = async () => {
      await supabase.auth.signOut();
      router.replace('/auth/login'); // Redirect to login page
    };

    signOut();
  }, [router]);

  return <p>Signing you out...</p>;
}
