import React, { useEffect, useState } from 'react';
import { LayoutGrid, List, MapPin, Building2, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const formatIndianPrice = (price) => {
        if (!price) return 'N/A';
        if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
        if (price >= 100000) return `${(price / 100000).toFixed(2)} Lakh`;
        return price.toLocaleString('en-IN');
    };

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0c10' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(195,157,99,0.2)', borderTopColor: '#c39d63', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div className="portfolio-page" style={{ background: '#0a0c10', minHeight: '100vh', padding: '120px 0 80px', color: '#fff' }}>
            <div className="container">
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }} className="scroll-reveal">
                    <span style={{ color: '#c39d63', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '15px', display: 'block' }}>Basera Collection</span>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Exclusive Project <span style={{ color: '#c39d63', fontStyle: 'italic' }}>Portfolio</span></h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', lineHeight: 1.8 }}>
                        A curated showcase of our most prestigious architectural masterpieces across Indore, Mumbai, and Goa. 
                        Each project represents our commitment to luxury, excellence, and visionary design.
                    </p>
                </div>

                {/* Controls */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '40px', 
                    padding: '20px', 
                    background: 'rgba(255,255,255,0.02)', 
                    borderRadius: '20px', 
                    border: '1px solid rgba(255,255,255,0.05)' 
                }} className="scroll-reveal">
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '4px' }}>
                            <button 
                                onClick={() => setViewMode('grid')}
                                style={{ 
                                    padding: '8px 15px', 
                                    background: viewMode === 'grid' ? '#c39d63' : 'transparent', 
                                    border: 'none', 
                                    color: viewMode === 'grid' ? '#000' : '#fff',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <LayoutGrid size={18} /> Grid
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                style={{ 
                                    padding: '8px 15px', 
                                    background: viewMode === 'list' ? '#c39d63' : 'transparent', 
                                    border: 'none', 
                                    color: viewMode === 'list' ? '#000' : '#fff',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <List size={18} /> Catalog
                            </button>
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>Showing {projects.length} Premier Estates</span>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <a href="/Basera_Associates_Portfolio.pdf" target="_blank" style={{ 
                            padding: '10px 20px', 
                            background: 'transparent', 
                            border: '1px solid rgba(195,157,99,0.3)', 
                            color: '#c39d63',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }} className="btn-animated">
                            <Download size={18} /> Export PDF
                        </a>
                    </div>
                </div>

                {/* Grid View */}
                {viewMode === 'grid' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                        {projects.map((item, idx) => (
                            <div
                                key={item._id}
                                className="portfolio-card glass scroll-reveal"
                                style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15,18,24,0.6)', transitionDelay: `${idx * 100}ms` }}
                            >
                                <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                                    <img 
                                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070'} 
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s ease' }}
                                        className="portfolio-img"
                                    />
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#c39d63', color: '#000', padding: '5px 15px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>
                                        {item.status.toUpperCase()}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                        <span style={{ color: '#c39d63', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px' }}>ESTATE VALUE</span>
                                        <h3 style={{ fontSize: '1.5rem', margin: '4px 0 0 0' }}>₹ {formatIndianPrice(item.price)}</h3>
                                    </div>
                                </div>
                                <div style={{ padding: '25px' }}>
                                    <div style={{ color: '#c39d63', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '8px' }}>{item.type.toUpperCase()}</div>
                                    <h3 style={{ fontSize: '1.6rem', marginBottom: '10px', fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', marginBottom: '25px', fontSize: '0.95rem' }}>
                                        <MapPin size={16} color="#c39d63" /> {item.location}
                                    </p>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <Link to={`/project/${item._id}`} style={{ 
                                            flex: 1, 
                                            padding: '12px', 
                                            background: '#c39d63', 
                                            color: '#000', 
                                            textAlign: 'center', 
                                            borderRadius: '12px', 
                                            fontWeight: 700, 
                                            textDecoration: 'none',
                                            fontSize: '0.9rem'
                                        }} className="btn-animated">VIEW DETAILS</Link>
                                        <button style={{ 
                                            padding: '12px', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            color: '#fff', 
                                            borderRadius: '12px', 
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }} className="btn-animated">
                                            <Share2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Catalog View */}
                {viewMode === 'list' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {projects.map((item, idx) => (
                            <div
                                key={item._id}
                                className="portfolio-list-item scroll-reveal"
                                style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: '300px 1fr 250px', 
                                    gap: '30px', 
                                    background: 'rgba(15,18,24,0.4)', 
                                    borderRadius: '24px', 
                                    overflow: 'hidden', 
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    alignItems: 'center',
                                    transitionDelay: `${idx * 50}ms`
                                }}
                            >
                                <div style={{ height: '220px', overflow: 'hidden' }}>
                                    <img 
                                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070'} 
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <div style={{ color: '#c39d63', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '2px' }}>{item.type} • {item.status}</div>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '12px', fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                                        <MapPin size={16} color="#c39d63" /> {item.location}
                                    </p>
                                </div>
                                <div style={{ padding: '30px', borderLeft: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', background: 'rgba(255,255,255,0.02)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '15px' }}>₹ {formatIndianPrice(item.price)}</div>
                                    <Link to={`/project/${item._id}`} style={{ 
                                        display: 'inline-block',
                                        padding: '12px 24px', 
                                        background: 'rgba(195,157,99,0.1)', 
                                        color: '#c39d63', 
                                        borderRadius: '12px', 
                                        fontWeight: 800, 
                                        textDecoration: 'none',
                                        fontSize: '0.85rem',
                                        border: '1px solid rgba(195,157,99,0.3)',
                                        letterSpacing: '1px'
                                    }} className="btn-animated">DETAILS</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Empty State */}
                {projects.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(255,255,255,0.3)' }}>
                        <Building2 size={60} style={{ marginBottom: '20px' }} />
                        <h3>Your collection is empty</h3>
                        <p>Stay tuned for our upcoming luxury estates.</p>
                    </div>
                )}
            </div>

            <style>{`
                .portfolio-card:hover .portfolio-img {
                    transform: scale(1.1);
                }
                .portfolio-card {
                    will-change: transform, opacity;
                }
                .portfolio-card:hover {
                    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.8);
                    border-color: rgba(195,157,99,0.5);
                    transform: translateY(-10px) scale(1.02);
                }
                .portfolio-list-item:hover {
                    background: rgba(255,255,255,0.05) !important;
                    border-color: rgba(195,157,99,0.3) !important;
                }
            `}</style>
        </div>
    );
};

export default Portfolio;
