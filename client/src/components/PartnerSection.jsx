import React, { useState } from 'react';
import { Briefcase, TrendingUp, Key, Users, CheckCircle, Handshake, Building2, User, Phone, MapPin, Award } from 'lucide-react';

const PartnerSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    experience: ''
  });

  const benefits = [
    {
      title: 'High Commission Earnings',
      desc: 'Unlock industry-leading payouts and performance-based incentives.',
      icon: <TrendingUp size={24} />
    },
    {
      title: 'Exclusive Property Access',
      desc: 'Get early access to premium inventory and pre-launch deals.',
      icon: <Key size={24} />
    },
    {
      title: 'Lead Sharing System',
      desc: 'Proprietary technology to share verified buyer and seller leads.',
      icon: <Users size={24} />
    },
    {
      title: 'Business Growth Support',
      desc: 'Personalized training, branding support, and expert mentorship.',
      icon: <Briefcase size={24} />
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/partner-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Thank you for your interest! Your registration is successful. Our team will contact you soon.");
        setFormData({ name: '', phone: '', city: '', experience: '' });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please check your connection.");
    }
  };

  return (
    <section className="partner-section scroll-reveal" style={{ 
      margin: '80px 0', 
      padding: '80px 0',
      background: 'radial-gradient(circle at bottom right, rgba(37, 99, 235, 0.05), transparent)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Elements */}
      <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '350px', height: '350px', background: 'rgba(37, 99, 235, 0.03)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }}></div>

      <div className="container">
        <div className="partner-new-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }}>
          
          {/* Left Content - Narrative & Benefits */}
          <div className="partner-narrative">
            <div className="section-decorator" style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
              <Users color="#3b82f6" size={18} />
              <div style={{ width: '40px', height: '1px', background: '#3b82f6' }}></div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '3px', color: '#3b82f6', textTransform: 'uppercase' }}>Network Ecosystem</span>
            </div>
            
            <h2 className="premium-title" style={{ fontSize: '3.2rem', lineHeight: 1.1, marginBottom: '20px' }}>
              Scale your Career with our <span className="blue-text">Network Ecosystem</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 500, marginBottom: '25px', opacity: 0.9 }}>
              Join the most innovative real estate network in the region.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '600px' }}>
              Join Basera Associates as an Associate Partner or Agent and leverage our technology, 
              network, and reputation to take your business to the next level. We provide the 
              infrastructure; you focus on the growth.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '40px' }}>
              {benefits.map((benefit, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '4px' }}>{benefit.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Premium Form Card */}
          <div className="partner-form-card-wrapper" style={{ position: 'relative' }}>
            <div className="glass-premium" style={{ 
              padding: '40px', 
              border: '1px solid rgba(59, 130, 246, 0.2)',
              background: 'linear-gradient(135deg, rgba(15, 17, 21, 0.95), rgba(30, 58, 138, 0.2))',
              transform: 'none',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              borderRadius: '32px'
            }}>
              <div className="form-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: '#3b82f6' }}>
                  <Briefcase size={28} />
                </div>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '5px' }}>Join the Network</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Experience the future of partnership</p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="p-form-group">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', borderRadius: '12px', color: '#fff', width: '100%', outline: 'none' }}
                  />
                </div>
                <div className="p-form-group">
                  <input 
                    type="tel" 
                    placeholder="+91-XXXXX XXXXX" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', borderRadius: '12px', color: '#fff', width: '100%', outline: 'none' }}
                  />
                </div>
                <div className="experience-options" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginLeft: '5px' }}>Years of Experience</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {[
                      { value: 'freelance', label: 'Freelance Agent' },
                      { value: '1-3', label: '1-3 Years' },
                      { value: '3-5', label: '3-5 Years' },
                      { value: '5+', label: '5+ Years' }
                    ].map((opt) => (
                      <div 
                        key={opt.value}
                        onClick={() => setFormData({...formData, experience: opt.value})}
                        style={{
                          padding: '12px',
                          borderRadius: '12px',
                          border: '1px solid',
                          borderColor: formData.experience === opt.value ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                          background: formData.experience === opt.value ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.05)',
                          color: formData.experience === opt.value ? '#3b82f6' : 'rgba(255,255,255,0.7)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn btn-animated" style={{ 
                  marginTop: '10px', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  fontWeight: 800, 
                  background: '#2563eb', 
                  color: '#fff', 
                  border: 'none',
                  boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)'
                }}>
                  Register as Partner
                </button>
              </form>
            </div>

            {/* Floating Badge */}
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '15px 25px', borderRadius: '20px', background: 'rgba(15, 17, 21, 0.95)', display: 'flex', alignItems: 'center', gap: '15px', color: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', zIndex: 5 }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={16} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>CERTIFIED NETWORK</span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .partner-section:hover .partner-form-card-wrapper .glass-premium {
          transform: translateY(-10px);
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.8);
        }
        .blue-text {
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (max-width: 992px) {
          .partner-new-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
          }
          .partner-narrative .section-decorator { justify-content: center !important; }
          .partner-narrative p { margin-left: auto; margin-right: auto; }
          .partner-narrative div { justify-content: center !important; }
        }
      `}</style>
    </section>
  );
};

export default PartnerSection;
