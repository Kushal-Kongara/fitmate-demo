'use client';
import { useEffect, useState } from 'react';
import { sb } from '@/lib/supabase';

export default function MealPage() {
  const [text, setText] = useState('');
  const [ai, setAi] = useState('');
  const [uid, setUid] = useState<string>('');

  useEffect(() => {
    sb.auth.getUser().then(r => setUid(r.data.user?.id ?? ''));
  }, []);

  async function submit() {
    if (!uid) { alert('Login first at /auth'); return; }
    const res = await fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: uid, text_entry: text })
    });
    const data = await res.json();
    if (data.error) { alert(data.error); return; }
    setAi(data.feedback?.ai_draft || '');
  }

  return (
    <main style={{ padding: 20 }}>
      <h3>Log Meal</h3>
      <textarea
        rows={4}
        cols={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g., Chicken bowl with quinoa, veggies, olive oil"
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={submit}>Save & Get AI Draft</button>
      </div>
      {ai && (
        <section style={{ marginTop: 12 }}>
          <h4>AI Draft</h4>
          <p>{ai}</p>
        </section>
      )}
    </main>
  );
}
