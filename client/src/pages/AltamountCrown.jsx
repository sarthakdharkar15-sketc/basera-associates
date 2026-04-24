import React, { useEffect } from 'react';
import { 
  ArrowRight,
  Sparkles,
  ChevronRight,
  Building2,
  Crown,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Droplet,
  Smartphone,
  Star,
  Landmark,
  Waves,
  Users,
  Film,
  ArrowUpCircle,
  Home,
  UserCheck,
  Music,
  Dumbbell,
  Moon,
  Target,
  Shield,
  Fingerprint,
  Flame,
  UserPlus,
  Zap,
  BatteryCharging,
  ParkingCircle,
  Leaf,
  Gamepad2,
  Dog,
  Coffee
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function AltamountCrown() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const highlights = [
    { title: '45-Storey Iconic Tower', desc: 'A soaring architectural masterpiece that redefined the Mumbai skyline.' },
    { title: 'Ultra-Luxury Residences', desc: 'Exquisitely designed interiors with bespoke finishes for elite living.' },
    { title: 'Prime Location', desc: 'Situated at Altamount Road, India\'s most prestigious residential address.' },
    { title: 'Elite Neighborhood', desc: 'Home to the world\'s most influential families and iconic landmarks.' },
    { title: 'HNI Collection', desc: 'Crafted exclusively for high-net-worth individuals who demand perfection.' }
  ];

  const amenities = [
    { icon: <Droplet size={24} />, title: 'Infinity Pool', desc: 'Olympic-sized pool with panoramic views of South Mumbai.' },
    { icon: <Waves size={24} />, title: 'Rooftop Deck', desc: 'Sprawling open-air deck for breathtaking skyline views.' },
    { icon: <Users size={24} />, title: 'Clubhouse', desc: 'A sophisticated hub for recreation and community interaction.' },
    { icon: <Film size={24} />, title: 'Private Theatre', desc: 'State-of-the-art mini cinema for an immersive experience.' },
    { icon: <ArrowUpCircle size={24} />, title: 'Private Elevator', desc: 'Direct, secure access from the lobby to your residence.' },
    { icon: <Home size={24} />, title: 'Sky Villas / Duplex', desc: 'Expansive multi-level residences in the clouds.' },
    { icon: <UserCheck size={24} />, title: 'Concierge Services', desc: 'Round-the-clock personalized assistance for all your needs.' },
    { icon: <Music size={24} />, title: 'Banquets/Party Hall', desc: 'Elegant spaces for hosting prestigious social events.' },
    { icon: <Dumbbell size={24} />, title: 'Fully Equipped Gym', desc: 'Top-tier fitness center with professional-grade equipment.' },
    { icon: <Moon size={24} />, title: 'Yoga & Meditation', desc: 'Tranquil spaces designed for mindfulness and peace.' },
    { icon: <Sparkles size={24} />, title: 'Spa & Wellness', desc: 'Luxury treatment rooms and therapeutic sanctuary.' },
    { icon: <Target size={24} />, title: 'Indoor Sports Area', desc: 'Dedicated courts for premium indoor sporting activities.' },
    { icon: <Shield size={24} />, title: 'Gated Community', desc: 'Ultimate privacy within a highly secure perimeter.' },
    { icon: <Fingerprint size={24} />, title: 'Smart Access', desc: 'Biometric, face-recognition and key card entry systems.' },
    { icon: <Flame size={24} />, title: 'Fire Safety', desc: 'Advanced, high-capacity suppression and safety systems.' },
    { icon: <UserPlus size={24} />, title: 'Security Guards', desc: '24/7 elite professional security detail.' },
    { icon: <Smartphone size={24} />, title: 'Home Automation', desc: 'Full smart home control via integrated mobile systems.' },
    { icon: <Zap size={24} />, title: 'High-Speed Elevators', desc: 'Next-gen elevators with minimal wait time.' },
    { icon: <BatteryCharging size={24} />, title: 'Power Backup', desc: '100% uninterrupted power supply for every unit.' },
    { icon: <ParkingCircle size={24} />, title: 'Dedicated Parking', desc: 'Assigned multi-level secure parking bays.' },
    { icon: <BatteryCharging size={24} />, title: 'EV Charging', desc: 'State-of-the-art charging stations for electric vehicles.' },
    { icon: <Leaf size={24} />, title: 'Landscaped Gardens', desc: 'Lush greenery and designer outdoor spaces.' },
    { icon: <Gamepad2 size={24} />, title: 'Children’s Play Area', desc: 'Safe, creative zones for young residents.' },
    { icon: <Dog size={24} />, title: 'Pet-Friendly Zone', desc: 'Dedicated area and services for your animal companions.' },
    { icon: <Coffee size={24} />, title: 'Relaxation Zones', desc: 'Curated sitting areas for quiet reflection.' }
  ];

  return (
    <div className="altamount-crown-page" style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      
      {/* SECTION 1: CINEMATIC HERO */}
      <section className="hero-section" style={{ 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.7,
            filter: 'brightness(0.8) contrast(1.1)'
          }}
        >
          <source src="/altamount-bg.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.8) 100%)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="animate-slide-up" style={{ maxWidth: '800px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(195, 157, 99, 0.15)', color: 'var(--primary)', padding: '10px 25px', borderRadius: '50px', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '4px', marginBottom: '30px', border: '1px solid rgba(195, 157, 99, 0.3)' }}>
              THE PEAK OF LUXURY
            </div>
            <h1 style={{ 
              fontSize: 'clamp(4rem, 10vw, 8rem)', 
              lineHeight: '0.9', 
              fontWeight: '800', 
              fontFamily: 'Outfit, sans-serif',
              marginBottom: '30px',
              textShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
              Altamount<br />
              <span style={{ color: 'var(--primary)' }}>Crown</span>
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)', fontWeight: '700', marginBottom: '50px', letterSpacing: '1px' }}>
              A Landmark of Luxury Rising in Mumbai
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <button className="btn btn-primary" style={{ padding: '20px 45px', fontSize: '1.1rem', fontWeight: '800', borderRadius: '5px' }}>
                REQUEST BROCHURE
              </button>
              <button className="btn btn-outline" style={{ padding: '20px 45px', fontSize: '1.1rem', fontWeight: '800', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '5px' }}>
                ENQUIRE NOW
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 2: THE VISION */}
      <section style={{ padding: '120px 0', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="animate-slide-up">
              <h2 style={{ fontSize: '3.5rem', color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '30px', fontWeight: '800' }}>
                Where Architecture Meets Legacy
              </h2>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>
                Positioned in close proximity to iconic landmarks like <strong>Antilia</strong>, Altamount Crown represents the pinnacle of status and exclusivity. This 45-storey tower is not just a building; it is a statement of intent—a testament to the power of visionary design and world-class craftsmanship.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '30px', background: 'rgba(195, 157, 99, 0.05)', borderRadius: '20px', border: '1px solid rgba(195, 157, 99, 0.2)' }}>
                <Building2 size={40} color="var(--primary)" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary)' }}>IN COLLABORATION WITH</h4>
                  <p style={{ margin: '5px 0 0 0', fontSize: '1.3rem', fontWeight: '700' }}>Lodha Group</p>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', width: '100%', aspectRatio: '4/5', maxHeight: '700px', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <img src="/altamount-vision.jpg" alt="Tower Visual" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: KEY HIGHLIGHTS */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(to bottom, transparent, #111)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h3 style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>Project <span style={{ color: 'var(--primary)' }}>Highlights</span></h3>
            <div style={{ width: '80px', height: '4px', background: 'var(--primary)', margin: '20px auto' }}></div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
            {highlights.map((h, i) => (
              <div key={i} className="glass hover-glow" style={{ 
                padding: '40px', 
                borderRadius: '24px', 
                border: '1px solid rgba(195, 157, 99, 0.1)', 
                transition: 'all 0.3s ease',
                flex: '1 1 300px',
                maxWidth: '400px'
              }}>
                <h4 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '20px', fontWeight: '800' }}>{h.title}</h4>
                <div style={{ width: '40px', height: '1px', background: 'var(--primary)', marginBottom: '20px' }}></div>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', fontSize: '1rem' }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: AMENITIES GRID */}
      <section style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h3 style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>World-Class <span style={{ color: 'var(--primary)' }}>Amenities</span></h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '20px' }}>Designed to provide an unmatched lifestyle of comfort and sophistication.</p>
          </div>
          <div className="amenities-grid-luxury" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
            {amenities.map((a, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '30px 20px', background: 'rgba(195, 157, 99, 0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ background: 'rgba(195, 157, 99, 0.1)', padding: '15px', borderRadius: '50%' }}>
                    {a.icon}
                  </div>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '10px', lineHeight: '1.2' }}>{a.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', lineHeight: '1.4' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section style={{ padding: '100px 0 150px' }}>
        <div className="container">
          <div className="glass" style={{ 
            padding: '100px 60px', 
            borderRadius: '40px', 
            border: '2px solid rgba(195, 157, 99, 0.3)', 
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(195, 157, 99, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Crown size={60} color="var(--primary)" style={{ marginBottom: '30px' }} />
              <h2 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '30px', fontFamily: 'Outfit, sans-serif' }}>Experience the Peak</h2>
              <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto 50px' }}>
                Join the most exclusive residential registry in Mumbai. Book your private viewing session today.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                <button className="btn btn-primary" style={{ padding: '22px 60px', fontSize: '1.2rem', fontWeight: '800', borderRadius: '50px' }}>
                  CONNECT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 100 }}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(195, 157, 99, 0.4)', cursor: 'pointer' }}
        >
          <TrendingUp size={24} style={{ transform: 'rotate(-45deg)' }} />
        </button>
      </div>

      <style>{`
        .hover-glow:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(195, 157, 99, 0.1);
          border-color: var(--primary) !important;
        }
        @media (max-width: 1200px) {
           .amenities-grid-luxury { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
           .amenities-grid-luxury { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
           .amenities-grid-luxury { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
