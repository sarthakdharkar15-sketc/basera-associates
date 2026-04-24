import React from 'react';
import { 
  Building, 
  Landmark, 
  Castle, 
  Info, 
  Crown, 
  MapPin, 
  TrendingUp, 
  Layers, 
  UserCheck, 
  Droplet, 
  Star, 
  ParkingCircle, 
  Smartphone, 
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function UpcomingCollaborations() {
  const futurePartners = [
    { name: "DLF Limited", image: "/logos/dlf_new.png" },
    { name: "Lodha Group", image: "/logos/lodha.png" },
    { name: "Godrej Properties", image: "/logos/godrej_new.png" },
    { name: "Oberoi Realty", image: "/logos/oberoi_preferred.png" },
    { name: "Larsen & Toubro Limited (L&T)", image: "/logos/lnt_final.png" },
    { name: "Sobha Reality", image: "/logos/sobha.png" },
    { name: "Mahindra Lifespace", image: "/logos/mahindra.png" },
    { name: "Kalpataru", image: "/logos/kalptaru.png" },
    { name: "Hiranandani Group", image: "/logos/hiranandani.png" },
    { name: "The Phoenix Mills Limited (PML)", image: "/logos/phoenix.png" },
    { name: "Kohinoor Group", image: "/logos/kohinoor.png" },
    { name: "Nyati Group", image: "/logos/nyati.png" },
    { name: "Kolte Patil Developers", image: "/logos/patil.png" }
  ];

  const scrollItems = [...futurePartners, ...futurePartners];

  return (
    <div id="strategic-collaboration" className="upcoming-collabs-section animate-slide-up" style={{ padding: '80px 0', overflow: 'hidden', background: '#0a0a0a' }}>
      
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '15px' }}>
            Collaborations
          </h2>
          <p style={{ color: '#fff', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 10px', fontWeight: '500' }}>
            We are actively collaborating with some of India's leading real estate developers.
          </p>
        </div>
      </div>

      {/* Marquee Container with Faded Edges */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}>
        
        {/* Row 1 Marquee */}
        <div className="marquee-outer" style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '15px 0' }}>
          <div className="marquee-track row-1-track" style={{ 
            display: 'flex', 
            width: 'max-content',
            gap: '40px'
          }}>
            {scrollItems.map((partner, idx) => (
              <div 
                key={`row1-${idx}`}
                className="partner-card-horizontal"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(195, 157, 99, 0.1)',
                  borderRadius: '16px',
                  padding: '15px 30px',
                  textAlign: 'center',
                  minWidth: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  transition: 'all 0.4s ease'
                }}
              >
                <div style={{
                  width: '65px',
                  height: '65px',
                  background: '#000',
                  borderRadius: '50%',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                </div>
                <h3 style={{ fontSize: '0.95rem', color: '#fff', fontWeight: '600', margin: 0, whiteSpace: 'nowrap' }}>
                  {partner.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Marquee - Opposite direction */}
        <div className="marquee-outer" style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '15px 0' }}>
          <div className="marquee-track row-2-track" style={{ 
            display: 'flex', 
            width: 'max-content',
            gap: '40px'
          }}>
            {scrollItems.map((partner, idx) => (
              <div 
                key={`row2-${idx}`}
                className="partner-card-horizontal"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(195, 157, 99, 0.1)',
                  borderRadius: '16px',
                  padding: '15px 30px',
                  textAlign: 'center',
                  minWidth: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  transition: 'all 0.4s ease'
                }}
              >
                <div style={{
                  width: '65px',
                  height: '65px',
                  background: '#000',
                  borderRadius: '50%',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                </div>
                <h3 style={{ fontSize: '0.95rem', color: '#fff', fontWeight: '600', margin: 0, whiteSpace: 'nowrap' }}>
                  {partner.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>


      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 15px)); }
          }

          @keyframes scroll-right {
            0% { transform: translateX(calc(-50% - 15px)); }
            100% { transform: translateX(0); }
          }
          
          .row-1-track {
            animation: scroll-left 40s linear infinite;
          }

          .row-2-track {
            animation: scroll-right 45s linear infinite;
          }

          .marquee-outer {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .marquee-outer:hover {
            transform: scale(1.02);
            z-index: 10;
          }

          .marquee-track {
            transition: filter 0.5s ease;
          }

          .partner-card-horizontal {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .partner-card-horizontal:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            border-color: var(--primary) !important;
            transform: scale(1.05) translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.4) !important;
          }

          @media (max-width: 992px) {
            .altamount-grid {
              grid-template-columns: 1fr !important;
              padding: 40px !important;
              gap: 40px !important;
            }
            .altamount-grid h2 {
              font-size: 3rem !important;
            }
          }
          @media (max-width: 768px) {
             #strategic-collaboration {
                padding: 40px 15px !important;
             }
          }
        `}
      </style>
    </div>
  );
}
