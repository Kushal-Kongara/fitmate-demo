'use client';
import { useEffect, useState } from 'react';
import { sb } from '@/lib/supabase';

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic';

export default function Patterns() {
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const [pattern, setPattern] = useState<any>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    sb.auth.getUser().then(r => setUid(r.data.user?.id ?? ''));
  }, []);

  async function generate() {
    if (!uid) { 
      alert('Please login first at /auth'); 
      return; 
    }
    setLoading(true); 
    setErr('');
    setPattern(null);
    
    try {
      const res = await fetch(`/api/patterns?userId=${uid}`);
      const data = await res.json();
      if (data.error) {
        setErr(data.error);
      } else {
        setPattern(data.pattern);
      }
    } catch (error) {
      setErr('Failed to generate insights. Please try again.');
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
          background: 'linear-gradient(135deg, #e8f0ff 0%, #d4e3ff 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5b7fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
        </div>
        <h3 style={{ margin: 0 }}>Weekly Insights & Patterns</h3>
      </div>
      
      <p style={{ marginBottom: '32px', color: 'var(--text-gray)' }}>
        AI analyzes your recent meals to identify patterns, trends, and suggest personalized experiments 
        to optimize your nutrition journey.
      </p>

      <div style={{ marginBottom: '32px' }}>
        <button 
          className="btn" 
          onClick={generate} 
          disabled={loading}
          style={{ minWidth: '250px' }}
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
              Analyzing Your Patterns...
              <style jsx>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              Generate Insights from Recent Meals
            </>
          )}
        </button>
      </div>

      {err && (
        <div style={{ 
          padding: '20px',
          background: '#fee',
          border: '2px solid #fcc',
          borderRadius: '12px',
          color: '#c33',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <h4 style={{ margin: '0 0 4px 0' }}>Error</h4>
              <p style={{ margin: 0 }}>{err}</p>
            </div>
          </div>
        </div>
      )}

      {pattern && (
        <div>
          {/* Summary Section */}
          <div style={{ 
            marginBottom: '24px',
            padding: '28px',
            background: 'var(--bg-cream)',
            borderRadius: '12px',
            border: '2px solid var(--border-light)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '16px' 
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #e8f0ff 0%, #d4e3ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b7fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              <h4 style={{ margin: 0, fontSize: '1.3rem' }}>Pattern Summary</h4>
              <span className="status-badge success">AI Analyzed</span>
            </div>
            <p style={{ 
              color: 'var(--text-gray)',
              fontSize: '1.05rem',
              lineHeight: '1.8',
              marginBottom: 0,
              whiteSpace: 'pre-line'
            }}>
              {pattern.summary}
            </p>
          </div>

          {/* Experiment Suggestion */}
          <div style={{ 
            padding: '28px',
            background: 'linear-gradient(135deg, #fef9f5 0%, #fff5f0 100%)',
            borderRadius: '12px',
            border: '2px solid var(--brand-orange)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '16px' 
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(232, 93, 51, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 2v3"/>
                  <path d="M15 2v3"/>
                  <path d="M15 22H9a7 7 0 0 1-7-7v-2a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7v2a7 7 0 0 1-7 7Z"/>
                  <path d="M12 9v9"/>
                </svg>
              </div>
              <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--brand-orange)' }}>
                Suggested Experiment
              </h4>
            </div>
            <p style={{ 
              color: 'var(--text-dark)',
              fontSize: '1.05rem',
              lineHeight: '1.8',
              marginBottom: 0,
              whiteSpace: 'pre-line'
            }}>
              {pattern.experiment_suggestion}
            </p>
          </div>

          {/* Action Item */}
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
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              Next Steps
            </h4>
            <p style={{ lineHeight: '1.6', marginBottom: 0 }}>
              Discuss these insights with your coach during your next check-in. They can help 
              you implement the suggested experiment and track your progress over time.
            </p>
          </div>
        </div>
      )}

      {!pattern && !loading && !err && (
        <div style={{ 
          padding: '48px',
          textAlign: 'center',
          background: 'var(--bg-cream)',
          borderRadius: '12px',
          border: '1px dashed var(--border-light)'
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          <h4 style={{ marginBottom: '12px', color: 'var(--text-dark)' }}>
            Ready to Discover Your Patterns?
          </h4>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Our AI will analyze your recent meal logs to identify eating patterns, nutritional trends, 
            and suggest personalized experiments to help you reach your goals.
          </p>
          <div style={{ 
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>What you'll get:</h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-gray)',
              lineHeight: '2'
            }}>
              <li style={{ paddingLeft: '28px', position: 'relative' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 0, top: '4px' }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Pattern analysis across your recent meals
              </li>
              <li style={{ paddingLeft: '28px', position: 'relative' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 0, top: '4px' }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Nutritional trends and insights
              </li>
              <li style={{ paddingLeft: '28px', position: 'relative' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 0, top: '4px' }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Personalized experiment suggestions
              </li>
              <li style={{ paddingLeft: '28px', position: 'relative' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 0, top: '4px' }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Actionable recommendations
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
