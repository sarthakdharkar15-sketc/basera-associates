import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Building2, Flame, RotateCcw, Eye, MessageSquare, TrendingUp, Handshake, CheckCircle, Bell, ChevronDown } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import QuickStats from '../components/QuickStats';
import ExploreMap from '../components/ExploreMap';
import BeforeAfter from '../components/BeforeAfter';
import Newsletter from '../components/Newsletter';
import UpcomingCollaborations from '../components/UpcomingCollaborations';
import ContactCards from '../components/ContactCards';
import FeaturedNews from '../components/FeaturedNews';
import PropertyAlert from '../components/PropertyAlert';
import InvestmentClub from '../components/InvestmentClub';
import PartnerSection from '../components/PartnerSection';
import TopArchitects from '../components/TopArchitects';
import CoastalVillas from '../components/CoastalVillas';
import MumbaiTowerSection from '../components/MumbaiTowerSection';
import MumbaiExpansion from '../components/MumbaiExpansion';

const urgencyLabels = [
  { text: 'Only 1 unit left', icon: <Flame size={14} />, color: '#ef4444' },
  { text: 'High Demand', icon: <TrendingUp size={14} />, color: '#f97316' },
  { text: 'Hot Deal', icon: <Flame size={14} />, color: '#ef4444' },
  { text: 'Price Drop', icon: <TrendingUp size={14} />, color: '#22c55e' },
  { text: 'Selling Fast', icon: <RotateCcw size={14} />, color: '#f97316' }
];

function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [visionExpanded, setVisionExpanded] = useState(false);

  // Helper to format price in Indian units (Lakh/Cr)
  const formatIndianPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(2)} Lakh`;
    return price.toLocaleString('en-IN');
  };


  const [activityData, setActivityData] = useState({});

  useEffect(() => {
    // Fetch projects from our backend
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        
        // Initialize randomized activity data
        const initialActivity = {};
        data.forEach(p => {
          initialActivity[p._id] = {
            viewers: Math.floor(Math.random() * 20) + 5,
            contacts: Math.floor(Math.random() * 8) + 1,
            urgencyIndex: Math.floor(Math.random() * urgencyLabels.length)
          };
        });
        setActivityData(initialActivity);
      })
      .catch(err => console.error("Error fetching projects:", err));

    // Dynamic update effect for realism
    const interval = setInterval(() => {
      setActivityData(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(id => {
          if (Math.random() > 0.7) {
            next[id].viewers += Math.random() > 0.5 ? 1 : -1;
            if (next[id].viewers < 5) next[id].viewers = 5;
          }
        });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = (e, projectId) => {
    e.preventDefault();
    fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId })
    }).then(res => res.json())
      .then(data => alert(data.message));
  };

  const filteredProjects = projects.filter(p => {
    // Exclude Coastal properties from the main list as they have their own dedicated section
    const isCoastal = p.type?.toLowerCase() === 'coastal';
    if (isCoastal) return false;
    
    return filter === 'All' || p.type === filter;
  });

  // Sort: Featured first, then by date (implied by API order)
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });

  const displayedProjects = showAll ? sortedProjects : sortedProjects.slice(0, 15);

  return (
    <div className="home-page animate-fade-in">
      <section className="hero" style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px',
        overflow: 'hidden'
      }}>
        {/* Background Image with Dark Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll', // 'fixed' can be slow on mobile
          zIndex: -2
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(10, 11, 14, 0.3) 0%, rgba(10, 11, 14, 0.8) 60%, var(--bg-dark) 100%)',
          zIndex: -1
        }}></div>

        <div className="container animate-slide-up" style={{ zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', textShadow: '0 4px 10px rgba(0,0,0,0.8)', marginBottom: '20px', color: '#ffffff', lineHeight: 1.2, maxWidth: '900px' }}>
            Find Your Dream Home with <span style={{ color: 'var(--primary)' }}>Basera Associates</span>
          </h1>
          <p style={{ fontWeight: 500, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', textShadow: '0 2px 5px rgba(0,0,0,0.8)', marginBottom: '40px', color: '#eaeaea', maxWidth: '800px', lineHeight: 1.6 }}>
            Discover premium properties tailored to your lifestyle and investment goals.
          </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px' }}>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary btn-animated" style={{ padding: '16px 40px', fontSize: '1.2rem', fontWeight: '600', boxShadow: '0 0 20px rgba(195, 157, 99, 0.4)', borderRadius: '30px', animation: 'pulse-button 3s infinite' }}>
                Explore Properties
              </button>
              <Link to="/coastal-villas" className="btn btn-primary btn-animated" style={{ padding: '16px 40px', fontSize: '1.2rem', fontWeight: '600', borderRadius: '30px', boxShadow: '0 0 20px rgba(195, 157, 99, 0.4)', animation: 'pulse-button 3s infinite', textDecoration: 'none' }}>
                Exclusive Coastal Collection
              </Link>
              <Link to="/portfolio" className="btn btn-primary btn-animated" style={{ 
                padding: '16px 40px', 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                borderRadius: '30px', 
                boxShadow: '0 0 20px rgba(195, 157, 99, 0.4)',
                animation: 'pulse-button 3s infinite',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Portfolio
              </Link>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary btn-animated" style={{ padding: '16px 40px', fontSize: '1.2rem', fontWeight: '600', borderRadius: '30px', boxShadow: '0 0 20px rgba(195, 157, 99, 0.4)', animation: 'pulse-button 3s infinite' }}>
                Contact Us
              </button>
              <button 
                onClick={() => document.getElementById('mumbai-expansion')?.scrollIntoView({ behavior: 'smooth' })} 
                className="btn btn-primary btn-animated" 
                style={{ 
                  padding: '16px 40px', 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  borderRadius: '30px', 
                  boxShadow: '0 0 20px rgba(195, 157, 99, 0.4)',
                  animation: 'pulse-button 3s infinite'
                }}
              >
                Mumbai Strategy
              </button>
              <button 
                onClick={() => navigate('/jagdish-bhawan')} 
                className="btn btn-primary btn-animated" 
                style={{ 
                  padding: '16px 40px', 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  borderRadius: '30px', 
                  boxShadow: '0 0 20px rgba(195, 157, 99, 0.4)',
                  animation: 'pulse-button 3s infinite'
                }}
              >
                Jagdish Bhawan
              </button>
            </div>

          <div className="filters glass" style={{ padding: '15px 30px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', borderRadius: '50px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', alignSelf: 'center', paddingRight: '10px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>TYPE</span>
            <button className={`btn ${filter === 'All' ? 'btn-active-glow' : 'btn-outline'}`} onClick={() => setFilter('All')} style={{ border: 'none', background: filter === 'All' ? 'var(--primary)' : 'transparent', borderRadius: '30px' }}>All</button>
            <button className={`btn ${filter === 'Residential' ? 'btn-active-glow' : 'btn-outline'}`} onClick={() => setFilter('Residential')} style={{ border: 'none', background: filter === 'Residential' ? 'var(--primary)' : 'transparent', borderRadius: '30px' }}>Residential</button>
            <button className={`btn ${filter === 'Commercial' ? 'btn-active-glow' : 'btn-outline'}`} onClick={() => setFilter('Commercial')} style={{ border: 'none', background: filter === 'Commercial' ? 'var(--primary)' : 'transparent', borderRadius: '30px' }}>Commercial</button>
            <button className={`btn ${filter === 'Plots' ? 'btn-active-glow' : 'btn-outline'}`} onClick={() => setFilter('Plots')} style={{ border: 'none', background: filter === 'Plots' ? 'var(--primary)' : 'transparent', borderRadius: '30px' }}>Plots</button>
            <button className={`btn ${filter === 'Flats' ? 'btn-active-glow' : 'btn-outline'}`} onClick={() => setFilter('Flats')} style={{ border: 'none', background: filter === 'Flats' ? 'var(--primary)' : 'transparent', borderRadius: '30px' }}>Flats</button>
            <button className={`btn ${filter === 'Co-Working' ? 'btn-active-glow' : 'btn-outline'}`} onClick={() => setFilter('Co-Working')} style={{ border: 'none', background: filter === 'Co-Working' ? 'var(--primary)' : 'transparent', borderRadius: '30px' }}>Co-Working</button>
          </div>
          
          {/* Animated Scroll Indicator */}
          <div className="scroll-indicator" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.8 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '4px', color: '#fff', textTransform: 'uppercase', marginBottom: '10px' }}>SCROLL</span>
            <div className="mouse-icon">
              <div className="scroll-dot"></div>
            </div>
            <div className="scroll-arrows">
              <ChevronDown size={14} className="arrow-1" />
              <ChevronDown size={14} className="arrow-2" />
            </div>
          </div>

        </div>
      </section>

      {/* Featured Projects Title Section */}
      <section id="projects" className="featured-header-section" style={{
        padding: '120px 20px 60px 20px',
        textAlign: 'center',
        position: 'relative',
        background: 'linear-gradient(to bottom, #0f1115 0%, #1a1d24 100%)'
      }}>
        <div className="section-decorator">
          <div className="line left"></div>
          <Building2 color="var(--primary)" size={24} />
          <div className="line right"></div>
        </div>
        
        <h2 className="premium-title scroll-reveal">
          Architectural <span className="highlight-text">Masterpieces</span>
        </h2>
        <p className="section-subtitle scroll-reveal">
          A curated selection of pre-verified premium estates designed for the elite.
        </p>
      </section>

      {/* Featured Projects Grid */}
      <section className="projects-main-section scroll-reveal" style={{ 
        paddingBottom: '100px', 
        width: '100%', 
        maxWidth: '1400px', 
        margin: '0 auto',
        paddingLeft: '20px', 
        paddingRight: '20px'
      }}>
        <div className="projects-grid-v2">
          {displayedProjects.map((project, index) => (
            <div 
              className="luxury-card-wrapper scroll-reveal" 
              key={project._id}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
                <div 
                  className="luxury-card glass" 
                  onClick={() => navigate(`/project/${project._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-image-wrapper">
                    <img 
                      src={project.images && project.images.length > 0 ? project.images[0] : `https://images.unsplash.com/photo-${['1560518883-ce09059eeffa', '1512917774080-9991f1c4c750', '1600585154340-be6161a56a0c', '1600607687940-c52af04657b3', '1545324418-cc1a3fa10c00'][project.title.length % 5]}?q=80&w=2073`} 
                      alt={project.title} 
                      className="l-card-img" 
                      loading="lazy"
                    />
                    <div className="card-status-overlay">
                      <div className="l-badge type-badge">{project.type}</div>
                      {project.status === 'Upcoming' && <div className="l-badge status-badge upcoming">✨ COMING SOON</div>}
                      {project.status === 'Sold' && <div className="l-badge status-badge sold">SOLD OUT</div>}
                    </div>
                    <button className="l-heart-btn" onClick={(e) => { e.stopPropagation(); handleLike(e, project._id); }}>
                      <Heart size={20} />
                    </button>
                    <div className="card-price-overlay">
                      <span className="price-label">ESTATE VALUE</span>
                      <span className="price-value">₹ {formatIndianPrice(project.price)}</span>
                    </div>
                  </div>

                  <div className="luxury-content">
                    <div className="activity-row">
                      {activityData[project._id] && project.status !== 'Sold' && (
                        <div className="activity-pill">
                          <span className="live-dot"></span>
                          <Eye size={12} style={{marginRight: '4px'}}/>
                          {activityData[project._id].viewers} ACTIVE VIEWERS
                        </div>
                      )}
                    </div>
                    
                    <h3 className="l-title">{project.title}</h3>
                    <p className="l-location">
                      <MapPin size={14} color="var(--primary)" />
                      {project.location}
                    </p>

                    <div className="l-divider"></div>

                    <div className="l-footer">
                      <div className="urgency-note">
                        {activityData[project._id] && project.status === 'Available' && (
                          <div style={{ color: urgencyLabels[activityData[project._id].urgencyIndex].color, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {urgencyLabels[activityData[project._id].urgencyIndex].icon}
                            {urgencyLabels[activityData[project._id].urgencyIndex].text}
                          </div>
                        )}
                      </div>
                      <div className="l-actions">
                        <Link to={`/project/${project._id}`} className="l-btn l-btn-sec" onClick={(e) => e.stopPropagation()}>
                          DETAILS
                        </Link>
                        <Link to={`/payment/${project._id}`} className="l-btn l-btn-pri" onClick={(e) => e.stopPropagation()}>
                          RESERVE
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {!showAll && filteredProjects.length > 15 && (
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <button 
              className="btn btn-outline btn-animated" 
              style={{ 
                padding: '16px 50px', 
                fontSize: '1.1rem', 
                borderRadius: '50px',
                borderWidth: '2px',
                letterSpacing: '2px'
              }}
              onClick={() => setShowAll(true)}
            >
              EXPLORE ALL {filteredProjects.length} ESTATES
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="no-results glass-premium">
            <Building2 size={40} opacity={0.3} />
            <p>No estates match your current preferences.</p>
          </div>
        )}

        <div className="excellence-separator scroll-reveal">
          <div className="line left"></div>
          <span className="text">EXCELLENCE DELIVERED</span>
          <div className="line right"></div>
        </div>

        <style>
          {`
            .mouse-icon {
              width: 24px;
              height: 40px;
              border: 2px solid rgba(255,255,255,0.3);
              border-radius: 12px;
              position: relative;
              margin-bottom: 5px;
            }
            .scroll-dot {
              width: 5px;
              height: 5px;
              background: #ff3e3e;
              border-radius: 50%;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: 8px;
              animation: scroll-dot-move 2s infinite ease-in-out;
              box-shadow: 0 0 10px #ff3e3e;
            }
            @keyframes scroll-dot-move {
              0% { top: 8px; opacity: 1; }
              70% { top: 25px; opacity: 0; }
              100% { top: 8px; opacity: 0; }
            }
            .scroll-arrows {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top: -5px;
            }
            .scroll-arrows svg {
              color: rgba(255,255,255,0.4);
              margin-top: -8px;
            }
            .arrow-1 { animation: arrow-fade 2s infinite; }
            .arrow-2 { animation: arrow-fade 2s infinite 0.2s; }
            @keyframes arrow-fade {
              0% { opacity: 0; transform: translateY(-5px); }
              50% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(5px); }
            }

            .section-decorator {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 20px;
              margin-bottom: 15px;
            }
            .section-decorator .line {
              width: 50px;
              height: 1px;
              background: linear-gradient(to right, transparent, var(--primary));
            }
            .section-decorator .line.right {
              background: linear-gradient(to left, transparent, var(--primary));
            }

            .excellence-separator {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 100px 0 40px 0;
              gap: 20px;
              opacity: 0.6;
            }
            .excellence-separator .line {
              flex: 1;
              height: 1px;
              max-width: 150px;
            }
            .excellence-separator .line.left {
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.3));
            }
            .excellence-separator .line.right {
              background: linear-gradient(to left, transparent, rgba(255,255,255,0.3));
            }
            .excellence-separator .text {
              font-size: 0.85rem;
              font-weight: 800;
              letter-spacing: 6px;
              color: rgba(255,255,255,0.8);
              text-transform: uppercase;
              white-space: nowrap;
            }

            .premium-title {
              font-family: 'Playfair Display', serif;
              font-size: clamp(2.5rem, 5vw, 4rem);
              color: #fff;
              margin: 0;
              letter-spacing: -1px;
            }
            .highlight-text {
              color: var(--primary);
              font-style: italic;
              font-weight: 300;
            }
            .section-subtitle {
              color: var(--text-muted);
              font-size: 1.1rem;
              margin-top: 15px;
              max-width: 600px;
              margin-left: auto;
              margin-right: auto;
            }

            .projects-grid-v2 {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
              gap: 25px;
              perspective: 1000px;
              width: 100%;
              margin: 0 auto;
            }

            @media (min-width: 1100px) {
              .projects-grid-v2 {
                grid-template-columns: repeat(5, 1fr);
                justify-content: center;
              }
            }

            .luxury-card-wrapper {
              transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            }

            .luxury-card {
              height: 100%;
              display: flex;
              flex-direction: column;
              border-radius: 24px;
              overflow: hidden;
              border: 1px solid rgba(255,255,255,0.05);
              transition: all 0.6s var(--apple-spring);
              background: rgba(26, 29, 36, 0.4);
              will-change: transform, box-shadow;
            }

            .luxury-card:hover {
              transform: translateY(-10px) scale(1.02);
              box-shadow: 0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1);
              background: rgba(26, 29, 36, 0.9);
            }

            .card-image-wrapper {
              height: 220px;
              position: relative;
              overflow: hidden;
            }

            .l-card-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
            }

            .luxury-card:hover .l-card-img {
              transform: scale(1.15);
            }

            .card-status-overlay {
              position: absolute;
              top: 20px;
              left: 20px;
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .l-badge {
              padding: 6px 14px;
              border-radius: 8px;
              font-size: 0.7rem;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 1px;
              backdrop-filter: blur(8px);
            }
            .type-badge { background: rgba(0,0,0,0.6); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
            .status-badge.upcoming { background: rgba(195,157,99,0.9); color: #fff; }
            .status-badge.sold { background: rgba(231,76,60,0.9); color: #fff; }

            .l-heart-btn {
              position: absolute;
              top: 20px;
              right: 20px;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: rgba(255,255,255,0.1);
              backdrop-filter: blur(8px);
              border: 1px solid rgba(255,255,255,0.2);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              cursor: pointer;
              transition: all 0.3s;
            }
            .l-heart-btn:hover { background: #ef4444; border-color: #ef4444; transform: scale(1.1); }

            .card-price-overlay {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              padding: 20px;
              background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
              display: flex;
              flex-direction: column;
            }
            .price-label { font-size: 0.6rem; color: var(--primary); font-weight: 800; letter-spacing: 2px; }
            .price-value { font-size: 1.6rem; color: #fff; font-weight: 700; margin-top: 4px; }

            .luxury-content {
              padding: 25px;
              flex-grow: 1;
              display: flex;
              flex-direction: column;
            }

            .activity-row {
              height: 24px;
              margin-bottom: 15px;
            }
            .activity-pill {
              display: inline-flex;
              align-items: center;
              padding: 4px 10px;
              background: rgba(255,255,255,0.05);
              border-radius: 100px;
              font-size: 0.65rem;
              font-weight: 700;
              letter-spacing: 1px;
              color: var(--text-muted);
            }
            .live-dot {
              width: 6px;
              height: 6px;
              background: #22c55e;
              border-radius: 50%;
              margin-right: 8px;
              box-shadow: 0 0 10px #22c55e;
              animation: dot-pulse 1.5s infinite;
            }
            @keyframes dot-pulse {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.5); opacity: 0.5; }
              100% { transform: scale(1); opacity: 1; }
            }

            .l-title {
              font-size: 1.6rem;
              color: #fff;
              margin: 0 0 8px 0;
              font-family: 'Playfair Display', serif;
              letter-spacing: 0.5px;
            }
            .l-location {
              display: flex;
              align-items: center;
              gap: 8px;
              color: var(--text-muted);
              font-size: 0.95rem;
              margin-bottom: 20px;
            }

            .l-divider {
              width: 100%;
              height: 1px;
              background: rgba(255,255,255,0.05);
              margin: 20px 0;
            }

            .l-footer {
              margin-top: auto;
            }
            .urgency-note {
              height: 20px;
              font-size: 0.85rem;
              font-weight: 600;
              margin-bottom: 20px;
            }

            .l-actions {
              display: flex;
              gap: 12px;
            }
            .l-btn {
              padding: 14px;
              border-radius: 12px;
              font-size: 0.85rem;
              font-weight: 800;
              letter-spacing: 1px;
              transition: all 0.3s;
              text-align: center;
              flex: 1;
              text-decoration: none;
            }
            .l-btn-sec { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
            .l-btn-sec:hover { background: rgba(255,255,255,0.1); transform: translateY(-3px); }
            .l-btn-pri { background: var(--primary); color: #fff; }
            .l-btn-pri:hover { background: var(--primary-hover); transform: translateY(-3px); box-shadow: 0 10px 20px rgba(195,157,99,0.3); }

            @media (max-width: 768px) {
              .projects-grid-v2 { grid-template-columns: 1fr; }
              .premium-title { font-size: 2.2rem; }
            }
          `}
        </style>
      </section>

      
      <MumbaiTowerSection />
      <MumbaiExpansion />

      <div className="scroll-reveal">
        <StatusBadge />
      </div>

      <section className="container mt-4 mb-5 scroll-reveal">
        <QuickStats />
      </section>

      <section className="container mt-4 mb-4 scroll-reveal">
        <ExploreMap />
      </section>

      <section className="scroll-reveal">
        <TopArchitects />
      </section>

      <UpcomingCollaborations />

      <div className="container" style={{ margin: '80px auto' }}>
        <div className="side-by-side-grid">
          <div className="grid-item square-card">
            <BeforeAfter />
          </div>
          <div className="grid-item square-card">
            <FeaturedNews />
          </div>
        </div>

        <style>{`
          .side-by-side-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .square-card {
            aspect-ratio: 1 / 1;
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          /* Ensure child components stretch to fill the square */
          .square-card > div {
             height: 100% !important;
             display: flex;
             flex-direction: column;
          }
          @media (max-width: 992px) {
            .side-by-side-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .square-card {
              aspect-ratio: auto;
              height: auto;
            }
          }
        `}</style>
      </div>

      <div className="excellence-separator scroll-reveal" style={{ marginTop: '120px', marginBottom: '40px' }}>
        <div className="line left"></div>
        <span className="text">STRATEGIC COLLABORATION</span>
        <div className="line right"></div>
      </div>

      <section className="strategic-collab-section scroll-reveal" style={{ 
        margin: '120px 0', 
        padding: '100px 0',
        background: 'rgba(195, 157, 99, 0.02)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decorative Blur */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(195, 157, 99, 0.05)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(195, 157, 99, 0.03)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '80px', alignItems: 'center' }}>
            
            {/* Left Narrative */}
            <div className="collab-text">
              <div className="section-decorator" style={{ justifyContent: 'flex-start', marginBottom: '24px' }}>
                <Handshake color="#c39d63" size={18} />
                <div style={{ width: '40px', height: '1px', background: '#c39d63' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '3px', color: '#c39d63', textTransform: 'uppercase' }}>Partnership</span>
              </div>
              
              <h2 className="premium-title" style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '24px' }}>
                Strategic Collaboration for <br/>
                <span className="gold-text italic" style={{ display: 'block', marginTop: '10px' }}>Future Growth</span>
              </h2>
              
              <p style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 500, marginBottom: '20px', opacity: 0.9 }}>
                In collaboration with <span className="highlight-text">Mr. Vedant Parkhe</span>
              </p>
              
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '650px' }}>
                Basera Associates is embarking on a transformative journey, partnering with 
                Mr. Vedant Parkhe to pioneer excellence in rental and leasing services. Together, 
                we are unlocking premier investment avenues and professional property management 
                opportunities tailored for the next generation of property owners.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '45px' }}>
                {[
                  'Expansion into Rental & Leasing', 'Strong Partner Network',
                  'Growth & Investment Opportunities', 'Transparent & Trusted Platform'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1rem', color: '#fff', fontWeight: 500 }}>
                    <div style={{ color: '#c39d63', display: 'flex' }}><CheckCircle size={20} /></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className="btn btn-primary btn-animated" 
                onClick={() => setVisionExpanded(!visionExpanded)}
                style={{ padding: '16px 45px', borderRadius: '100px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                {visionExpanded ? 'Hide Details' : 'Explore Our Vision'} 
                <div style={{ transform: visionExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.5s' }}>
                  <RotateCcw size={18} />
                </div>
              </button>

              {/* Expandable Vision Details */}
              <div style={{ 
                height: visionExpanded ? 'auto' : '0', 
                opacity: visionExpanded ? '1' : '0',
                overflow: 'hidden',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                marginTop: visionExpanded ? '40px' : '0'
              }}>
                <div className="glass-premium" style={{ padding: '30px', border: '1px solid rgba(195, 157, 99, 0.1)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div>
                      <h5 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '1.1rem' }}>Rental Excellence</h5>
                      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                        Revolutionizing the rental market with verified listings, automated agreements, and premium tenant management systems led by Mr. Vedant Parkhe.
                      </p>
                    </div>
                    <div>
                      <h5 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '1.1rem' }}>Global Investment</h5>
                      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                        Direct access to high-yield investment opportunities and fractional ownership models designed for future-ready investors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="collab-card-perspective" style={{ perspective: '1000px' }}>
              <div className="glass-premium partner-profile-card" style={{ 
                padding: '50px', 
                textAlign: 'center',
                background: 'linear-gradient(145deg, rgba(20, 22, 28, 0.95), rgba(15, 17, 21, 0.98))',
                border: '1px solid rgba(195, 157, 99, 0.2)',
                transform: 'rotateY(-10deg) rotateX(5deg)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: '40px',
                boxShadow: '-20px 40px 80px -20px rgba(0,0,0,0.7)'
              }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '30px' }}>
                  <div style={{ 
                    width: '180px', height: '180px', 
                    borderRadius: '50%', border: '2px solid #c39d63', 
                    padding: '8px', 
                    background: 'linear-gradient(45deg, #c39d63, transparent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ 
                      width: '100%', height: '100%', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #1a1a1a, #000)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3.5rem',
                      fontWeight: 800,
                      color: '#c39d63',
                      letterSpacing: '2px'
                    }}>
                      VP
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#c39d63', color: '#000', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                    <TrendingUp size={16} />
                  </div>
                </div>
                
                <h3 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '10px' }}>Mr. Vedant Parkhe</h3>
                <p style={{ color: '#c39d63', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '30px', opacity: 0.8 }}>
                  Strategic Partner / Collaboration Lead
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(195, 157, 99, 0.2)', borderRadius: '100px', color: '#fff', letterSpacing: '1px' }}>VERIFIED</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(195, 157, 99, 0.2)', borderRadius: '100px', color: '#fff', letterSpacing: '1px' }}>LEADERSHIP</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '30px', opacity: 0.6 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>PRESENT</span>
                <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, #c39d63, transparent)' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c39d63' }}>FUTURE</span>
              </div>
            </div>

          </div>
        </div>

        <style>{`
          .strategic-collab-section:hover .partner-profile-card {
            transform: rotateY(0deg) rotateX(0deg) translateY(-10px) !important;
            box-shadow: 0 40px 100px -20px rgba(0,0,0,0.8) !important;
          }
          .highlight-text {
            color: #fff;
            position: relative;
            z-index: 1;
          }
          .highlight-text::after {
            display: none;
          }
          @keyframes fab-pulse {
            0% { transform: scale(1); box-shadow: 0 10px 30px rgba(126, 34, 206, 0.4); }
            50% { transform: scale(1.1); box-shadow: 0 15px 45px rgba(126, 34, 206, 0.7); }
            100% { transform: scale(1); box-shadow: 0 10px 30px rgba(126, 34, 206, 0.4); }
          }
          .coming-soon-fab:hover {
            transform: translateY(-5px) rotate(15deg) scale(1.15) !important;
            background: linear-gradient(135deg, #7e22ce, var(--primary)) !important;
          }
          .coming-soon-fab:hover .fab-icon {
            animation: bell-shake 0.5s ease-in-out infinite;
          }
          @keyframes bell-shake {
            0%, 100% { transform: rotate(0); }
            25% { transform: rotate(20deg); }
            75% { transform: rotate(-20deg); }
          }
          @media (max-width: 992px) {
            .strategic-collab-section .container > div {
              grid-template-columns: 1fr !important;
              gap: 80px !important;
              text-align: center;
            }
            .collab-text .section-decorator { justify-content: center !important; }
            .collab-text p { margin-left: auto; margin-right: auto; }
            .collab-text div { justify-content: center !important; }
          }
        `}</style>
      </section>
      <section className="scroll-reveal container" style={{ margin: '80px auto 60px' }}>
        {/* Separator - Matching the premium style */}
        <div className="broker-separator" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '20px', 
          marginBottom: '50px',
          opacity: 0.8
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3))' }}></div>
          <span style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '6px', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>BROKER NETWORK</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.3))' }}></div>
        </div>

        <Link to="/broker-network" className="glass" style={{ 
          display: 'block', 
          padding: '40px', 
          borderRadius: '24px', 
          textAlign: 'center', 
          textDecoration: 'none', 
          color: 'inherit',
          border: '1px solid rgba(195, 157, 99, 0.2)',
          background: 'linear-gradient(135deg, rgba(15,17,21,0.95), rgba(30,27,75,0.4))',
          overflow: 'hidden',
          position: 'relative'
        }}>
           <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top right, rgba(79, 70, 229, 0.1), transparent)', pointerEvents: 'none' }}></div>
           <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '10px' }}>COMING SOON</p>
           <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Broker Network</h2>
           <p style={{ color: 'var(--text-muted)', marginBottom: '25px', fontSize: '1.1rem' }}>Click to explore our upcoming digital ecosystem for real estate professionals.</p>
           <button className="btn btn-primary">Learn More About the Network</button>
        </Link>
      </section>

      <div className="excellence-separator scroll-reveal" style={{ marginTop: '80px', marginBottom: '40px' }}>
        <div className="line left"></div>
        <span className="text">NETWORK ECOSYSTEM</span>
        <div className="line right"></div>
      </div>

      <PartnerSection />

      <InvestmentClub />

      <PropertyAlert />

      <section id="contact" className="container mt-4 mb-4 scroll-reveal">
        <ContactCards />
      </section>
    </div>
  );
}

export default Home;
