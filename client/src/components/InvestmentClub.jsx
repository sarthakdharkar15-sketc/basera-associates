import { TrendingUp, ShieldCheck, Diamond, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestmentClub = () => {
  return (
    <section className="investment-club-section scroll-reveal">
      <div className="container">
        {/* Separator - Matching the requested style */}
        <div className="premium-separator" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '20px', 
          marginBottom: '50px',
          opacity: 0.8
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3))' }}></div>
          <span style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '6px', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>PREMIUM ACCESS</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.3))' }}></div>
        </div>

        <div className="club-card glass">
          <div className="club-content">
            <h2 className="club-heading">Explore <span className="gold-text">Premium Access</span></h2>
            <p className="club-description">
              Unlock exclusive real estate investment opportunities with our premium membership. 
              Get early access to pre-launch projects, high ROI properties, and expert-curated 
              investment options designed to maximize your returns.
            </p>
            <p className="club-description second">
              Stay ahead of the market with data-driven insights and secure your future with 
              smart property investments.
            </p>

            <div className="club-perks">
              <div className="perk-item">
                <div className="perk-icon"><TrendingUp size={20} /></div>
                <span>High ROI Assets</span>
              </div>
              <div className="perk-item">
                <div className="perk-icon"><ShieldCheck size={20} /></div>
                <span>Secured Portfolios</span>
              </div>
              <div className="perk-item">
                <div className="perk-icon"><Diamond size={20} /></div>
                <span>VVIP Pre-Launch Access</span>
              </div>
            </div>

            <div className="club-cta">
              <Link to="/invest" style={{ textDecoration: 'none' }}>
                <button className="btn btn-primary club-btn main">
                  Start Investing Now <ArrowRight size={18} />
                </button>
              </Link>
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <button className="btn btn-outline club-btn secondary">
                  Become a Premium Member
                </button>
              </Link>
            </div>
          </div>
          <div className="club-visual">
            <div className="visual-circle main"></div>
            <div className="visual-circle outer"></div>
            <div className="roi-card">
              <span className="roi-label">Avg. ROI</span>
              <span className="roi-value">+24.5%</span>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .investment-club-section {
            padding: 40px 0;
            background: radial-gradient(circle at center, rgba(195, 157, 99, 0.05), transparent);
          }

          .club-card {
            display: flex;
            align-items: center;
            padding: 40px 60px;
            border-radius: 32px;
            gap: 50px;
            border: 1px solid rgba(195, 157, 99, 0.15);
            background: linear-gradient(145deg, rgba(15,17,21,0.95), rgba(26,29,36,0.98));
            overflow: hidden;
            position: relative;
          }

          .club-content {
            flex: 1;
            z-index: 2;
          }

          .exclusive-tag {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(195, 157, 99, 0.1);
            color: var(--primary);
            padding: 6px 16px;
            border-radius: 100px;
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 24px;
            border: 1px solid rgba(195, 157, 99, 0.2);
          }

          .club-heading {
            font-size: 2.8rem;
            margin-bottom: 20px;
            line-height: 1.1;
            font-family: 'Outfit', sans-serif;
          }

          .gold-text {
            background: linear-gradient(90deg, #c39d63, #e5c78b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .club-description {
            font-size: 1rem;
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: 15px;
          }

          .club-description.second {
            color: var(--text-main);
            font-weight: 500;
            margin-bottom: 30px;
          }

          .club-perks {
            display: flex;
            gap: 25px;
            margin-bottom: 35px;
          }

          .perk-item {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-main);
          }

          .perk-icon {
            color: var(--primary);
          }

          .club-cta {
            display: flex;
            gap: 20px;
          }

          .club-btn {
            padding: 16px 32px;
            font-size: 1rem;
            font-weight: 700;
            border-radius: 14px;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .club-btn.main {
            box-shadow: 0 10px 20px rgba(195, 157, 99, 0.2);
          }

          .club-visual {
            flex: 1;
            position: relative;
            height: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .visual-circle {
            position: absolute;
            border-radius: 50%;
            border: 1px solid rgba(195, 157, 99, 0.1);
          }

          .visual-circle.main {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(195, 157, 99, 0.1), transparent);
            animation: pulse-circle 4s infinite ease-in-out;
          }

          .visual-circle.outer {
            width: 450px;
            height: 450px;
            animation: rotate-slow 20s linear infinite;
            border-style: dashed;
          }

          .roi-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            animation: bounce-slow 5s infinite ease-in-out;
          }

          .roi-label {
            font-size: 0.8rem;
            color: var(--text-muted);
            font-weight: 600;
          }

          .roi-value {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--success);
            font-family: 'Inter', sans-serif;
          }

          @keyframes pulse-circle {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.5; }
            100% { transform: scale(1); opacity: 0.3; }
          }

          @keyframes rotate-slow {
            to { transform: rotate(360deg); }
          }

          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          @media (max-width: 1100px) {
            .club-card { flex-direction: column; padding: 40px; text-align: center; }
            .club-heading { font-size: 2.5rem; }
            .club-perks { flex-direction: column; align-items: center; gap: 15px; }
            .club-cta { flex-direction: column; }
            .club-visual { width: 100%; height: 300px; margin-top: 40px; }
          }
        `}
      </style>
    </section>
  );
};

export default InvestmentClub;
