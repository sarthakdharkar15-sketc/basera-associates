import React, { useEffect } from 'react';
import { TrendingUp, MapPin, Building, Globe, CheckCircle, Rocket, Shield, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MumbaiExpansionPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mumbai-page animate-fade-in" style={{ background: '#0a0b0e', minHeight: '100vh', color: '#fff' }}>
      {/* Cinematic Hero Section */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
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
            zIndex: 1,
            opacity: 0.6
          }}
        >
          <source src="https://assets.mixkit.co/videos/download/mixkit-mumbai-city-at-night-with-traffic-40082.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/31416/31416-video-preview.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(to bottom, rgba(10,11,14,0.6) 0%, rgba(10,11,14,0.9) 80%, #0a0b0e 100%)',
          zIndex: 2
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              position: 'absolute',
              top: '-40px',
              left: '20px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s'
            }}
            className="hover-lift"
          >
            <ArrowLeft size={18} /> Back to Indore
          </button>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(195, 157, 99, 0.15)',
            border: '1px solid rgba(195, 157, 99, 0.3)',
            padding: '10px 24px',
            borderRadius: '100px',
            color: 'var(--primary)',
            fontSize: '0.9rem',
            fontWeight: '800',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '30px'
          }} className="animate-slide-up">
            <span className="pulse-dot-gold" />
            The Future of Luxury has a New Address
          </div>

          <h1 style={{
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            fontWeight: '900',
            lineHeight: '1',
            marginBottom: '20px',
            fontFamily: "'Playfair Display', serif",
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }} className="animate-slide-up">
            Mumbai <span style={{ color: 'var(--primary)', fontStyle: 'italic', fontWeight: '300' }}>Expansion</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '800px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }} className="animate-fade-in delay-1">
            Bridging Indore's legacy of trust with the global ambition of India's Maximum City.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }} className="animate-fade-in delay-2">
            <button 
              onClick={() => document.getElementById('priority-registration')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary" 
              style={{ padding: '18px 50px', fontSize: '1.1rem' }}
            >
              Priority Access Registration
            </button>
            <button 
              onClick={() => document.getElementById('iconic-locations')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-outline" 
              style={{ padding: '18px 50px', fontSize: '1.1rem' }}
            >
              Explore Locations
            </button>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section style={{ padding: '120px 0', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '30px', fontFamily: "'Playfair Display', serif" }}>
                A Vision Without <br/> <span style={{ color: 'var(--primary)' }}>Boundaries</span>
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '30px' }}>
                For over a decade, Basera Associates has been synonymous with transparency and excellence in Indore. 
                Today, as we look towards 2026, we are taking our pioneering "Direct-to-Member" investment models 
                to Mumbai. 
              </p>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '40px' }}>
                From high-yield commercial hubs in BKC to ultra-luxury penthouses in South Mumbai, we are 
                curating a portfolio that redefined what's possible in Indian Real Estate.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                {[
                  { icon: <MapPin />, title: 'South Mumbai Core', text: 'Exclusive heritage redevelopments.' },
                  { icon: <Building />, title: 'BKC Heights', text: 'Premium Grade-A commercial spaces.' }
                ].map((item, i) => (
                  <div key={i} className="glass" style={{ padding: '25px', borderRadius: '20px' }}>
                    <div style={{ color: 'var(--primary)', marginBottom: '15px' }}>{item.icon}</div>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{item.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/mumbai-sealink.jpg" 
                alt="Bandra-Worli Sea Link"
                style={{ width: '100%', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--primary)',
                padding: '20px 40px',
                borderRadius: '15px',
                color: '#000',
                fontWeight: '900',
                fontSize: '1.2rem',
                boxShadow: '0 20px 40px rgba(195,157,99,0.3)',
                whiteSpace: 'nowrap',
                textAlign: 'center'
              }}>
                EST. MUMBAI 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Iconic Mumbai Locations Section */}
      <section id="iconic-locations" style={{ padding: '120px 0', background: 'linear-gradient(to bottom, #0a0b0e, #11141a)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ color: 'var(--primary)', fontWeight: '800', letterSpacing: '4px', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.9rem' }}>The Mumbai Portfolio</div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: "'Playfair Display', serif" }}>
              Iconic <span style={{ color: 'var(--primary)' }}>Locations</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '15px', maxWidth: '700px', margin: '15px auto 0' }}>
              We are targeting the most exclusive pin codes in Maximum City, where heritage meets the horizon.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '30px' 
          }}>
            {[
              { name: 'Worli Sea Face', desc: 'Panoramic ocean views and a skyline that rivals Manhattan.' },
              { name: 'Malabar Hill', desc: 'The zenith of Mumbai\'s power and heritage, overlooking the Back Bay.' },
              { name: 'Pali Hill, Bandra', desc: 'A verdant retreat for the cinematic elite and creative visionaries.' },
              { name: 'Cuffe Parade', desc: 'Sophisticated living at the southern tip of the financial capital.' },
              { name: 'Altamount Road', desc: 'India\'s most expensive real estate, home to global billionaires.' },
              { name: 'Juhu Tara Road', desc: 'Sunkissed beachfront opulence with a bohemian luxury vibe.' },
              { name: 'Marine Drive', desc: 'Living within the \'Queen\'s Necklace\', a timeless architectural legacy.' },
              { name: 'Lower Parel', desc: 'The \'New York of Mumbai\' with ultra-modern high-rises.' },
              { name: 'Prabhadevi', desc: 'Where spiritual serenity meets modern sea-facing grandeur.' },
              { name: 'Nariman Point', desc: 'A prestigious business address with unparalleled Arabian Sea vistas.' },
              { name: 'Breach Candy', desc: 'Exclusive coastal charm with historic elite social clubs.' },
              { name: 'BKC Heights', desc: 'The heartbeat of modern commerce and luxury commercial assets.' },
              { name: 'Peddar Road', desc: 'A central arterial of old-world charm and contemporary affluence.' },
              { name: 'Versova', desc: 'A tranquil, artistic seaside enclave for the modern aesthete.' },
              { name: 'Colaba', desc: 'Heritage architecture meets the cosmopolitan pulse of South Mumbai.' },
              { name: 'Hiranandani, Powai', desc: 'European-inspired township living with a serene lakeside backdrop.' },
              { name: 'Santacruz West', desc: 'A hub of upscale elegance and elite educational institutions.' },
              { name: 'Mahim West', desc: 'Calm, sea-facing residences with a unique cultural mosaic.' },
              { name: 'Mazgaon Harbour', desc: 'A revitalizing maritime hub with untapped investment potential.' },
              { name: 'Seawoods, Navy Mumbai', desc: 'The crown jewel of Navi Mumbai\'s coastal stretch.' }
            ].map((loc, i) => (
              <div key={i} className="location-card glass-premium" style={{ 
                padding: '30px', 
                borderRadius: '24px',
                transition: 'all 0.4s',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '20px', right: '20px', color: 'rgba(195,157,99,0.2)' }}>
                  <MapPin size={20} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px', fontFamily: "'Playfair Display', serif" }}>{loc.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: '1.6' }}>{loc.desc}</p>
                <div className="location-tag" style={{ 
                  marginTop: '20px', 
                  fontSize: '0.7rem', 
                  fontWeight: '800', 
                  color: 'var(--primary)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}>Target Zone</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Roadmap */}
      <section id="strategic-roadmap" style={{ padding: '120px 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif" }}>
              The Strategic <span style={{ color: 'var(--primary)' }}>Roadmap</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '10px' }}>A phased approach to dominating the Maximum City</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { 
                phase: 'PHASE 01', 
                title: 'Strategic Hub', 
                desc: 'Opening our Grade-A Corporate HQ in Nariman Point (Financial District).',
                icon: <Rocket size={40} />
              },
              { 
                phase: 'PHASE 02', 
                title: 'Luxury Portfolio', 
                desc: 'Launching 5 ultra-luxury projects in Worli and Bandra West.',
                icon: <Sparkles size={40} />
              },
              { 
                phase: 'PHASE 03', 
                title: 'Investment Club', 
                desc: 'Inaugural Mumbai Chapter of our Billionaire Investment Circle.',
                icon: <Globe size={40} />
              }
            ].map((item, i) => (
              <div key={i} className="glass-premium" style={{ padding: '50px 40px', borderRadius: '30px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '8rem', fontWeight: '900', opacity: 0.03, color: '#fff' }}>0{i+1}</div>
                <div style={{ color: 'var(--primary)', marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '4px', color: 'var(--primary)', marginBottom: '15px' }}>{item.phase}</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <section id="priority-registration" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="glass" style={{ padding: '80px', borderRadius: '40px', border: '1px solid rgba(195, 157, 99, 0.3)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready for the Next Big Move?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
              Join our exclusive mailing list for the Mumbai expansion and be the first to receive invitation-only brochures.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <input 
                type="email" 
                placeholder="Enter your premium email" 
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '15px 30px', 
                  borderRadius: '30px', 
                  color: '#fff',
                  width: '350px'
                }} 
              />
              <button className="btn btn-primary" style={{ padding: '15px 40px', borderRadius: '30px' }}>Notify Me</button>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        .delay-1 { animation-delay: 0.3s; }
        .delay-2 { animation-delay: 0.6s; }
        
        .pulse-dot-gold {
          width: 10px;
          height: 10px;
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

        .hover-lift {
          transition: all 0.4s var(--apple-spring);
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.1) !important;
        }

        .location-card:hover {
          background: rgba(195, 157, 99, 0.05) !important;
          border-color: rgba(195, 157, 99, 0.3) !important;
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
};

const Sparkles = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);

export default MumbaiExpansionPage;
