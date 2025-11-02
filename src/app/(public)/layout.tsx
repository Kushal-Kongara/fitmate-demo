export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <header className="site-header">
          <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <a className="brand" href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="https://lqbbcvwvuifhuxcgbvpt.supabase.co/storage/v1/object/public/fitmate-storage/Marketing_site/new-site-images/Fitmate-logo-nav.svg"
                alt="Fitmate Coach"
                style={{
                  height: '32px',
                  width: 'auto'
                }}
              />
            </a>
            <nav className="nav">
              <a href="/auth?next=/dashboard" className="btn" style={{ 
                fontSize: '0.95rem',
                padding: '10px 20px'
              }}>
                Get Started
              </a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>
              © {new Date().getFullYear()} FitMate Coach Demo - AI-Assisted Nutrition Coaching Platform
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Built with Next.js, Supabase, OpenAI & VAPI
            </p>
          </div>
        </footer>
      </>
    );
  }
  