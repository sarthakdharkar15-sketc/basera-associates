import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const LuxuryCollection = () => {
  const collection = [
    {
      title: "The Sky Villa",
      location: "Worli, Mumbai",
      image: "/luxury-penthouse.png",
      tag: "Limited Offering",
      description: "A breathtaking penthouse designed for those who live above the ordinary.",
      link: "/project/69d0f84399328f72852f08f2"
    },
    {
      title: "Azure Waterfront",
      location: "Alibaug Coast",
      image: "/luxury-waterfront.png",
      tag: "Resort Living",
      description: "Experience the tranquility of the ocean with our bespoke coastal mansions.",
      link: "/project/69d0f84399328f72852f08f2"
    }
  ];

  return (
    <section id="luxury-collection" style={{ 
      padding: '100px 0', 
      backgroundColor: '#0a0c10', 
      color: '#fff',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <div style={{ 
            color: '#c39d63', 
            fontSize: '0.9rem', 
            letterSpacing: '5px', 
            textTransform: 'uppercase', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px'
          }}>
            <span style={{ width: '40px', height: '1px', background: '#c39d63' }}></span>
            Exquisite Selection
            <span style={{ width: '40px', height: '1px', background: '#c39d63' }}></span>
          </div>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontFamily: '"Playfair Display", serif', 
            fontWeight: '400',
            letterSpacing: '2px'
          }}>
            The Luxury <span style={{ fontStyle: 'italic', color: '#c39d63' }}>Collection</span>
          </h2>
        </div>

        {/* Collection Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
          gap: '60px' 
        }}>
          {collection.map((item, index) => (
            <div key={index} className="luxury-card" style={{
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
              cursor: 'pointer',
              height: '600px',
              animation: `revealCard 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s forwards`,
              opacity: 0,
              transform: 'translateY(40px)'
            }}>
              
              {/* Image Container */}
              <div className="img-wrapper" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: 1
              }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Dark Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(10,12,16,0.95) 0%, rgba(10,12,16,0.2) 60%, transparent 100%)',
                  zIndex: 2
                }}></div>
              </div>

              {/* Tag */}
              <div style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                background: 'rgba(195, 157, 99, 0.9)',
                color: '#000',
                padding: '6px 15px',
                fontSize: '0.75rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                zIndex: 10,
                backdropFilter: 'blur(5px)'
              }}>
                {item.tag}
              </div>

              {/* Content */}
              <Link to={item.link} className="luxury-card-content" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '50px',
                zIndex: 10,
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                textDecoration: 'none',
                color: 'inherit'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  color: '#c39d63', 
                  fontSize: '0.8rem', 
                  marginBottom: '15px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}>
                  <Star size={14} fill="#c39d63" /> {item.location}
                </div>
                <h3 style={{ 
                  fontSize: '2.5rem', 
                  fontFamily: '"Playfair Display", serif', 
                  marginBottom: '15px',
                  fontWeight: '400'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  maxWidth: '350px', 
                  lineHeight: '1.6',
                  fontSize: '1rem',
                  marginBottom: '30px',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'all 0.5s ease 0.2s'
                }} className="card-desc">
                  {item.description}
                </p>
                <div className="explore-btn" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  fontSize: '0.9rem', 
                  fontWeight: '600', 
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#fff',
                  transition: 'gap 0.3s ease'
                }}>
                  Discover <ArrowRight size={18} />
                </div>
              </Link>

              {/* Border Glow on Hover */}
              <div className="card-border" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: '1px solid rgba(195, 157, 99, 0)',
                transition: 'all 0.5s ease',
                zIndex: 15,
                pointerEvents: 'none'
              }}></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes revealCard {
          to { opacity: 1; transform: translateY(0); }
        }

        .luxury-card:hover .img-wrapper {
          transform: scale(1.08);
        }

        .luxury-card:hover .card-desc {
          opacity: 1;
          transform: translateY(0);
        }

        .luxury-card:hover .explore-btn {
          gap: 20px;
          color: #c39d63;
        }

        .luxury-card:hover .card-border {
          border-color: rgba(195, 157, 99, 0.4);
          inset: 15px;
        }

        @media (max-width: 768px) {
          .luxury-card {
            height: 450px;
            min-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LuxuryCollection;
