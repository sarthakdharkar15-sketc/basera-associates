import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <div className="announcement-tag">
          <Zap size={12} fill="currentColor" />
          <span>NEW</span>
        </div>
        <p className="announcement-text">
          Revolutionizing Real Estate: The <span className="highlight">Smart Broker Network</span> is launching in 48 hours! 
          <Link to="/broker-network" style={{ color: 'inherit', textDecoration: 'none' }}>
            <span className="cta-link">
              Get Early Access <ArrowRight size={14} />
            </span>
          </Link>
        </p>
      </div>

      <style>
        {`
          .announcement-bar {
            background: linear-gradient(90deg, #0f172a, #1e1b4b, #0f172a);
            color: #fff;
            padding: 8px 0;
            border-bottom: 1px solid rgba(195, 157, 99, 0.2);
            position: relative;
            z-index: 10000;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .announcement-content {
            display: flex;
            align-items: center;
            gap: 15px;
            animation: fadeIn 1s ease-out;
          }

          .announcement-tag {
            background: var(--primary);
            color: #1a1d24;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.65rem;
            font-weight: 900;
            display: flex;
            align-items: center;
            gap: 4px;
            letter-spacing: 0.5px;
          }

          .announcement-text {
            margin: 0;
            font-size: 0.85rem;
            font-weight: 500;
            letter-spacing: 0.3px;
            color: rgba(255,255,255,0.9);
          }

          .highlight {
            color: var(--primary);
            font-weight: 700;
          }

          .cta-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-left: 15px;
            color: #fff;
            font-weight: 700;
            text-decoration: underline;
            text-decoration-color: var(--primary);
            text-underline-offset: 4px;
            cursor: pointer;
            transition: all 0.3s;
          }

          .cta-link:hover {
            color: var(--primary);
            gap: 10px;
          }

          @media (max-width: 768px) {
            .announcement-text { font-size: 0.75rem; }
            .cta-link { display: none; }
          }
        `}
      </style>
    </div>
  );
};

export default AnnouncementBar;
