'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { sb } from '@/lib/supabase';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const next = params.get('next') || '/dashboard';

  useEffect(() => {
    let mounted = true;
    sb.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) router.replace(`/auth?next=${encodeURIComponent(next)}`);
      else setReady(true);
    });
    return () => { mounted = false; };
  }, [router, next]);

  async function logout() {
    await sb.auth.signOut();
    router.replace('/');
  }

  if (!ready) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-light)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            margin: '0 auto 16px',
            border: '3px solid var(--border-light)',
            borderTopColor: 'var(--brand-orange)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: 'var(--text-gray)', fontSize: '1rem' }}>Checking authentication...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="site-header">
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px'
        }}>
          <a className="brand" href="/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="https://lqbbcvwvuifhuxcgbvpt.supabase.co/storage/v1/object/public/fitmate-storage/Marketing_site/new-site-images/Fitmate-logo-nav.svg"
              alt="Fitmate Coach"
              style={{
                height: '32px',
                width: 'auto'
              }}
            />
          </a>
          <nav className="nav" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a 
              href="/meal" 
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '0.95rem',
                color: isActive('/meal') ? 'white' : 'var(--text-gray)',
                background: isActive('/meal') ? 'var(--brand-orange)' : 'transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="1" x2="6" y2="4"/>
                <line x1="10" y1="1" x2="10" y2="4"/>
                <line x1="14" y1="1" x2="14" y2="4"/>
              </svg>
              Meal
            </a>
            <a 
              href="/coach"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '0.95rem',
                color: isActive('/coach') ? 'white' : 'var(--text-gray)',
                background: isActive('/coach') ? 'var(--brand-orange)' : 'transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Coach
            </a>
            <a 
              href="/patterns"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '0.95rem',
                color: isActive('/patterns') ? 'white' : 'var(--text-gray)',
                background: isActive('/patterns') ? 'var(--brand-orange)' : 'transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              Insights
            </a>
            <a 
              href="/voice"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '0.95rem',
                color: isActive('/voice') ? 'white' : 'var(--text-gray)',
                background: isActive('/voice') ? 'var(--brand-orange)' : 'transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
              Voice
            </a>
            <button 
              onClick={logout}
              className="btn secondary"
              style={{
                marginLeft: '8px',
                padding: '8px 16px',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
    </>
  );
}
