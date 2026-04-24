import React from 'react';
import { Home, Building, PenTool, Map } from 'lucide-react';

export default function TopArchitects() {
  const cards = [
    {
      icon: <Home size={40} />,
      title: "Luxury Residential Design Experts",
      desc: "Crafting bespoke living spaces that blend modern aesthetics with unparalleled comfort."
    },
    {
      icon: <Building size={40} />,
      title: "Commercial Space Specialists",
      desc: "Designing innovative workspaces optimized for productivity and professional excellence."
    },
    {
      icon: <PenTool size={40} />,
      title: "Modern Architecture Partners",
      desc: "Pushing the boundaries of structural design using cutting-edge techniques and materials."
    },
    {
      icon: <Map size={40} />,
      title: "Urban Planning Experts",
      desc: "Creating sustainable blueprints that integrate seamlessly into growing cityscapes."
    }
  ];

  return (
    <div className="top-architects animate-slide-up" style={{ padding: '60px 0', animationDelay: '0.2s' }}>
      <div className="container">
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '15px' }}>
            Collaborated with India's Top Architects
          </h2>
          <p style={{ color: '#fff', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 15px auto', fontWeight: '500' }}>
            We work with leading architectural experts to deliver world-class real estate projects.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
            "Partnering with top architects ensures quality, innovation, and excellence in every project."
          </p>
        </div>

        {/* Architect Highlight Cards */}
        <div 
          className="architects-grid"
          style={{
            display: 'grid',
            gap: '30px'
          }}
        >
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className="architect-card glass"
              style={{
                background: 'linear-gradient(145deg, #181c25 0%, #0a0c10 100%)',
                border: '1px solid rgba(195, 157, 99, 0.15)',
                borderRadius: '20px',
                padding: '40px 25px',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                transition: 'all 0.5s var(--apple-spring)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'default'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.borderColor = 'rgba(195, 157, 99, 0.5)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(195, 157, 99, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(195, 157, 99, 0.15)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
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
                {card.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontFamily: 'Outfit, sans-serif', fontWeight: '600' }}>
                {card.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        <style>
          {`
            /* CSS Grid Responsiveness: forces 4 cards on desktop, 2 on tablet, 1 on mobile */
            .architects-grid {
              grid-template-columns: repeat(4, 1fr);
            }
            
            @media (max-width: 1024px) {
              .architects-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            
            @media (max-width: 600px) {
              .architects-grid {
                grid-template-columns: 1fr;
              }
            }
          `}
        </style>

      </div>
    </div>
  );
}
