'use client';
import { useEffect, useRef, useState } from 'react';

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic';

type VapiType = any;

export default function VoicePage() {
  const [connected, setConnected] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [status, setStatus] = useState('idle');
  const [lastError, setLastError] = useState<string>('');
  const vapiRef = useRef<VapiType | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY as string | undefined;
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID as string | undefined;

  useEffect(() => {
    console.log('VAPI env check', { hasPublicKey: !!apiKey, hasAssistantId: !!assistantId });
    let mounted = true;

    async function init() {
      try {
        if (!apiKey) {
          setStatus('Missing NEXT_PUBLIC_VAPI_PUBLIC_KEY');
          return;
        }
        const mod = await import('@vapi-ai/web');
        const Vapi = (mod as any).default || (mod as any);
        const vapi = new Vapi(apiKey);

        // events
        vapi.on('call-start', () => { setConnected(true); setStatus('Connected'); });
        vapi.on('call-end', () => { setConnected(false); setSpeaking(false); setStatus('Call ended'); });
        vapi.on('speech-start', () => setSpeaking(true));
        vapi.on('speech-end', () => setSpeaking(false));
        vapi.on('message', (m: any) => {
          if (m?.type === 'transcript') {
            setLog(prev => [...prev, `${m.role}: ${m.transcript}`].slice(-100));
          }
        });
        vapi.on('error', (e: any) => {
          console.error('VAPI error:', e);
          setLastError(stringifyErr(e));
          setStatus('Error occurred');
        });

        if (!mounted) return;
        vapiRef.current = vapi;
        setStatus('Ready');
      } catch (err: any) {
        console.error('VAPI init failed:', err);
        setLastError(stringifyErr(err));
        setStatus('Initialization failed');
      }
    }

    init();
    return () => { mounted = false; vapiRef.current?.stop?.(); };
  }, [apiKey, assistantId]);

  function stringifyErr(e: any) {
    try {
      if (!e) return 'Unknown error';
      if (typeof e === 'string') return e;
      if (e.message) return `${e.message}${e.code ? ' (code '+e.code+')' : ''}`;
      return JSON.stringify(e, null, 2);
    } catch { return 'Unknown error (stringify failed)'; }
  }

  async function ensureMicPermission() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (e: any) {
      setLastError('Mic permission denied: ' + stringifyErr(e));
      alert('Mic permission is required. Please allow microphone access and try again.');
      return false;
    }
  }

  async function start() {
    if (!vapiRef.current) { setLastError('VAPI not ready'); alert('VAPI not ready'); return; }
    if (!assistantId) { setLastError('Missing NEXT_PUBLIC_VAPI_ASSISTANT_ID'); alert('Assistant ID missing'); return; }

    const ok = await ensureMicPermission();
    if (!ok) return;

    try {
      setStatus('Starting call...');
      setLastError('');
      await vapiRef.current.start(assistantId);
      setStatus('Connected');
    } catch (e: any) {
      console.error('Start failed:', e);
      const msg = stringifyErr(e);
      setLastError(msg);
      setStatus('Failed to start');
      alert('Start failed: ' + msg);
    }
  }

  async function stop() {
    try { 
      await vapiRef.current?.stop(); 
      setStatus('Call ended');
    } catch (e) {
      console.error('Stop failed:', e);
    }
  }

  const getStatusColor = () => {
    if (connected) return 'var(--success-green)';
    if (lastError) return '#e53e3e';
    if (status === 'Ready') return 'var(--brand-orange)';
    return 'var(--text-muted)';
  };

  return (
    <div className="page-section">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '2rem' }}>🎙️</span>
        <h3 style={{ margin: 0 }}>AI Voice Coach</h3>
      </div>
      
      <p style={{ marginBottom: '32px', color: 'var(--text-gray)' }}>
        Have a real-time voice conversation with your AI nutrition coach. Get instant feedback, 
        ask questions, and discuss your goals naturally through voice.
      </p>

      {/* Status Display */}
      <div style={{ 
        padding: '20px',
        background: 'var(--bg-cream)',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '2px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%',
            background: getStatusColor(),
            animation: connected ? 'pulse 2s infinite' : 'none'
          }} />
          <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
            Status: <span style={{ color: getStatusColor() }}>{status}</span>
          </span>
        </div>
        {speaking && (
          <span className="status-badge" style={{ 
            background: 'var(--success-green)',
            color: 'white',
            animation: 'pulse 1s infinite'
          }}>
            🎤 Speaking...
          </span>
        )}
      </div>

      {/* Error Display */}
      {lastError && (
        <div style={{ 
          padding: '20px',
          background: '#fee',
          border: '2px solid #fcc',
          borderRadius: '12px',
          color: '#c33',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Error</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', wordBreak: 'break-word' }}>{lastError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Call Controls */}
      <div style={{ 
        marginBottom: '32px',
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        padding: '32px',
        background: 'linear-gradient(135deg, #fef9f5 0%, #fff5f0 100%)',
        borderRadius: '16px',
        border: '1px solid var(--border-light)'
      }}>
        {!connected ? (
          <button 
            onClick={start} 
            className="btn"
            style={{ 
              minWidth: '200px',
              fontSize: '1.1rem',
              padding: '16px 32px'
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>🎤</span> Start Voice Call
          </button>
        ) : (
          <button 
            onClick={stop} 
            className="btn danger"
            style={{ 
              minWidth: '200px',
              fontSize: '1.1rem',
              padding: '16px 32px'
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>⛔</span> End Call
          </button>
        )}
      </div>

      {/* Transcript */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ 
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>📝</span> Conversation Transcript
        </h4>
        <div style={{ 
          background: 'white',
          border: '2px solid var(--border-light)',
          borderRadius: '12px',
          padding: '20px',
          minHeight: '300px',
          maxHeight: '400px',
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          lineHeight: '1.8'
        }}>
          {log.length === 0 ? (
            <em style={{ color: 'var(--text-muted)' }}>
              Transcript will appear here once you start the call...
            </em>
          ) : (
            log.map((l, i) => {
              const isUser = l.startsWith('user:');
              return (
                <div 
                  key={i}
                  style={{ 
                    padding: '8px 12px',
                    marginBottom: '8px',
                    background: isUser ? 'var(--bg-cream)' : 'var(--bg-light)',
                    borderRadius: '8px',
                    borderLeft: `3px solid ${isUser ? 'var(--brand-orange)' : 'var(--brand-green)'}`,
                    color: 'var(--text-dark)'
                  }}
                >
                  {l}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Info Section */}
      <div style={{ 
        padding: '24px',
        background: 'var(--bg-cream)',
        borderRadius: '12px',
        border: '1px solid var(--border-light)'
      }}>
        <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💡</span> How Voice Coaching Works
        </h4>
        <ul style={{ 
          color: 'var(--text-gray)',
          lineHeight: '1.8',
          paddingLeft: '20px',
          margin: 0
        }}>
          <li>Click "Start Voice Call" and allow microphone access</li>
          <li>Speak naturally with the AI coach about your nutrition goals</li>
          <li>Get instant, personalized feedback and recommendations</li>
          <li>Ask questions, discuss challenges, or review your progress</li>
          <li>End the call anytime - the transcript is saved for your review</li>
        </ul>
        <p style={{ 
          marginTop: '16px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          marginBottom: 0
        }}>
          🔒 Your conversations are private and secure. Voice data is processed by VAPI 
          with industry-standard encryption.
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
