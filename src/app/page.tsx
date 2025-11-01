'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sb } from '@/lib/supabase';

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    sb.auth.getUser().then((r) => setEmail(r.data.user?.email ?? null));
  }, []);

  async function logout() {
    await sb.auth.signOut();
    setEmail(null);
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>FitMate Demo</h2>
      <nav style={{ display: 'flex', gap: 12, margin: '12px 0' }}>
        <Link href="/auth">Login</Link>
        <Link href="/meal">Meal</Link>
        <Link href="/coach">Coach</Link>
        <Link href="/patterns">Patterns</Link>
        <Link href="/voice">Voice</Link>
      </nav>
      <p>{email ? `Logged in as ${email}` : 'Not logged in'}</p>
      {email && <button onClick={logout}>Logout</button>}
    </main>
  );
}