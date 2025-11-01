'use client';
import { useEffect, useState } from 'react';

type Latest = {
  id: string;
  meal_id: string;
  ai_draft: string;
  meals?: { text_entry?: string; created_at?: string };
  sent_at?: string | null;
};

export default function CoachPage() {
  const [latest, setLatest] = useState<Latest | null>(null);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    const r = await fetch('/api/coach/latest');
    const d = await r.json();
    setLatest(d?.meal_id ? d : null);
    setDraft(d?.ai_draft || '');
  }

  useEffect(() => { load(); }, []);

  async function send() {
    if (!latest?.meal_id) return;
    setLoading(true);
    const r = await fetch(`/api/feedback/${latest.meal_id}/send`, { method: 'POST' });
    const d = await r.json();
    setLoading(false);
    if (d?.sent) {
      alert('Sent to member (demo) ✅');
      setLatest(null);
      setDraft('');
      load();
    } else {
      alert(d?.error || 'Failed to send');
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h3>Coach Review</h3>
      {!latest && <p>No pending drafts. Create one from <a href="/meal">Meal</a>.</p>}

      {latest && (
        <div style={{ marginTop: 8 }}>
          <p><b>Meal:</b> {latest.meals?.text_entry}</p>
          <p><b>Draft:</b></p>
          <textarea
            rows={6}
            cols={70}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div style={{ marginTop: 8 }}>
            <button onClick={send} disabled={loading}>
              {loading ? 'Sending...' : 'Approve & Send'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
