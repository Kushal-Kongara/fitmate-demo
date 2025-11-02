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
  const [loadingData, setLoadingData] = useState(true);

  async function load() {
    setLoadingData(true);
    try {
      const r = await fetch('/api/coach/latest');
      const d = await r.json();
      setLatest(d?.meal_id ? d : null);
      setDraft(d?.ai_draft || '');
    } catch (error) {
      console.error('Failed to load:', error);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function send() {
    if (!latest?.meal_id) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/feedback/${latest.meal_id}/send`, { method: 'POST' });
      const d = await r.json();
      if (d?.sent) {
        alert('✅ Feedback approved and sent to member!');
        setLatest(null);
        setDraft('');
        load();
      } else {
        alert(d?.error || 'Failed to send');
      }
    } catch (error) {
      alert('Failed to send feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-section">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #e6f7f1 0%, #d1f0e5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h3 style={{ margin: 0 }}>Coach Review Dashboard</h3>
      </div>
      
      <p style={{ marginBottom: '32px', color: 'var(--text-gray)' }}>
        Review AI-generated feedback, make edits as needed, and approve to send to your members.
      </p>

      {loadingData ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '48px',
          color: 'var(--text-muted)' 
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--brand-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', animation: 'spin 1s linear infinite' }}>
            <line x1="12" y1="2" x2="12" y2="6"/>
            <line x1="12" y1="18" x2="12" y2="22"/>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
            <line x1="2" y1="12" x2="6" y2="12"/>
            <line x1="18" y1="12" x2="22" y2="12"/>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
          </svg>
          Loading pending feedback...
          <style jsx>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : !latest ? (
        <div style={{ 
          padding: '48px',
          textAlign: 'center',
          background: 'var(--bg-cream)',
          borderRadius: '12px',
          border: '1px dashed var(--border-light)'
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <h4 style={{ marginBottom: '12px', color: 'var(--text-dark)' }}>
            No Pending Feedback
          </h4>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            All caught up! No meal feedback awaiting your review.
          </p>
          <a href="/meal" className="btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
              <line x1="6" y1="1" x2="6" y2="4"/>
              <line x1="10" y1="1" x2="10" y2="4"/>
              <line x1="14" y1="1" x2="14" y2="4"/>
            </svg>
            Log a Meal to Test
          </a>
        </div>
      ) : (
        <>
          {/* Member's Meal */}
          <div style={{ 
            marginBottom: '24px',
            padding: '24px',
            background: 'var(--bg-cream)',
            borderRadius: '12px',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '12px' 
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8e0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
              <h4 style={{ margin: 0 }}>Member's Meal Entry</h4>
              {latest.meals?.created_at && (
                <span className="status-badge">
                  {new Date(latest.meals.created_at).toLocaleDateString()}
                </span>
              )}
            </div>
            <p style={{ 
              color: 'var(--text-gray)',
              fontSize: '1rem',
              lineHeight: '1.7',
              marginBottom: 0
            }}>
              {latest.meals?.text_entry}
            </p>
          </div>

          {/* AI Draft Feedback - Editable */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
              fontWeight: '600',
              color: 'var(--text-dark)',
              fontSize: '1.1rem'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #e6f7f1 0%, #d1f0e5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              AI-Generated Feedback (Editable)
            </label>
            <textarea
              rows={8}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              style={{ 
                width: '100%',
                fontSize: '1rem',
                lineHeight: '1.7'
              }}
              placeholder="Edit the AI-generated feedback before sending..."
            />
            <p style={{ 
              fontSize: '0.85rem', 
              color: 'var(--text-muted)', 
              marginTop: '8px' 
            }}>
              💡 Feel free to personalize or adjust the AI's suggestions before approving
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            alignItems: 'center',
            padding: '24px',
            background: 'var(--bg-cream)',
            borderRadius: '12px',
            border: '1px solid var(--border-light)'
          }}>
            <button 
              className="btn" 
              onClick={send} 
              disabled={loading}
              style={{ minWidth: '200px' }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}>
                    <line x1="12" y1="2" x2="12" y2="6"/>
                    <line x1="12" y1="18" x2="12" y2="22"/>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                    <line x1="2" y1="12" x2="6" y2="12"/>
                    <line x1="18" y1="12" x2="22" y2="12"/>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                  </svg>
                  Sending...
                  <style jsx>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Approve & Send to Member
                </>
              )}
            </button>
            <button 
              className="btn secondary" 
              onClick={() => setDraft(latest.ai_draft)}
              disabled={loading}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
              Reset to AI Draft
            </button>
          </div>

          {/* Info Box */}
          <div style={{ 
            marginTop: '24px',
            padding: '20px',
            background: 'white',
            borderRadius: '12px',
            border: '1px solid var(--border-light)',
            fontSize: '0.9rem',
            color: 'var(--text-gray)'
          }}>
            <h4 style={{ marginBottom: '12px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Human-in-the-Loop Coaching
            </h4>
            <p style={{ lineHeight: '1.6', marginBottom: 0 }}>
              AI generates the initial feedback instantly, but you have full control to review, 
              edit, and personalize before it reaches your member. This ensures quality while 
              dramatically reducing your time spent on routine feedback.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
