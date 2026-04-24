import React, { useState, useEffect } from 'react';
import { MapPin, Waves, CheckCircle, TrendingUp, Gem, Palmtree, ArrowRight, Sparkles, Anchor, ChevronDown, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CoastalVillas() {
  const [isVisible, setIsVisible] = useState(false);
  const [villas, setVillas] = useState([]);
  const [filteredVillas, setFilteredVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [cityFilter, setCityFilter] = useState('All Cities');
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById('coastal-luxury-section');
    if (element) observer.observe(element);

    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const coastal = data.filter(p => p.type?.toLowerCase() === 'coastal');
        setVillas(coastal);
        setFilteredVillas(coastal);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (cityFilter === 'All Cities') {
      setFilteredVillas(villas);
    } else {
      setFilteredVillas(villas.filter(v => v.city === cityFilter));
    }
  }, [cityFilter, villas]);

  const highlights = [
    { icon: <Palmtree size={20} />, text: "Beachfront Living" },
    { icon: <TrendingUp size={20} />, text: "High ROI Investment" },
    { icon: <MapPin size={20} />, text: "Premium Locations" },
    { icon: <Gem size={20} />, text: "Luxury Lifestyle" }
  ];

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr*`;
    return `₹${price.toLocaleString()}`;
  };

  const displayedVillas = showAll ? filteredVillas : filteredVillas.slice(0, 8);

  return (
    <section id="coastal-luxury-section" style={{
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden',
      color: '#fff',
      marginTop: '-2px',
      minHeight: '800px',
      background: '#0a192f'
    }}>
      {/* Cinematic Background Video */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          key="coastal-bg-video"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, backgroundColor: '#0a192f' }}
        >
          <source src="https://player.vimeo.com/external/494163960.sd.mp4?s=3d2c88f1722881f18536cc36709848f0&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        {/* Gradient Overlays for smooth blending */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '30%', background: 'linear-gradient(to bottom, #1a1d24, transparent)' }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '30%', background: 'linear-gradient(to top, #1a1405, transparent)' }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(10, 25, 47, 0.6)' }}></div>
      </div>

      {/* Tropical Background Elements */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(195, 157, 99, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header content */}
        <div style={{ textAlign: 'center', marginBottom: '80px', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(195, 157, 99, 0.15)', padding: '8px 24px', borderRadius: '100px', color: '#c39d63', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '25px', border: '1px solid rgba(195, 157, 99, 0.3)' }}>
            <Anchor size={16} /> Tropical Paradise
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontFamily: '"Playfair Display", serif', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1', background: 'linear-gradient(to right, #fff 30%, #c39d63 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Coastal Luxury Villas <br /> in <span style={{ fontStyle: 'italic', fontWeight: '300' }}>Mumbai & Goa</span>
          </h2>
          
          {/* Dropdown Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <div className="filter-dropdown-container glass-premium" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 25px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Filter size={18} color="#c39d63" />
              <select 
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', outline: 'none' }}
              >
                <option style={{ background: '#0a192f' }} value="All Cities">Show All Cities</option>
                <option style={{ background: '#0a192f' }} value="Mumbai">Mumbai Collection</option>
                <option style={{ background: '#0a192f' }} value="Goa">Goa Collection</option>
              </select>
              <ChevronDown size={14} color="rgba(255,255,255,0.5)" />
            </div>
          </div>
        </div>

        {/* Feature Highlights Overlay */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '80px', opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}>
          {highlights.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#c39d63', display: 'flex' }}><CheckCircle size={18} /></div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>{h.text}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Grid - Optimized for 4 in a row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
          gap: '20px', 
          transition: 'all 0.5s ease' 
        }}>
          {displayedVillas.map((villa, idx) => (
            <div key={idx} className="villa-card-premium glass-premium" onClick={() => navigate(`/project/${villa._id}`)} style={{ cursor: 'pointer', borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                <img src={villa.images?.[0] || `https://images.unsplash.com/photo-${['1507525428034-b723cf961d3e', '1499793983690-e29da59ef1c2', '1520250497591-112f2f40a3f4', '1476514525535-07fb3b4ae5f1'][idx % 4]}?q=80&w=2073`} alt={villa.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s ease' }} className="villa-card-img" />
                <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {villa.city?.toUpperCase()}
                  </div>
                  {villa.isFeatured && (
                    <div style={{ background: 'rgba(195,157,99,0.9)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800', color: '#000' }}>
                      FEATURED
                    </div>
                  )}
                </div>
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
              </div>
              <div style={{ padding: '25px', position: 'relative' }}>
                <h4 style={{ fontSize: '1.4rem', fontFamily: '"Playfair Display", serif', marginBottom: '8px', color: '#fff' }}>{villa.title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '20px' }}>
                  <MapPin size={14} color="#c39d63" /> {villa.location}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', fontWeight: '900', color: '#c39d63', letterSpacing: '2px', display: 'block', marginBottom: '4px' }}>INVESTMENT</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>{formatPrice(villa.price)}</span>
                  </div>
                  <div className="explore-circle">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {filteredVillas.length > 8 && !showAll && (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button 
              className="btn-explore-more glass-premium" 
              onClick={() => setShowAll(true)}
              style={{
                background: 'rgba(195, 157, 99, 0.1)',
                border: '1px solid #c39d63',
                color: '#c39d63',
                padding: '16px 40px',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: '700',
                letterSpacing: '2px',
                cursor: 'pointer',
                transition: 'all 0.4s',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              View All Coastal Properties <ChevronDown size={20} />
            </button>
          </div>
        )}



        {/* Killer Line */}
        <div style={{ 
          marginTop: '100px', 
          textAlign: 'center', 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '60px',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease 0.8s'
        }}>
          <p style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
            color: '#fff', 
            fontWeight: '700', 
            fontStyle: 'normal', 
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Own a home where <span style={{ color: '#c39d63', fontWeight: '900' }}>every day</span> feels like a vacation.
          </p>
        </div>

      </div>

      <style>{`
        .villa-card-premium:hover { transform: translateY(-12px); border-color: rgba(195,157,99,0.4); }
        .villa-card-premium:hover .villa-card-img { transform: scale(1.1); }
        
        .explore-circle {
          width: 48px; height: 48px; border-radius: 50%; background: rgba(195,157,99,0.1);
          border: 1px solid rgba(195,157,99,0.2); display: flex; alignItems: center; justifyContent: center;
          color: #c39d63; transition: all 0.4s;
        }
        .villa-card-premium:hover .explore-circle {
          background: #c39d63; color: #000; transform: rotate(-45deg);
        }

        .btn-explore-more:hover {
          background: var(--primary);
          color: #000;
          box-shadow: 0 15px 30px rgba(195, 157, 99, 0.3);
        }
        
        select option { background: #1a1d24; color: #fff; }
      `}</style>
    </section>
  );
}
