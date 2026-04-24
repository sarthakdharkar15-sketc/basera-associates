import React from 'react';
import { Layout, Users, MessageSquare, ShieldCheck, Mail, Zap } from 'lucide-react';
import journeyBg from '../assets/partnership_growth.png';

const BrokerNetwork = () => {
  return (
    <section 
      className="broker-network-section" 
      style={{
        position: 'relative',
        backgroundImage: `url(${journeyBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Top Fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to bottom, #0a0c10, transparent)',
        zIndex: 2
      }}></div>

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, #0a0c10b3, #0a0c10e6)',
        zIndex: 1
      }}></div>

      {/* Bottom Fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to top, #0a0c10, transparent)',
        zIndex: 2
      }}></div>
      {/* Background Connection Visuals */}
      <div className="network-visuals">
        <div className="node n1"></div>
        <div className="node n2"></div>
        <div className="node n3"></div>
        <div className="node n4"></div>
        <svg className="connector-lines" width="100%" height="100%">
          <line x1="10%" y1="20%" x2="40%" y2="50%" className="line-path" />
          <line x1="40%" y1="50%" x2="80%" y2="30%" className="line-path" />
          <line x1="40%" y1="50%" x2="70%" y2="80%" className="line-path" />
        </svg>
      </div>

      <div className="container broker-container">
        <div className="broker-header scroll-reveal">
          <div className="launching-badge">
            <Zap size={14} />
            <span>Launching Soon</span>
          </div>
          <h2 className="broker-title">Coming Soon: <span className="gradient-text">Smart Broker Network</span></h2>
          <p className="broker-subtitle">
            Revolutionizing the real estate ecosystem with a unified, high-tech platform. 
            Connecting brokers, agents, and investors through an intelligent, transparent, 
            and real-time digital architecture.
          </p>
        </div>

        <div className="broker-features-grid">
          {[
            {
              icon: <Layout size={28} />,
              title: "Broker & Agent Dashboard",
              desc: "A powerful command center to manage properties, leads, and teams with zero friction."
            },
            {
              icon: <Users size={28} />,
              title: "Lead Management System",
              desc: "AI-driven lead scoring and distribution to ensure no opportunity falls through the cracks."
            },
            {
              icon: <MessageSquare size={28} />,
              title: "Real-Time Communication",
              desc: "Integrated chat and conferencing tools to close deals faster and keep everyone in sync."
            },
            {
              icon: <ShieldCheck size={28} />,
              title: "Transparent Deal Tracking",
              desc: "Blockchain-inspired transaction logs for ultimate trust and real-time status updates."
            }
          ].map((feature, idx) => (
            <div key={idx} className="feature-card glass-card scroll-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="broker-cta-area scroll-reveal">
          <div className="signup-box glass-card">
            <h3>Get Early Access</h3>
            <p>Be the first to know when the network goes live. Secure your broker spot today.</p>
            <form className="signup-form" onSubmit={async (e) => {
              e.preventDefault();
              const email = e.target.email.value;
              try {
                const res = await fetch('/api/broker-leads', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
                });
                if (res.ok) {
                  alert("High-Five! You're on the list. We'll reach out soon.");
                  e.target.reset();
                }
              } catch (err) { console.error(err); }
            }}>
              <input name="email" type="email" placeholder="Enter your business email" className="signup-input" required />
              <button className="signup-btn" type="submit">
                <Mail size={18} />
                <span>Join as a Broker</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>
        {`
          .broker-network-section {
            position: relative;
            padding: 120px 0;
            overflow: hidden;
            color: #fff;
          }

          .network-visuals {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.3;
          }

          .node {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #4f46e5;
            border-radius: 50%;
            box-shadow: 0 0 15px #4f46e5;
            animation: node-float 4s infinite alternate ease-in-out;
          }

          .n1 { top: 20%; left: 10%; }
          .n2 { top: 50%; left: 40%; animation-delay: 1s; }
          .n3 { top: 30%; left: 80%; animation-delay: 2s; }
          .n4 { top: 80%; left: 70%; animation-delay: 0.5s; }

          .line-path {
            stroke: rgba(79, 70, 229, 0.2);
            stroke-width: 1;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: line-draw 5s infinite;
          }

          @keyframes node-float {
             from { transform: translateY(0); }
             to { transform: translateY(-20px); }
          }

          @keyframes line-draw {
             to { stroke-dashoffset: 0; }
          }

          .broker-container {
            position: relative;
            z-index: 2;
          }

          .broker-header {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 80px;
          }

          .launching-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(90deg, #4f46e5, #7e22ce);
            padding: 6px 16px;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 24px;
            box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
          }

          .broker-title {
            font-size: 3.5rem;
            line-height: 1.1;
            margin-bottom: 24px;
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
          }

          .gradient-text {
            background: linear-gradient(90deg, #60a5fa, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .broker-subtitle {
            font-size: 1.25rem;
            color: rgba(255,255,255,0.7);
            line-height: 1.6;
          }

          .broker-features-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
            margin-bottom: 80px;
            justify-content: center;
          }

          @media (max-width: 1200px) {
            .broker-features-grid { grid-template-columns: repeat(2, 1fr); }
          }

          @media (max-width: 700px) {
            .broker-features-grid { grid-template-columns: 1fr; }
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 28px;
            padding: 45px 35px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .feature-card:hover {
            transform: translateY(-12px);
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(96, 165, 250, 0.4);
            box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          }

          .feature-icon-wrapper {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(126, 34, 206, 0.2));
            color: #60a5fa;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 28px;
            transition: all 0.5s ease;
            border: 1px solid rgba(255,255,255,0.05);
          }

          .feature-card:hover .feature-icon-wrapper {
             background: linear-gradient(135deg, #4f46e5, #7e22ce);
             color: #fff;
             transform: scale(1.1) rotate(5deg);
             box-shadow: 0 0 20px rgba(79, 70, 229, 0.4);
          }

          .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 18px;
            color: #fff;
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
          }

          .feature-card p {
            color: rgba(255,255,255,0.6);
            line-height: 1.6;
            font-size: 1rem;
            max-width: 280px;
          }

          .broker-cta-area {
            max-width: 900px;
            margin: 0 auto;
          }

          .signup-box {
            text-align: center;
            border: 1px solid rgba(168, 85, 247, 0.2);
            background: radial-gradient(circle at top right, rgba(126, 34, 206, 0.1), transparent);
          }

          .signup-box h3 {
            font-size: 2rem;
            margin-bottom: 12px;
          }

          .signup-box p {
            color: rgba(255,255,255,0.7);
            margin-bottom: 30px;
          }

          .signup-form {
            display: flex;
            max-width: 600px;
            margin: 0 auto;
            gap: 12px;
          }

          .signup-input {
            flex: 1;
            background: rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 16px 20px;
            color: #fff;
            font-size: 1rem;
            transition: all 0.3s;
          }

          .signup-input:focus {
            outline: none;
            border-color: #4f46e5;
            background: rgba(0,0,0,0.5);
            box-shadow: 0 0 15px rgba(79, 70, 229, 0.3);
          }

          .signup-btn {
            background: linear-gradient(90deg, #4f46e5, #7e22ce);
            color: #fff;
            border: none;
            border-radius: 12px;
            padding: 0 40px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
          }

          .signup-btn:hover {
            transform: scale(1.02);
            box-shadow: 0 10px 20px rgba(79, 70, 229, 0.4);
          }

          @media (max-width: 768px) {
            .broker-title { font-size: 2.2rem; }
            .signup-form { flex-direction: column; }
            .signup-btn { padding: 16px; justify-content: center; }
          }
        `}
      </style>
    </section>
  );
};

export default BrokerNetwork;
