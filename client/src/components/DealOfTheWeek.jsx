import React, { useState, useEffect } from 'react';
import { Timer, Zap, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const DealOfTheWeek = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, mins: 22, secs: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="deal-of-week-section scroll-reveal" style={{ padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--primary)' }}></div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '4px', color: 'var(--primary)', textTransform: 'uppercase' }}>Exclusive Offer</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--primary)' }}></div>
          </div>
          <h2 className="premium-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>Deal of the <span className="highlight-text">Week</span></h2>
        </div>

        <div className="glass-premium" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          overflow: 'hidden',
          borderRadius: '30px',
          border: '1px solid rgba(195, 157, 99, 0.2)',
          background: 'linear-gradient(145deg, rgba(26, 29, 36, 0.4), rgba(15, 17, 21, 0.6))',
          boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6)'
        }}>
          
          {/* Image Part */}
          <div style={{ position: 'relative', minHeight: '400px', overflow: 'hidden' }}>
            <img 
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop" 
              alt="Premium Deal Property" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 10s linear' }}
              className="deal-image"
            />
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'var(--danger)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '50px',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(255, 59, 48, 0.4)',
              animation: 'pulse-subtle 2s infinite'
            }}>
              <Zap size={14} fill="currentColor" /> HOT DEAL: 15% OFF
            </div>
          </div>

          {/* Content Part */}
          <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              <span className="l-badge type-badge" style={{ background: 'rgba(255,255,255,0.1)' }}>LUXURY VILLA</span>
              <span className="l-badge type-badge" style={{ background: 'rgba(52, 199, 89, 0.1)', color: '#34c759' }}>READY TO MOVE</span>
            </div>

            <h3 style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#fff', marginBottom: '10px' }}>The Sapphire Estates</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px', lineHeight: 1.6 }}>
              A masterpiece of modern architecture featuring private infinity pools, smart automation, and breathtaking panoramic views of the skyline.
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', marginBottom: '40px' }}>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹ 8.5 Cr</span>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-1px' }}>₹ 7.2 Cr</span>
            </div>

            {/* Countdown / Urgency */}
            <div style={{ 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '20px', 
              padding: '24px', 
              border: '1px solid rgba(255,255,255,0.05)',
              marginBottom: '40px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff3b30', fontSize: '0.85rem', fontWeight: 700 }}>
                  <Timer size={16} /> OFFER ENDS SOON
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  <Flame size={14} style={{ marginRight: '4px' }} /> 4 UNITS LEFT
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.mins },
                  { label: 'Secs', value: timeLeft.secs }
                ].map((item, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{String(item.value).padStart(2, '0')}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <Link to="/project/exclusive-sapphire" className="btn btn-primary" style={{ flex: 1, padding: '18px', fontSize: '1.1rem', fontWeight: 700 }}>
                BOOK NOW <ArrowRight size={18} style={{ marginLeft: '10px' }} />
              </Link>
              <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 0.5 }}>
                <ShieldCheck size={20} /> VERIFIED
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .deal-image {
          animation: slowZoom 20s infinite alternate;
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default DealOfTheWeek;
