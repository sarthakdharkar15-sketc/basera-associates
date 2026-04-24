import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  ArrowUpDown, 
  Car, 
  MapPin, 
  TrendingUp, 
  Building, 
  CircleDollarSign,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const SarafaCommercial = ({ customTitle, customSubtitle, customImage, onToggleBrochure }) => {
  return (
    <section id="sarafa-bazaar" className="sarafa-section scroll-reveal" style={{ 
      background: 'linear-gradient(180deg, #0a0a0a 0%, #0f1115 100%)',
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Glows */}
      <div style={{ 
        position: 'absolute', 
        top: '20%', 
        left: '-10%', 
        width: '500px', 
        height: '500px', 
        background: 'rgba(195, 157, 99, 0.05)', 
        borderRadius: '50%', 
        filter: 'blur(120px)',
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', 
          gap: '80px', 
          alignItems: 'center' 
        }} className="sarafa-grid">
          
          {/* Left Content */}
          <div className="sarafa-content">
            <div className="section-decorator" style={{ justifyContent: 'flex-start', marginBottom: '24px' }}>
              <Sparkles color="#c39d63" size={20} />
              <div style={{ width: '40px', height: '1px', background: '#c39d63' }}></div>
              <span style={{ 
                fontSize: '0.85rem', 
                fontWeight: 800, 
                letterSpacing: '4px', 
                color: '#c39d63', 
                textTransform: 'uppercase' 
              }}>Upcoming Project</span>
            </div>

            <h2 className="premium-title" style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', 
              lineHeight: 1.1, 
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #c39d63 0%, #e8c695 50%, #c39d63 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900
            }}>
              {customTitle || (
                <>
                  Jagdish Bhawan:<br/>
                  <span style={{ display: 'block', marginTop: '10px' }}>Indore's Next Commercial Icon</span>
                </>
              )}
            </h2>

            <p style={{ 
              fontSize: '1.2rem', 
              color: 'rgba(255,255,255,0.7)', 
              lineHeight: 1.6, 
              marginBottom: '40px',
              maxWidth: '600px'
            }}>
              {customSubtitle || (
                <>
                  Located right beside the iconic <span style={{ color: '#c39d63', fontWeight: 700 }}>Rajhans Dal Bafla</span>, <span style={{ color: '#c39d63', fontWeight: 700 }}>Jagdish Bhawan</span> sits in the heart of Sarafa Bazaar. A perfect synergy of architectural heritage and 21st-century commerce.
                </>
              )}
            </p>

            {/* Highlights Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '24px', 
              marginBottom: '50px' 
            }} className="highlights-grid">
              {[
                { icon: <MapPin size={18} />, text: "Prime Sarafa Bazaar Corner" },
                { icon: <TrendingUp size={18} />, text: "Indore's Highest Footfall Area" },
                { icon: <Building size={18} />, text: "Premium Retail & Showrooms" },
                { icon: <CircleDollarSign size={18} />, text: "Unmatched ROI Potential" }
              ].map((item, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 500
                }}>
                  <div style={{ color: '#c39d63', display: 'flex' }}>{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Amenities Section */}
            <div className="glass-premium" style={{ 
              padding: '30px', 
              borderRadius: '24px', 
              border: '1px solid rgba(195, 157, 99, 0.1)',
              marginBottom: '50px'
            }}>
              <p style={{ 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                letterSpacing: '2px', 
                textTransform: 'uppercase', 
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '20px'
              }}>World Class Facilities</p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '20px' 
              }} className="amenities-grid">
                {[
                  { icon: <ShieldCheck size={24} />, label: "Secured V-Link" },
                  { icon: <Zap size={24} />, label: "Power Grid" },
                  { icon: <ArrowUpDown size={24} />, label: "High-Speed Lift" },
                  { icon: <Car size={24} />, label: "Smart Parking" }
                ].map((amenity, i) => (
                  <div key={i} style={{ 
                    textAlign: 'center',
                    transition: 'transform 0.3s ease'
                  }} className="amenity-item">
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      background: 'rgba(255,255,255,0.03)', 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#c39d63',
                      margin: '0 auto 10px',
                      border: '1px solid rgba(195,157,99,0.1)'
                    }}>
                      {amenity.icon}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }} className="cta-flex">
              <button 
                onClick={onToggleBrochure}
                className="btn btn-primary" 
                style={{ 
                  padding: '16px 40px', 
                  borderRadius: '100px', 
                  fontSize: '1rem', 
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 10px 30px rgba(195, 157, 99, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                Get Early Access <ArrowRight size={18} />
              </button>
              <button 
                onClick={onToggleBrochure}
                className="btn" 
                style={{ 
                  padding: '15px 38px', 
                  borderRadius: '100px', 
                  fontSize: '1rem', 
                  fontWeight: 700,
                  background: 'transparent',
                  border: '1px solid rgba(195, 157, 99, 0.4)',
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(195, 157, 99, 0.1)';
                  e.currentTarget.style.borderColor = '#c39d63';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(195, 157, 99, 0.4)';
                }}
              >
                Book Site Visit
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="sarafa-image-container" style={{ position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              top: '-20px', 
              right: '-20px', 
              width: '100px', 
              height: '100px', 
              borderTop: '2px solid #c39d63', 
              borderRight: '2px solid #c39d63',
              zIndex: 1
            }}></div>
            <div style={{ 
              position: 'absolute', 
              bottom: '-20px', 
              left: '-20px', 
              width: '100px', 
              height: '100px', 
              borderBottom: '2px solid #c39d63', 
              borderLeft: '2px solid #c39d63',
              zIndex: 1
            }}></div>
            
            <div className="glass-premium" style={{ 
              borderRadius: '40px', 
              padding: '10px', 
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
            }}>
              <img 
                src={customImage || "/jagdish_bhawan_user.jpg"} 
                alt="Jagdish Bhawan Commercial Project" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '30px',
                  display: 'block',
                  transition: 'transform 0.8s'
                }} 
                className="building-img"
              />
            </div>

            </div>

        </div>
      </div>

      <style>{`
        .building-img:hover {
          transform: scale(1.05);
        }
        .amenity-item:hover {
          transform: translateY(-5px);
        }
        .amenity-item:hover .amenity-item > div {
          background: rgba(195, 157, 99, 0.1) !important;
          border-color: #c39d63 !important;
        }
        @media (max-width: 992px) {
          .sarafa-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
          }
          .sarafa-content .section-decorator {
            justify-content: center !important;
          }
          .highlights-grid {
            justify-items: center;
          }
          .cta-flex {
            justify-content: center;
            flex-direction: column;
          }
          .cta-flex button {
            width: 100%;
          }
        }
        @media (max-width: 576px) {
          .amenities-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SarafaCommercial;
