import React, { useContext, useEffect, useState } from 'react';
import { 
  User, 
  Crown, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Calendar, 
  Layout, 
  ArrowRight,
  PieChart,
  Activity,
  Award
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  // Simulated Membership Data (Demo)
  const membershipData = {
    level: user?.membershipLevel || 'Basic Premium', // Defaulting to Basic for Demo if not set
    joinedAt: 'Oct 12, 2023',
    expiryDate: 'Oct 12, 2024',
    referralCode: user?.referralCode || 'BASERA-GUEST',
    credits: 12500
  };

  const insights = [
    { title: 'Market Sentiment', value: 'Highly Bullish', change: '+12%', color: '#34c759' },
    { title: 'Avg. ROI (Indore)', value: '18.4%', change: '+2.1%', color: '#c39d63' },
    { title: 'New Listings', value: '24', change: 'This Week', color: '#4f46e5' },
    { title: 'Profile Strength', value: '82%', change: 'Very Good', color: '#ff9500' }
  ];

  const premiumFeatures = [
    { name: 'Early Access', status: 'Active', icon: <Zap size={18} /> },
    { name: 'Broker Network', status: membershipData.level === 'Broker Plan' ? 'Active' : 'Locked', icon: <Crown size={18} /> },
    { name: 'VVIP Events', status: membershipData.level === 'Yearly Value' ? 'Active' : 'Locked', icon: <Award size={18} /> },
    { name: 'Priority Support', status: 'Active', icon: <Activity size={18} /> }
  ];

  return (
    <div className="dashboard-container" style={{ minHeight: '100vh', background: '#0a0c10', color: '#fff', padding: '120px 20px 60px' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Header Section */}
        <div className="dashboard-header animate-fade-in" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>Welcome back, <span className="gold-text">{user?.name ? user.name.split(' ')[0] : 'Member'}</span></h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Here's what's happening in your real estate portfolio today.</p>
          </div>
          <div className="glass-premium" style={{ padding: '15px 25px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid rgba(195,157,99,0.3)' }}>
            <div style={{ background: 'var(--primary)', color: '#000', padding: '10px', borderRadius: '12px' }}>
              <Crown size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Plan</p>
              <p style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>{membershipData.level}</p>
            </div>
          </div>
        </div>

        {/* Top Insights Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {insights.map((item, i) => (
            <div key={i} className="glass hover-glow" style={{ padding: '25px', borderRadius: '20px', transition: 'all 0.3s ease' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px' }}>{item.title}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800' }}>{item.value}</h3>
                <span style={{ fontSize: '0.85rem', color: item.color, fontWeight: '700' }}>{item.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Main Activity Area */}
          <div className="glass" style={{ padding: '35px', borderRadius: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Exclusive Opportunities</h3>
              <Link to="/invest" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                { title: 'The Malabar Sky-Villa', location: 'Worli, Mumbai', price: '₹ 45 Cr', tag: 'VVIP Access' },
                { title: 'Indore Tech Hub C3', location: 'Indore, MP', price: '₹ 8 Cr', tag: 'High ROI' },
                { title: 'Coastal Retreat Plot', location: 'Goa', price: '₹ 2.5 Cr', tag: 'Rare' }
              ].map((prop, i) => (
                <div key={i} className="dashboard-list-item" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '20px', 
                  background: 'rgba(255,255,255,0.03)', 
                  borderRadius: '15px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s'
                }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{prop.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{prop.location}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1rem', fontWeight: '800', margin: 0 }}>{prop.price}</p>
                    <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: '800', textTransform: 'uppercase' }}>{prop.tag}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px', padding: '30px', background: 'linear-gradient(90deg, rgba(195,157,99,0.1), transparent)', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Refer a Friend & Earn</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px' }}>Share your code and get ₹ 5,000 credit on their first investment with Basera Associates.</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <code style={{ background: '#000', padding: '8px 15px', borderRadius: '8px', color: '#fff', border: '1px dashed var(--primary)' }}>{membershipData.referralCode}</code>
                  <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Copy Code</button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Membership Perks */}
            <div className="glass" style={{ padding: '30px', borderRadius: '30px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '20px' }}>Plan Benefits</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                {premiumFeatures.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: feat.status === 'Locked' ? 0.5 : 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ color: feat.status === 'Locked' ? 'var(--text-muted)' : 'var(--primary)' }}>{feat.icon}</div>
                      <span style={{ fontSize: '0.95rem' }}>{feat.name}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: feat.status === 'Active' ? '#34c759' : 'var(--text-muted)' }}>{feat.status}</span>
                  </div>
                ))}
              </div>
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <button className="btn btn-outline" style={{ width: '100%', marginTop: '30px', padding: '12px', fontSize: '0.9rem' }}>Upgrade Plan</button>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="glass hover-glow" style={{ padding: '30px', borderRadius: '30px', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(10, 11, 14, 0.4))' }}>
              <Activity size={30} color="#4f46e5" style={{ marginBottom: '15px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px' }}>Personal Advisor</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '20px' }}>Get a 1-on-1 strategy call with our senior portfolio manager to optimize your holdings.</p>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '12px', background: '#4f46e5' }}
                onClick={() => {setShowBookingModal(true); setBookingStep(1);}}
              >
                Book Appointment
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass animate-fade-in" style={{ maxWidth: '500px', width: '100%', padding: '40px', borderRadius: '30px', border: '1px solid rgba(195,157,99,0.3)', position: 'relative' }}>
            <button 
              onClick={() => setShowBookingModal(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              &times;
            </button>
            
            {bookingStep === 1 ? (
              <div style={{ textAlign: 'center' }}>
                <Activity size={60} color="#4f46e5" style={{ marginBottom: '20px' }} />
                <h2 style={{ marginBottom: '15px' }}>Strategic Portfolio Review</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Schedule a 1-on-1 strategy call with our Senior Portfolio Manager.</p>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <button className="btn btn-outline" onClick={() => setBookingStep(2)} style={{ padding: '15px', borderRadius: '15px' }}>Check Availability</button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <ShieldCheck size={60} color="#34c759" style={{ marginBottom: '20px' }} />
                <h2 style={{ marginBottom: '15px' }}>Request Submitted</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Our executive team will reach out within 2 hours to confirm your premium consultation window.</p>
                <button className="btn btn-primary" onClick={() => setShowBookingModal(false)} style={{ padding: '12px 30px' }}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .gold-text {
          background: linear-gradient(135deg, #c39d63 0%, #e8c697 50%, #c39d63 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dashboard-list-item:hover {
          background: rgba(255,255,255,0.06) !important;
          transform: translateX(5px);
          border-color: rgba(195,157,99,0.2) !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
