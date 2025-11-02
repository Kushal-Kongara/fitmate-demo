'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sb } from '@/lib/supabase';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    sb.auth.getSession().then(r => setLoggedIn(!!r.data.session));
  }, []);

  return (
    <>
      {/* Hero Section with Background Image */}
      <section style={{ 
        position: 'relative',
        marginTop: '48px',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fef9f5 0%, #fff5f0 100%)',
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08
        }} />
        
        <div style={{ 
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 64px)',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'rgba(232, 93, 51, 0.1)',
            borderRadius: '30px',
            marginBottom: '32px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--brand-orange)',
            border: '1px solid rgba(232, 93, 51, 0.2)'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
            AI-Powered Nutrition Coaching Platform
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '24px',
            color: 'var(--text-dark)',
            letterSpacing: '-0.04em'
          }}>
            Scale Human Coaching<br />
            <span style={{ color: 'var(--brand-orange)' }}>with AI Assistance</span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            color: 'var(--text-gray)',
            marginBottom: '40px',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: '1.7'
          }}>
            Experience the future of nutrition coaching where AI empowers human coaches 
            to deliver personalized feedback at scale. Real coaches, AI efficiency, better outcomes.
          </p>

          <div style={{ 
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {!loggedIn ? (
              <>
                <Link className="btn" href="/auth?next=/dashboard" style={{
                  fontSize: '1.1rem',
                  padding: '18px 36px'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                  Get Started Free
                </Link>
                <a 
                  href="#features" 
                  className="btn secondary"
                  style={{
                    fontSize: '1.1rem',
                    padding: '18px 36px'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 16 16 12 12 8"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                  See How It Works
                </a>
              </>
            ) : (
              <Link className="btn accent" href="/dashboard" style={{
                fontSize: '1.1rem',
                padding: '18px 36px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Go to Dashboard
              </Link>
            )}
          </div>

          {/* Stats */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            marginTop: '64px',
            padding: '40px',
            background: 'white',
            borderRadius: '20px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem',
                fontWeight: '800',
                color: 'var(--brand-orange)',
                marginBottom: '8px'
              }}>90%</div>
              <div style={{ 
                fontSize: '1rem',
                color: 'var(--text-gray)',
                fontWeight: '500'
              }}>Members lose 6% weight</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem',
                fontWeight: '800',
                color: 'var(--brand-orange)',
                marginBottom: '8px'
              }}>10x</div>
              <div style={{ 
                fontSize: '1rem',
                color: 'var(--text-gray)',
                fontWeight: '500'
              }}>More efficient coaching</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem',
                fontWeight: '800',
                color: 'var(--brand-orange)',
                marginBottom: '8px'
              }}>24/7</div>
              <div style={{ 
                fontSize: '1rem',
                color: 'var(--text-gray)',
                fontWeight: '500'
              }}>AI-powered support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ 
        marginTop: '96px',
        marginBottom: '48px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '800',
            marginBottom: '16px',
            color: 'var(--text-dark)',
            letterSpacing: '-0.02em'
          }}>
            Complete AI-Assisted Coaching Platform
          </h2>
          <p style={{ 
            fontSize: '1.2rem',
            color: 'var(--text-gray)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Everything you need to scale personalized nutrition coaching
          </p>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {/* Feature 1 - Meal Logging */}
          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}
          >
            {/* Image */}
            <div style={{
              width: '100%',
              height: '200px',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8e0 100%)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
                alt="Meal Logging"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            <div style={{ 
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8e0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="1" x2="6" y2="4"/>
                <line x1="10" y1="1" x2="10" y2="4"/>
                <line x1="14" y1="1" x2="14" y2="4"/>
              </svg>
            </div>
            
            <h3 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '12px',
              color: 'var(--text-dark)'
            }}>Smart Meal Logging</h3>
            
            <p style={{ 
              color: 'var(--text-gray)', 
              lineHeight: '1.7',
              fontSize: '1.05rem',
              marginBottom: '20px'
            }}>
              Members log meals with simple text entries. AI instantly analyzes nutritional content 
              and generates personalized feedback drafts.
            </p>
            
            <div style={{ 
              display: 'flex',
              gap: '16px',
              fontSize: '0.9rem',
              color: 'var(--brand-orange)',
              fontWeight: '600'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Instant AI analysis
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                GPT-4 powered
              </span>
            </div>
          </div>

          {/* Feature 2 - Coach Dashboard */}
          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}
          >
            {/* Image */}
            <div style={{
              width: '100%',
              height: '200px',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #e6f7f1 0%, #d1f0e5 100%)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                alt="Coach Dashboard"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            <div style={{ 
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #e6f7f1 0%, #d1f0e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            
            <h3 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '12px',
              color: 'var(--text-dark)'
            }}>Coach Review Dashboard</h3>
            
            <p style={{ 
              color: 'var(--text-gray)', 
              lineHeight: '1.7',
              fontSize: '1.05rem',
              marginBottom: '20px'
            }}>
              Coaches review, edit, and approve AI-generated feedback before sending. 
              Human-in-the-loop ensures quality.
            </p>
            
            <div style={{ 
              display: 'flex',
              gap: '16px',
              fontSize: '0.9rem',
              color: 'var(--brand-green)',
              fontWeight: '600'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Full control
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                10x faster
              </span>
            </div>
          </div>

          {/* Feature 3 - Pattern Insights */}
          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}
          >
            {/* Image */}
            <div style={{
              width: '100%',
              height: '200px',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #e8f0ff 0%, #d4e3ff 100%)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
                alt="Analytics"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            <div style={{ 
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #e8f0ff 0%, #d4e3ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5b7fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            
            <h3 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '12px',
              color: 'var(--text-dark)'
            }}>Pattern Insights</h3>
            
            <p style={{ 
              color: 'var(--text-gray)', 
              lineHeight: '1.7',
              fontSize: '1.05rem',
              marginBottom: '20px'
            }}>
              AI analyzes eating patterns over time and suggests personalized experiments 
              to optimize results.
            </p>
            
            <div style={{ 
              display: 'flex',
              gap: '16px',
              fontSize: '0.9rem',
              color: '#5b7fff',
              fontWeight: '600'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Weekly analysis
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Smart suggestions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section style={{ 
        marginTop: '96px',
        marginBottom: '48px',
        textAlign: 'center',
        padding: 'clamp(48px, 8vw, 80px) clamp(32px, 5vw, 64px)',
        background: 'linear-gradient(135deg, var(--brand-orange) 0%, var(--brand-coral) 100%)',
        borderRadius: '24px',
        color: 'white',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Image Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          mixBlendMode: 'overlay'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '24px',
            color: 'white',
            letterSpacing: '-0.02em'
          }}>
            Ready to Experience AI-Assisted Coaching?
          </h2>
          <p style={{ 
            fontSize: '1.3rem',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            opacity: 0.95,
            lineHeight: '1.7'
          }}>
            Join the future of nutrition coaching. Start your demo today.
          </p>
          <Link 
            className="btn" 
            href={loggedIn ? "/dashboard" : "/auth?next=/dashboard"}
            style={{
              background: 'white',
              color: 'var(--brand-orange)',
              fontSize: '1.2rem',
              padding: '18px 40px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
            {loggedIn ? 'Go to Dashboard' : 'Get Started Free'}
          </Link>
        </div>
      </section>
    </>
  );
}
