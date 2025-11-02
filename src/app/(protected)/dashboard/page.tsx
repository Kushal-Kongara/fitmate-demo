'use client';

export default function Dashboard() {
  return (
    <>
      {/* Welcome Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #fef9f5 0%, #fff5f0 100%)',
        borderRadius: '20px',
        padding: 'clamp(32px, 5vw, 48px)',
        marginTop: '32px',
        marginBottom: '48px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border-light)'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.06
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(232, 93, 51, 0.1)',
            borderRadius: '20px',
            marginBottom: '16px',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--brand-orange)'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            Demo Dashboard
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '800',
            marginBottom: '12px',
            color: 'var(--text-dark)',
            letterSpacing: '-0.02em'
          }}>
            Welcome to FitMate Coach
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-gray)',
            lineHeight: '1.6',
            marginBottom: 0,
            maxWidth: '700px'
          }}>
            Experience the complete AI-assisted coaching workflow. Follow the steps below to see how AI empowers human coaches to deliver personalized nutrition feedback at scale.
          </p>
        </div>
      </section>

      {/* Workflow Cards */}
      <section>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '24px',
          color: 'var(--text-dark)'
        }}>
          Demo Workflow
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {/* Step 1: Log Meal */}
          <a href="/meal" style={{
            display: 'block',
            background: 'white',
            borderRadius: '16px',
            padding: '28px',
            border: '2px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            e.currentTarget.style.borderColor = 'var(--brand-orange)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            e.currentTarget.style.borderColor = 'var(--border-light)';
          }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
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
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--brand-orange)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.1rem'
              }}>1</div>
            </div>

            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '8px',
              color: 'var(--text-dark)'
            }}>
              Log a Meal
            </h3>

            <p style={{
              color: 'var(--text-gray)',
              lineHeight: '1.6',
              marginBottom: '16px',
              fontSize: '0.95rem'
            }}>
              Start by logging a meal. AI will instantly analyze it and generate personalized feedback.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--brand-orange)',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Try it now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </a>

          {/* Step 2: Coach Review */}
          <a href="/coach" style={{
            display: 'block',
            background: 'white',
            borderRadius: '16px',
            padding: '28px',
            border: '2px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            e.currentTarget.style.borderColor = 'var(--brand-green)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            e.currentTarget.style.borderColor = 'var(--border-light)';
          }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
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
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--brand-green)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.1rem'
              }}>2</div>
            </div>

            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '8px',
              color: 'var(--text-dark)'
            }}>
              Coach Review & Approve
            </h3>

            <p style={{
              color: 'var(--text-gray)',
              lineHeight: '1.6',
              marginBottom: '16px',
              fontSize: '0.95rem'
            }}>
              Review AI-generated feedback, make edits, and approve before sending to members.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--brand-green)',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Review feedback
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </a>

          {/* Step 3: Pattern Analysis */}
          <a href="/patterns" style={{
            display: 'block',
            background: 'white',
            borderRadius: '16px',
            padding: '28px',
            border: '2px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            e.currentTarget.style.borderColor = '#5b7fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            e.currentTarget.style.borderColor = 'var(--border-light)';
          }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
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
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#5b7fff',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.1rem'
              }}>3</div>
            </div>

            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '8px',
              color: 'var(--text-dark)'
            }}>
              Weekly Insights
            </h3>

            <p style={{
              color: 'var(--text-gray)',
              lineHeight: '1.6',
              marginBottom: '16px',
              fontSize: '0.95rem'
            }}>
              Generate AI-powered pattern analysis and personalized experiment suggestions.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#5b7fff',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              View insights
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </a>

          {/* Step 4: Voice Check-in */}
          <a href="/voice" style={{
            display: 'block',
            background: 'white',
            borderRadius: '16px',
            padding: '28px',
            border: '2px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            e.currentTarget.style.borderColor = '#9966ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            e.currentTarget.style.borderColor = 'var(--border-light)';
          }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #fef5ff 0%, #f5e6ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9966ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#9966ff',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.1rem'
              }}>4</div>
            </div>

            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '8px',
              color: 'var(--text-dark)'
            }}>
              Voice Check-in
            </h3>

            <p style={{
              color: 'var(--text-gray)',
              lineHeight: '1.6',
              marginBottom: '16px',
              fontSize: '0.95rem'
            }}>
              Try the AI voice coach powered by VAPI for natural conversation and real-time feedback.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#9966ff',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Start voice call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Info Section */}
      <section style={{
        marginTop: '48px',
        padding: '32px',
        background: 'white',
        borderRadius: '16px',
        border: '1px solid var(--border-light)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '20px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #fef9f5 0%, #fff5f0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </div>
          <div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              marginBottom: '8px',
              color: 'var(--text-dark)'
            }}>
              About This Demo
            </h3>
            <p style={{
              color: 'var(--text-gray)',
              lineHeight: '1.7',
              marginBottom: 0
            }}>
              This demonstration showcases a complete AI-assisted coaching platform built with <strong>Next.js</strong>, <strong>Supabase</strong>, <strong>OpenAI GPT-4</strong>, and <strong>VAPI</strong>. The system demonstrates how AI can augment human coaches by generating draft feedback instantly, while maintaining the critical human-in-the-loop oversight that ensures quality and personalization.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
