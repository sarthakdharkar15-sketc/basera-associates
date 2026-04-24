import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Timer, ArrowRight, Filter, Info, ShieldCheck } from 'lucide-react';

const Invest = () => {
  const [activeTab, setActiveTab] = useState('all');

  const opportunities = [
    {
      id: 1,
      title: 'Skyline Business Hub',
      location: 'Malad West, Mumbai',
      type: 'Commercial',
      entryPrice: '₹45 Lakh',
      appreciation: '+18%',
      yield: '8.5%',
      risk: 'Low',
      status: 'Pre-Launch',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Emerald Luxury Suites',
      location: 'Baner, Pune',
      type: 'Residential',
      entryPrice: '₹1.2 Cr',
      appreciation: '+12%',
      yield: '4.2%',
      risk: 'Moderate',
      status: 'Under Construction',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'TechPark Co-working Space',
      location: 'Hitech City, Hyderabad',
      type: 'Fractional',
      entryPrice: '₹10 Lakh',
      appreciation: '+22%',
      yield: '11.2%',
      risk: 'Low',
      status: 'Operational',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="invest-page">
      <div className="container">
        {/* Investment Dashboard Header */}
        <div className="invest-header glass" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '60px' }}>
          <div className="header-info" style={{ maxWidth: '900px' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Start Investing in <span className="gold-text">Smart Real Estate</span></h1>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.4rem', marginBottom: '25px', fontWeight: '600' }}>
              Grow your wealth with carefully selected, high-potential property opportunities.
            </h3>
            <p style={{ color: 'var(--text-main)', fontSize: '1.2rem', lineHeight: '1.7', marginBottom: '15px' }}>
              Discover premium real estate investments with strong growth potential. Get early access to pre-launch projects, 
              verified listings, and expert-backed opportunities designed to help you make confident investment decisions.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
              Whether you're a first-time investor or looking to expand your portfolio, our platform provides the right tools, 
              insights, and support to help you succeed in the property market. 
              <strong style={{ color: 'var(--primary)', display: 'block', marginTop: '10px' }}>Unlock Premium Investment Opportunities</strong>
            </p>
          </div>
          <div className="stats-strip" style={{ marginTop: '20px' }}>
            <div className="stat-pill">
              <TrendingUp size={16} /> <span>14.2% Avg Growth</span>
            </div>
            <div className="stat-pill">
              <BarChart3 size={16} /> <span>Live Market Data</span>
            </div>
            <div className="stat-pill">
              <PieChart size={16} /> <span>Diversified Portfolios</span>
            </div>
          </div>
        </div>

        {/* Investment Strategy Tabs */}
        <div className="invest-tabs">
          <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Assets</button>
          <button className={`tab-btn ${activeTab === 'high-yield' ? 'active' : ''}`} onClick={() => setActiveTab('high-yield')}>High Yield</button>
          <button className={`tab-btn ${activeTab === 'pre-launch' ? 'active' : ''}`} onClick={() => setActiveTab('pre-launch')}>Pre-Launch</button>
          <button className={`tab-btn ${activeTab === 'commercial' ? 'active' : ''}`} onClick={() => setActiveTab('commercial')}>Commercial</button>
        </div>

        {/* Opportunities Grid */}
        <div className="opportunities-grid">
          {opportunities.map(item => (
            <div key={item.id} className="opp-card glass">
              <div className="opp-image" style={{ backgroundImage: `url(${item.image})` }}>
                <div className="opp-badge">{item.status}</div>
              </div>
              <div className="opp-content">
                <div className="opp-type">{item.type}</div>
                <h3 className="opp-title">{item.title}</h3>
                <p className="opp-loc">{item.location}</p>

                <div className="opp-metrics">
                  <div className="metric">
                    <span className="m-label">Entry Point</span>
                    <span className="m-value">{item.entryPrice}</span>
                  </div>
                  <div className="metric">
                    <span className="m-label">Projected ROI</span>
                    <span className="m-value positive">{item.appreciation}</span>
                  </div>
                  <div className="metric">
                    <span className="m-label">Rental Yield</span>
                    <span className="m-value">{item.yield}</span>
                  </div>
                </div>

                <div className="opp-footer">
                   <div className="risk-level">
                     <ShieldCheck size={14} /> {item.risk} Risk
                   </div>
                   <button className="btn btn-primary invest-mini-btn">
                     View Analysis <ArrowRight size={14} />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Lock Section */}
        <div className="premium-lock glass">
            <div className="lock-icon"><Timer size={40} /></div>
            <h2>Unlocking More Opportunities in 24 Hours</h2>
            <p>12+ more high-value investment assets are currently being vetted by our analysts.</p>
            <div className="lock-footer">
              <button className="btn btn-outline">Notify Me</button>
              <button className="btn btn-primary">Upgrade for VIP Access</button>
            </div>
        </div>
      </div>

      <style>
        {`
          .invest-page {
            padding: 120px 0 80px;
            background: #0f1115;
            min-height: 100vh;
          }

          .invest-header {
            padding: 40px;
            border-radius: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            border: 1px solid rgba(195, 157, 99, 0.15);
          }

          .header-info h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-family: 'Outfit', sans-serif;
          }

          .header-info p {
            color: var(--text-muted);
            font-size: 1.1rem;
          }

          .stats-strip {
            display: flex;
            gap: 15px;
          }

          .stat-pill {
            background: rgba(255, 255, 255, 0.05);
            padding: 10px 20px;
            border-radius: 100px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .invest-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 40px;
            padding: 5px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 15px;
            width: fit-content;
          }

          .tab-btn {
            padding: 10px 24px;
            border-radius: 12px;
            border: none;
            background: transparent;
            color: var(--text-muted);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
          }

          .tab-btn.active {
            background: var(--primary);
            color: #1a1d24;
          }

          .opportunities-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-bottom: 60px;
          }

          .opp-card {
            border-radius: 24px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.3s ease;
          }

          .opp-card:hover {
            transform: translateY(-5px);
            border-color: rgba(195, 157, 99, 0.3);
          }

          .opp-image {
            height: 200px;
            background-size: cover;
            background-position: center;
            position: relative;
          }

          .opp-badge {
            position: absolute;
            top: 15px;
            left: 15px;
            background: var(--primary);
            color: #1a1d24;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
          }

          .opp-content {
            padding: 25px;
          }

          .opp-type {
            color: var(--primary);
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 8px;
          }

          .opp-title {
            font-size: 1.3rem;
            margin-bottom: 5px;
          }

          .opp-loc {
            color: var(--text-muted);
            font-size: 0.85rem;
            margin-bottom: 25px;
          }

          .opp-metrics {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 15px;
          }

          .metric {
            display: flex;
            flex-direction: column;
          }

          .m-label {
            font-size: 0.65rem;
            color: var(--text-muted);
            text-transform: uppercase;
            font-weight: 600;
          }

          .m-value {
            font-size: 1.1rem;
            font-weight: 700;
          }

          .m-value.positive {
            color: var(--success);
          }

          .opp-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .risk-level {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.75rem;
            color: var(--text-muted);
            font-weight: 600;
          }

          .invest-mini-btn {
            padding: 8px 16px;
            font-size: 0.8rem;
          }

          .premium-lock {
            padding: 60px;
            text-align: center;
            border-radius: 30px;
            border: 1px solid rgba(195, 157, 99, 0.1);
            background: linear-gradient(145deg, rgba(255,255,255,0.02), rgba(195, 157, 99, 0.05));
          }

          .lock-icon {
            color: var(--primary);
            margin-bottom: 20px;
            animation: pulse-op 2s infinite;
          }

          .premium-lock h2 {
            font-size: 2rem;
            margin-bottom: 15px;
          }

          .lock-footer {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
          }

          @keyframes pulse-op {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }

          @media (max-width: 1100px) {
            .opportunities-grid { grid-template-columns: repeat(2, 1fr); }
            .invest-header { flex-direction: column; text-align: center; gap: 20px; }
          }

          @media (max-width: 768px) {
            .opportunities-grid { grid-template-columns: 1fr; }
          }
        `}
      </style>
    </div>
  );
};

export default Invest;
