import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // Silent fail if honeypot filled
    if (!email) return;
    
    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('idle');
        alert("Subscription failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="newsletter-compact-section animate-slide-up" style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{
          background: 'linear-gradient(145deg, #12151c 0%, #0a0c10 100%)',
          border: '1px solid rgba(195, 157, 99, 0.15)',
          borderRadius: '20px',
          padding: '30px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          flexWrap: 'wrap',
          boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle glow background */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-30px',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(195,157,99,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}></div>

          <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', fontFamily: 'Outfit, sans-serif', margin: '0 0 8px 0', letterSpacing: '1px' }}>
              Subscribe for <span style={{ color: 'var(--primary)' }}>Updates</span>
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', margin: 0, maxWidth: '400px', lineHeight: '1.4' }}>
              Join our exclusive elite architectural community.
            </p>
          </div>

          <div style={{ flex: '1 1 350px', position: 'relative', zIndex: 1 }}>
            {status === 'success' ? (
              <div style={{ 
                color: 'var(--success)', 
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'fadeIn 0.5s ease'
              }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }}></div>
                Successfully subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <input type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(195, 157, 99, 0.2)',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseOver={(e) => {
                    if (status !== 'loading') e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
