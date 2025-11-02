'use client';
import { useEffect, useState } from 'react';
import { sb } from '@/lib/supabase';

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic';

export default function MealPage() {
  const [text, setText] = useState('');
  const [ai, setAi] = useState('');
  const [uid, setUid] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sb.auth.getUser().then(r => setUid(r.data.user?.id ?? ''));
  }, []);

  async function submit() {
    if (!uid) { 
      alert('Please login first at /auth'); 
      return; 
    }
    if (!text.trim()) {
      alert('Please enter your meal details');
      return;
    }
    
    setLoading(true);
    setAi('');
    
    try {
      const res = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: uid, text_entry: text })
      });
      const data = await res.json();
      if (data.error) { 
        alert(data.error); 
        return; 
      }
      setAi(data.feedback?.ai_draft || '');
    } catch (error) {
      alert('Failed to analyze meal. Please try again.');
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
          background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8e0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
            <line x1="6" y1="1" x2="6" y2="4"/>
            <line x1="10" y1="1" x2="10" y2="4"/>
            <line x1="14" y1="1" x2="14" y2="4"/>
          </svg>
        </div>
        <h3 style={{ margin: 0 }}>Log Your Meal</h3>
      </div>
      
      <p style={{ marginBottom: '24px', color: 'var(--text-gray)' }}>
        Describe what you ate and let our AI analyze it. Be as detailed as possible for better feedback.
      </p>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: '600',
          color: 'var(--text-dark)'
        }}>
          Meal Description
        </label>
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: Grilled chicken breast (6oz) with quinoa (1 cup), steamed broccoli, and drizzled with olive oil. Glass of water."
          style={{ 
            width: '100%',
            fontSize: '1rem'
          }}
        />
        <p style={{ 
          fontSize: '0.85rem', 
          color: 'var(--text-muted)', 
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Tip: Include portion sizes and cooking methods for more accurate analysis
        </p>
      </div>

      <button 
        className="btn" 
        onClick={submit}
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
            Analyzing...
            <style jsx>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            Get AI Feedback
          </>
        )}
      </button>

      {ai && (
        <div style={{ 
          marginTop: '32px',
          padding: '24px',
          background: 'var(--bg-cream)',
          borderRadius: '12px',
          border: '2px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #e6f7f1 0%, #d1f0e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h4 style={{ margin: 0, color: 'var(--text-dark)' }}>AI-Generated Feedback</h4>
            <span className="status-badge success">Draft Ready</span>
          </div>
          <p style={{ 
            lineHeight: '1.7',
            color: 'var(--text-gray)',
            fontSize: '1rem',
            whiteSpace: 'pre-line'
          }}>
            {ai}
          </p>
          <div style={{ 
            marginTop: '20px',
            padding: '16px',
            background: 'white',
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: 'var(--text-muted)'
          }}>
            ℹ️ This feedback has been sent to your coach for review and approval. 
            Visit the <a href="/coach" style={{ color: 'var(--brand-orange)', fontWeight: '600' }}>Coach Review</a> page to see the approval process.
          </div>
        </div>
      )}

      {!ai && !loading && (
        <div style={{ 
          marginTop: '32px',
          padding: '24px',
          background: 'var(--bg-cream)',
          borderRadius: '12px',
          border: '1px dashed var(--border-light)'
        }}>
          <h4 style={{ marginBottom: '12px' }}>✨ What happens next?</h4>
          <ol style={{ 
            paddingLeft: '20px',
            color: 'var(--text-gray)',
            lineHeight: '1.8'
          }}>
            <li>AI analyzes your meal using GPT-4</li>
            <li>Personalized feedback is generated instantly</li>
            <li>Your coach reviews and can edit the feedback</li>
            <li>Approved feedback is sent to you</li>
          </ol>
        </div>
      )}
    </div>
  );
}
