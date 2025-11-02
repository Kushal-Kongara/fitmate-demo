'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { sb } from '@/lib/supabase';

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const next = params.get('next') || '/dashboard';

  // If already logged in, go straight to next
  useEffect(() => {
    let mounted = true;
    console.log('[AuthPage] Checking for existing session...');
    console.log('[AuthPage] Current URL:', window.location.href);
    console.log('[AuthPage] Next redirect:', next);
    
    sb.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      console.log('[AuthPage] Existing session:', data.session ? 'EXISTS' : 'NULL');
      if (data.session) {
        console.log('[AuthPage] ✅ Already logged in, redirecting to:', next);
        router.replace(next);
      }
    });
    
    // Also listen for state changes in case Supabase sets session after redirect
    const { data: sub } = sb.auth.onAuthStateChange((event, session) => {
      console.log('[AuthPage] Auth state change:', event, session ? 'Session exists' : 'No session');
      if (session && event === 'SIGNED_IN') {
        console.log('[AuthPage] ✅ SIGNED_IN event! Redirecting to:', next);
        router.replace(next);
      }
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, [router, next]);

  async function sendLink() {
    if (!email || !email.includes('@')) {
      setMsg('Please enter a valid email address');
      return;
    }

    setSending(true);
    setMsg('');
    
    const redirectTo = typeof window !== 'undefined' 
      ? `${window.location.origin}${next}` 
      : undefined;
    
    console.log('[AuthPage] Sending magic link...');
    console.log('[AuthPage] Email:', email);
    console.log('[AuthPage] Redirect URL:', redirectTo);
    
    try {
      const { error } = await sb.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });
      
      console.log('[AuthPage] Magic link response:', error ? `ERROR: ${error.message}` : 'SUCCESS');
      setMsg(error ? error.message : '✅ Check your email for the magic link!');
    } catch (error) {
      setMsg('Failed to send magic link. Please try again.');
    } finally {
      setSending(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendLink();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr',
      background: 'var(--bg-light)'
    }}>
      <style jsx>{`
        @media (min-width: 1024px) {
          .auth-container {
            grid-template-columns: 1fr 1fr !important;
          }
          .visual-side {
            display: flex !important;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .feature-badge {
          animation: fadeIn 0.6s ease-out;
        }
        
        .feature-badge:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .feature-badge:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>

      <div className="auth-container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        minHeight: '100vh'
      }}>
        {/* Left Side - Form */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(32px, 5vw, 80px)',
          background: 'white',
          position: 'relative'
        }}>
          {/* Back Button */}
          <a 
            href="/" 
            style={{
              position: 'absolute',
              top: '32px',
              left: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-gray)',
              fontSize: '0.95rem',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--brand-orange)';
              e.currentTarget.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-gray)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Home
          </a>

          <div style={{ maxWidth: '440px', margin: '0 auto', width: '100%' }}>
            {/* Logo/Brand */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <img 
                  src="https://lqbbcvwvuifhuxcgbvpt.supabase.co/storage/v1/object/public/fitmate-storage/Marketing_site/new-site-images/Fitmate-logo-nav.svg"
                  alt="Fitmate Coach"
                  style={{
                    height: '40px',
                    width: 'auto'
                  }}
                />
              </div>
            </div>

            {/* Welcome Text */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
                fontWeight: '800',
                marginBottom: '12px',
                color: 'var(--text-dark)',
                letterSpacing: '-0.02em'
              }}>
                Welcome Back
              </h2>
              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-gray)',
                lineHeight: '1.6',
                margin: 0
              }}>
                Sign in to access your AI-powered coaching dashboard and continue your journey to better health.
              </p>
            </div>

            {/* Form */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                fontSize: '0.95rem',
                color: 'var(--text-dark)'
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                style={{
                  width: '100%',
                  fontSize: '1rem',
                  padding: '14px 16px',
                  border: '2px solid var(--border-light)',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  background: 'var(--bg-light)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand-orange)';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(232, 93, 51, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.background = 'var(--bg-light)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                We'll send you a secure magic link
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={sendLink}
              disabled={sending}
              className="btn"
              style={{
                width: '100%',
                fontSize: '1.05rem',
                padding: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {sending ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}>
                    <line x1="12" y1="2" x2="12" y2="6"/>
                    <line x1="12" y1="18" x2="12" y2="22"/>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                    <line x1="2" y1="12" x2="6" y2="12"/>
                    <line x1="18" y1="12" x2="22" y2="12"/>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                  </svg>
                  Sending Magic Link...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Send Magic Link
                </>
              )}
            </button>

            {/* Message */}
            {msg && (
              <div style={{
                marginTop: '20px',
                padding: '16px 20px',
                background: msg.includes('✅') ? 'linear-gradient(135deg, #f0fff4 0%, #e6f9ed 100%)' : 'linear-gradient(135deg, #fee 0%, #fdd 100%)',
                border: `2px solid ${msg.includes('✅') ? 'var(--success-green)' : '#fcc'}`,
                borderRadius: '12px',
                color: msg.includes('✅') ? 'var(--success-green)' : '#c33',
                fontSize: '0.95rem',
                fontWeight: '500',
                textAlign: 'center',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                {msg}
              </div>
            )}

            {/* Divider */}
            <div style={{
              marginTop: '40px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border-light)'
            }}>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                Don't have an account?{' '}
                <span style={{ 
                  color: 'var(--brand-orange)', 
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Just enter your email above
                </span>
                {' '}— we'll create one for you automatically!
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="visual-side" style={{
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #ff7655 0%, #e85d33 50%, #d44d23 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* High-end background image with overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            mixBlendMode: 'overlay'
          }} />
          
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Main Content with Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              marginBottom: '32px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 3vw, 2.8rem)',
              fontWeight: '900',
              color: 'white',
              marginBottom: '24px',
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            }}>
              Transform Your Health Journey with AI
            </h2>

            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: '1.7',
              marginBottom: '48px',
              maxWidth: '500px'
            }}>
              Join thousands of members achieving their goals with personalized coaching powered by artificial intelligence.
            </p>

            {/* Feature Badges */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div className="feature-badge" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>
                <div>
                  <div style={{
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    marginBottom: '4px'
                  }}>
                    AI-Powered Analysis
                  </div>
                  <div style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.9rem'
                  }}>
                    Instant feedback on every meal
                  </div>
                </div>
              </div>

              <div className="feature-badge" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <div style={{
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    marginBottom: '4px'
                  }}>
                    Real Human Coaches
                  </div>
                  <div style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.9rem'
                  }}>
                    Personalized support when you need it
                  </div>
                </div>
              </div>

              <div className="feature-badge" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <div>
                  <div style={{
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    marginBottom: '4px'
                  }}>
                    Track Your Progress
                  </div>
                  <div style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.9rem'
                  }}>
                    Weekly insights and pattern analysis
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              marginTop: '56px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '8px'
                }}>90%</div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: '500'
                }}>Success Rate</div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '8px'
                }}>10x</div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: '500'
                }}>Faster Results</div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '8px'
                }}>24/7</div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: '500'
                }}>AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
