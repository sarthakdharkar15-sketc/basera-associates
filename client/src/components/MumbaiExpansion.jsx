import React from 'react';
import { TrendingUp, MapPin, Building, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MumbaiExpansion = () => {
  const navigate = useNavigate();

  return (
    <section 
      id="mumbai-expansion" 
      className="mumbai-expansion scroll-reveal" 
      onClick={() => navigate('/mumbai-expansion')}
      style={{
        position: 'relative',
        height: '600px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        color: '#fff',
        cursor: 'pointer',
        margin: '80px 20px',
        borderRadius: '40px',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
      }}
    >
      {/* Background Video with Dark Overlay */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        poster="/mumbai-sealink.jpg"
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: -2,
          opacity: 0.8
        }}
      >
        <source src="https://assets.mixkit.co/videos/31416/31416-video-preview.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/download/mixkit-mumbai-city-at-night-with-traffic-40082.mp4" type="video/mp4" />
      </video>
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(12, 14, 18, 0.95) 0%, rgba(12, 14, 18, 0.4) 100%)',
        zIndex: -1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 60px' }}>
        <div style={{ maxWidth: '700px' }}>
          {/* Coming Soon Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(195, 157, 99, 0.15)',
            border: '1px solid rgba(195, 157, 99, 0.3)',
            padding: '10px 24px',
            borderRadius: '100px',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            fontWeight: '800',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '32px'
          }} className="animate-slide-up">
            <span className="pulse-dot-gold" />
            COMING SOON TO THE CITY OF DREAMS
          </div>

          <h2 style={{
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            color: '#fff',
            fontFamily: "'Playfair Display', serif"
          }} className="animate-slide-up">
            Expanding to <br/> <span style={{ color: 'var(--primary)', fontStyle: 'italic', fontWeight: '300' }}>Mumbai</span>
          </h2>

          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '40px',
            maxWidth: '550px'
          }} className="animate-fade-in delay-1">
            Bridging Indore's Trust with Mumbai's Global Ambition. Experience the next era of luxury real estate.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="animate-fade-in delay-2">
            <button className="btn btn-primary" style={{ padding: '16px 40px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Explore Vision <ArrowRight size={20} />
            </button>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: '500', letterSpacing: '1px' }}>
              EST. 2026 • NARIMAN POINT
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', opacity: 0.3 }}>
        {[<MapPin size={40}/>, <Building size={40}/>, <Globe size={40}/>, <TrendingUp size={40}/>].map((icon, i) => (
          <div key={i} style={{ color: 'var(--primary)', padding: '20px', border: '1px solid rgba(195,157,99,0.2)', borderRadius: '20px' }}>
            {icon}
          </div>
        ))}
      </div>

      <style>{`
        .bg-zoom {
          animation: slowZoom 30s infinite alternate linear;
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        .pulse-dot-gold {
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          position: relative;
        }
        .pulse-dot-gold::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: var(--primary);
          border-radius: 50%;
          animation: pulseGold 2s infinite;
        }
        @keyframes pulseGold {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }
          
        .mumbai-expansion:hover .bg-zoom {
          transform: scale(1.2);
        }
        .mumbai-expansion:hover {
          border-color: rgba(195,157,99,0.4) !important;
          box-shadow: 0 50px 120px rgba(0,0,0,0.8), 0 0 40px rgba(195,157,99,0.1);
        }
      `}</style>
    </section>
  );
};

export default MumbaiExpansion;
