import React, { useEffect, useState, useRef } from 'react';
import { Trophy, Award, Building, Star } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import achievementImage from '../assets/achievement.jpg';
import journeyBg from '../assets/partnership_growth.png';

function ExtraOrdinaryMoment() {
  const achievements = [
    { icon: <Trophy size={40} />, title: "Best Real Estate Agency 2023" },
    { icon: <Award size={40} />, title: "ISO Certified Company" },
    { icon: <Building size={40} />, title: "150+ Projects Delivered" },
    { icon: <Star size={40} />, title: "Top Rated in Indore" },
  ];

  const milestones = [
    { year: "2005", title: "Company Founded", desc: "Laid the foundation for a premier real estate venture with a unified vision." },
    { year: "2018", title: "100+ Happy Clients", desc: "Reached our first major milestone of deeply satisfied homeowners within a short span." },
    { year: "2023", title: "Awarded Best Real Estate Agency", desc: "Recognized for our unwavering commitment to quality, trust, and premium spaces." },
    { year: "2024", title: "Expanded to Multiple Locations", desc: "Broadening our horizons to serve more communities and shape futuristic cityscapes." }
  ];

  // For timeline scroll animation
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10);
          setVisibleItems(prev => prev.includes(index) ? prev : [...prev, index]);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

    const items = document.querySelectorAll('.timeline-item-anim');
    items.forEach(item => observer.observe(item));

    return () => {
      items.forEach(item => observer.unobserve(item));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="animate-fade-in" style={{ minHeight: '80vh', paddingBottom: '60px' }}>
      <section className="hero" style={{ 
        textAlign: 'center', 
        padding: '120px 20px 80px 20px',
        background: 'linear-gradient(to bottom, #1a1d24 0%, #0f1115 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Decorative Element */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(195, 157, 99, 0.05) 0%, transparent 70%)',
          zIndex: 0
        }}></div>

        <div className="container animate-slide-up" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            fontWeight: 800, 
            lineHeight: 1,
            marginBottom: '10px',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            letterSpacing: '-1px'
          }}>
            Extra Ordinary
          </h1>
          <h1 style={{ 
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            fontWeight: 800, 
            color: 'var(--primary)', 
            lineHeight: 1,
            fontStyle: 'italic',
            textShadow: '0 10px 30px rgba(195, 157, 99, 0.2)'
          }}>
            Moments
          </h1>
          <p style={{ 
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 400, 
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            marginTop: '30px', 
            maxWidth: '600px', 
            marginLeft: 'auto', 
            marginRight: 'auto',
            letterSpacing: '1px',
            opacity: 0.8
          }}>
            Celebrating our milestones and recognitions in the industry.
          </p>
        </div>
      </section>

      {/* Achievement Cards Section */}
      <section className="container mt-5 mb-5">
        <div 
          className="achievements-grid animate-slide-up" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '25px',
            animationDelay: '0.2s',
            marginTop: '40px'
          }}
        >
          {achievements.map((item, idx) => (
            <div 
              key={idx}
              className="achievement-card glass"
              style={{
                background: 'linear-gradient(145deg, #181c25 0%, #0a0c10 100%)',
                border: '1px solid rgba(195, 157, 99, 0.2)',
                borderRadius: '16px',
                padding: '40px 20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(195, 157, 99, 0.15)';
                e.currentTarget.style.border = '1px solid rgba(195, 157, 99, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                e.currentTarget.style.border = '1px solid rgba(195, 157, 99, 0.2)';
              }}
            >
              <div style={{ 
                color: 'var(--primary)', 
                marginBottom: '20px',
                background: 'rgba(195, 157, 99, 0.1)',
                padding: '16px',
                borderRadius: '50%',
                display: 'inline-flex'
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '500', color: '#f5f6fa', fontFamily: '"Outfit", sans-serif', margin: 0, lineHeight: '1.4', letterSpacing: '0.5px' }}>
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section 
        className="timeline-section" 
        ref={timelineRef} 
        style={{ 
          paddingTop: '100px', 
          paddingBottom: '100px',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `url(${journeyBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed' // Parallax effect
        }}
      >
        {/* Top Fade */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, #0f1115, transparent)',
          zIndex: 1
        }}></div>

        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, #0f1115b3, #0f1115e6)',
          zIndex: 0
        }}></div>

        {/* Bottom Fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to top, #0f1115, transparent)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: 'var(--primary)', 
            marginBottom: '80px', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontFamily: '"Playfair Display", serif', 
            fontWeight: 800,
            textShadow: '0 4px 10px rgba(0,0,0,0.5)'
          }}>
            Our Journey
          </h2>
        
        <div className="timeline-container" style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          {/* Vertical Line */}
          <div className="timeline-line"></div>

          {milestones.map((milestone, idx) => {
            const isVisible = visibleItems.includes(idx);
            return (
              <div 
                key={idx} 
                className={`timeline-item timeline-item-anim ${isVisible ? 'visible' : ''}`}
                data-index={idx}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '80px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? 'translateX(0) scale(1)' 
                    : `${idx % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)'} scale(0.9)`,
                  transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transitionDelay: `${idx * 0.1}s`
                }}
              >
                {/* Dot */}
                <div 
                  className="timeline-dot"
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: isVisible ? 'var(--primary)' : '#111318',
                    border: isVisible ? '4px solid rgba(195, 157, 99, 0.4)' : '2px solid rgba(255,255,255,0.3)',
                    zIndex: 1,
                    transform: isVisible ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.5)',
                    boxShadow: isVisible ? '0 0 30px var(--primary)' : 'none'
                  }}>
                    {isVisible && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40px',
                        height: '40px',
                        border: '2px solid var(--primary)',
                        borderRadius: '50%',
                        animation: 'pulse-glow 2s infinite',
                        pointerEvents: 'none'
                      }}></div>
                    )}
                  </div>

                {/* Content */}
                <div 
                  className="timeline-content glass"
                  style={{
                    padding: '30px',
                    borderRadius: '16px',
                    border: isVisible ? '1px solid rgba(195, 157, 99, 0.3)' : '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.5s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(195, 157, 99, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(195, 157, 99, 0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                    e.currentTarget.style.borderColor = isVisible ? 'rgba(195, 157, 99, 0.3)' : 'rgba(255,255,255,0.1)';
                  }}
                >
                  <h3 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '10px', fontFamily: 'Outfit, sans-serif' }}>
                    {milestone.year}
                  </h3>
                  <h4 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '12px', fontWeight: '600' }}>
                    {milestone.title}
                  </h4>
                  {milestone.desc && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                      {milestone.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

      {/* Existing Event Section */}
      <section className="container mt-5 mb-5" style={{ paddingTop: '20px' }}>
        <div className="glass animate-slide-up" style={{ padding: '40px', textAlign: 'center', maxWidth: '900px', margin: '0 auto', border: '1px solid rgba(195, 157, 99, 0.15)' }}>
          <img 
            src={achievementImage} 
            alt="Achievement Celebration" 
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '30px', border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <h2 style={{ color: 'var(--primary)', marginBottom: '15px', fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: '"Playfair Display", serif', fontWeight: 800 }}>Felicitation of Young Achievers</h2>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '15px', fontSize: '1.2rem', fontWeight: '400', fontFamily: '"Outfit", sans-serif', letterSpacing: '1px' }}>@ ACE REFLECT INDORE EXPO @ace.reflect</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            We are honored to receive this recognition, continuing our committed journey towards excellence in real estate and architecture.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      <style>
        {`
          .timeline-line {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            width: 2px;
            background: rgba(195,157,99,0.1);
            transform: translateX(-50%);
            z-index: 0;
          }
          .timeline-line::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, transparent, var(--primary), transparent);
            background-size: 100% 200%;
            animation: move-gradient 5s linear infinite;
          }
          @keyframes move-gradient {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 200%; }
          }
          @keyframes pulse-glow {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
          }
          .timeline-dot {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          
          @media (min-width: 769px) {
            .timeline-item:nth-child(odd) .timeline-content {
              width: calc(50% - 50px);
              margin-right: calc(50% + 50px);
              margin-left: 0;
              text-align: right;
            }
            .timeline-item:nth-child(even) .timeline-content {
              width: calc(50% - 50px);
              margin-left: calc(50% + 50px);
              margin-right: 0;
              text-align: left;
            }
          }

          @media (max-width: 768px) {
            .timeline-line {
              left: 30px;
            }
            .timeline-dot {
              left: 30px;
            }
            .timeline-content {
              width: calc(100% - 70px) !important;
              margin-left: 70px !important;
              margin-right: 0 !important;
              text-align: left !important;
            }
            .achievements-grid {
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ExtraOrdinaryMoment;
