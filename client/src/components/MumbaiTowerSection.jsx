import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Waves, Sparkles, TrendingUp, MapPin, Droplets, Dumbbell, Car, Trees, 
  ChevronRight, Building2, Download, Send, X, Mail, Phone, User, Award
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const chartData = [
  { year: '2019', price: 42000 },
  { year: '2020', price: 45000 },
  { year: '2021', price: 48500 },
  { year: '2022', price: 54000 },
  { year: '2023', price: 62000 },
  { year: '2024', price: 71000 },
  { year: '2025', price: 85000 },
];

const MumbaiTowerSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="mumbai-luxury-section" style={{
      position: 'relative',
      width: '100%',
      minHeight: '120vh',
      background: 'linear-gradient(180deg, #1a1405 0%, #050505 15%)',
      color: '#fff',
      padding: '100px 0',
      overflow: 'hidden',
      marginTop: '-2px'
    }}>
      {/* Background Architectural Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/mumbai-tower-render.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        filter: 'grayscale(100%)',
        zIndex: 0
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Header Hero Part */}
        <div className="hero-content-wrapper" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '30px',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <span className="premium-tag">
              <MapPin size={12} /> South Mumbai
            </span>
            <span className="premium-tag gold">
              <Award size={12} /> Iconic 45 Storey
            </span>
          </div>

          <h1 className="luxury-title" style={{
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: '900',
            letterSpacing: '-2px',
            margin: '0 0 20px 0',
            lineHeight: 0.9,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
          }}>
            ALTAMOUNT <span style={{ color: 'var(--primary, #c39d63)' }}>CROWN</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '700px',
            margin: '0 auto 40px auto',
            fontWeight: '300',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
          }}>
            Experience the pinnacle of luxury with panoramic sea views and world-class architectural brilliance in Mumbai's most prestigious neighborhood.
          </p>

          <div style={{ 
            marginTop: '40px',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
          }}>
            <button onClick={() => setShowBrochureModal(true)} className="btn-luxury-main" style={{ border: 'none', cursor: 'pointer' }}>
              Request Brochure <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic Analytics & Features Grid */}
        <div className="luxe-grid-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          alignItems: 'stretch'
        }}>
          
          {/* Chart Section */}
          <div className="glass-card chart-card" style={{
            gridColumn: 'span 2',
            padding: '40px',
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#fff' }}>Market Appreciation</h3>
                <p style={{ margin: '5px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Price growth per sq.ft in South Mumbai</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#c39d63' }}>+102%</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Since 2019</div>
              </div>
            </div>

            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c39d63" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#c39d63" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(20,20,25,0.95)', 
                      border: '1px solid rgba(195, 157, 99, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#c39d63' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#c39d63" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { icon: <Waves />, label: "Sea Views", value: "Panoramic" },
              { icon: <Sparkles />, label: "Status", value: "Ultra Luxe" },
              { icon: <TrendingUp />, label: "ROI", value: "High Growth" },
              { icon: <MapPin />, label: "Locality", value: "Altamount" }
            ].map((stat, i) => (
              <div key={i} className="glass-card stat-item" style={{
                padding: '25px',
                textAlign: 'center',
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + (i * 0.1)}s`
              }}>
                <div style={{ color: '#c39d63', marginBottom: '15px' }}>{stat.icon}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '5px' }}>{stat.value}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Feature Highlights */}
        <div style={{ 
          marginTop: '60px', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '40px',
          flexWrap: 'wrap',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '60px'
        }}>
          {[
            { icon: <Droplets />, label: "Infinity Sky Pool" },
            { icon: <Dumbbell />, label: "Olympia Fitness" },
            { icon: <Car />, label: "Automated Valet" },
            { icon: <Trees />, label: "Zen Garden" }
          ].map((feature, i) => (
            <div key={i} className="icon-feature" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem',
              fontWeight: '500',
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + (i * 0.1)}s`
            }}>
              <div className="mini-icon-box">{feature.icon}</div>
              {feature.label}
            </div>
          ))}
        </div>

      </div>

      {/* Brochure Request Modal */}
      {showBrochureModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass-card animate-slide-up" style={{ width: '100%', maxWidth: '550px', padding: '50px 40px 60px', borderRadius: '32px', border: '1px solid rgba(195, 157, 99, 0.3)', position: 'relative' }}>
            <button onClick={() => { setShowBrochureModal(false); setSubmitted(false); }} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X size={24} /></button>
            
            {!submitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'rgba(195, 157, 99, 0.1)', borderRadius: '15px', color: '#c39d63', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <Download size={30} />
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 10px 0' }}>Altamount Crown</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Enter your details to receive the e-brochure & floor plans.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', color: '#c39d63', zIndex: 2 }} />
                    <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease' }} onChange={e => setFormData({...formData, name: e.target.value})} className="brochure-input" />
                  </div>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '16px', color: '#c39d63', zIndex: 2 }} />
                    <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease' }} onChange={e => setFormData({...formData, email: e.target.value})} className="brochure-input" />
                  </div>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '16px', color: '#c39d63', zIndex: 2 }} />
                    <input type="tel" placeholder="Phone Number" required style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease' }} onChange={e => setFormData({...formData, phone: e.target.value})} className="brochure-input" />
                  </div>
                  <button type="submit" className="btn-luxury-main" style={{ width: '100%', border: 'none', justifyContent: 'center', marginTop: '10px' }}>
                    Receive Brochure <Send size={18} />
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '70px', height: '70px', background: 'rgba(52, 199, 89, 0.1)', borderRadius: '50%', color: '#34c759', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', flexShrink: 0 }}>
                  <Send size={32} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 10px 0' }}>Thank You!</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.5', marginBottom: '25px', maxWidth: '400px' }}>
                  The brochure for <strong>Altamount Crown</strong> has been requested successfully. 
                  <span style={{ color: '#c39d63', fontWeight: '700', display: 'block', marginTop: '5px' }}>Check your email shortly.</span>
                </p>
                <a href="/uploads/Altamount_crown_brochure.png" target="_blank" rel="noreferrer" className="btn-luxury-main" style={{ 
                  width: '100%', 
                  height: '54px', 
                  justifyContent: 'center', 
                  background: '#34c759', 
                  color: '#fff', 
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  boxShadow: '0 10px 30px rgba(52, 199, 89, 0.2)'
                }}>
                  View Brochure Now <Download size={18} />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .premium-tag {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
          backdrop-filter: blur(10px);
        }

        .premium-tag.gold {
          background: rgba(195, 157, 99, 0.1);
          border-color: rgba(195, 157, 99, 0.3);
          color: #c39d63;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(195, 157, 99, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .btn-luxury-main {
          background: #c39d63;
          color: #000;
          padding: 16px 36px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 20px rgba(195, 157, 99, 0.2);
        }

        .btn-luxury-main:hover {
          background: #d4ae7a;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 30px rgba(195, 157, 99, 0.4);
        }

        .mini-icon-box {
          width: 44px;
          height: 44px;
          background: rgba(195, 157, 99, 0.1);
          border: 1px solid rgba(195, 157, 99, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c39d63;
        }

        @media (max-width: 900px) {
          .chart-card {
            grid-column: span 1 !important;
          }
        }

        @media (max-width: 600px) {
          .luxe-grid-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default MumbaiTowerSection;
