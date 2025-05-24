'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/auth/logout'); // Triggers API route to sign out
    router.replace('/auth/login'); // Ensure full navigation
  };

  return <button onClick={handleLogout}>Logout</button>;
}
