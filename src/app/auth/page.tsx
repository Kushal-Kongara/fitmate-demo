'use client';
import { useState } from 'react';
import { sb } from '@/lib/supabase';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  async function sendLink() {
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined }
    });
    setMsg(error ? error.message : 'Check your email for the magic link.');
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Login</h1>
      <input
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8, width: 320 }}
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={sendLink}>Send Magic Link</button>
      </div>
      <p>{msg}</p>
      <a href="/">Back Home</a>
    </main>
  );
}
