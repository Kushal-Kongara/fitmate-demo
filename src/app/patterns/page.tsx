'use client';
import { useEffect, useState } from 'react';
import { sb } from '@/lib/supabase';

export default function Patterns() {
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const [pattern, setPattern] = useState<any>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    sb.auth.getUser().then(r => setUid(r.data.user?.id ?? ''));
  }, []);

  async function generate() {
    if (!uid) { alert('Login first at /auth'); return; }
    setLoading(true); setErr('');
    const res = await fetch(`/api/patterns?userId=${uid}`);
    const data = await res.json();
    setLoading(false);
    if (data.error) setErr(data.error);
    else setPattern(data.pattern);
  }

  return (
    <main style={{ padding: 20 }}>
      <h3>Weekly Pattern</h3>
      <button onClick={generate} disabled={loading}>
        {loading ? 'Generating…' : 'Generate From Recent Meals'}
      </button>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      {pattern && (
        <section style={{ marginTop: 12 }}>
          <h4>Summary</h4>
          <p>{pattern.summary}</p>
          <h4>Experiment</h4>
          <p>{pattern.experiment_suggestion}</p>
        </section>
      )}
    </main>
  );
}
