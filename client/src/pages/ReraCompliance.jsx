import React, { useEffect, useState } from 'react';
import { ShieldCheck, Info, FileCheck, ShieldAlert, CheckCircle2, Gavel } from 'lucide-react';

const ReraCompliance = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rera-page animate-fade-in">
      {/* Hero Section */}
      <section className="rera-hero">
        <div className="container">
          <div className="hero-content">
            <div className="icon-badge-wrapper click-interaction">
              <ShieldCheck size={48} className="hero-badge-icon" />
            </div>
            <h1>RERA <span className="highlight">Compliance</span> <br /> & Legal Transparency</h1>
            <p>Ensuring absolute legal safety, buyer protection, and trust in every Basera transaction.</p>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Section 1: What is RERA? */}
      <section className="rera-section section-light">
        <div className="container">
          <div className="content-grid">
            <div className="text-content">
              <div className="section-tag">GUIDELINES</div>
              <h2>Section 1: What is <span className="primary-text">RERA?</span></h2>
              <p>
                The Real Estate (Regulation and Development) Act, 2016 (RERA) is a landmark legislation by the Parliament of India designed to protect home-buyers and boost investments in the real estate industry.
              </p>
              <p>
                Established to bring order to the sector, RERA addresses critical issues like project completion delays, pricing transparency, and construction quality. It ensures that the real estate market operates with professional accountability and trust.
              </p>
            </div>
            <div className="card-content">
              <div className="info-glass-card click-interaction">
                <img 
                  src="/rera-badge.png" 
                  alt="RERA Official Badge" 
                  style={{ width: '120px', height: 'auto', marginBottom: '20px', filter: 'drop-shadow(0 0 10px rgba(195,157,99,0.3))' }} 
                />
                <h3>Regulated Excellence</h3>
                <p>A unified legal framework across India to standardize and professionalize the estate market.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why It Matters */}
      <section className="rera-section section-dark">
        <div className="container">
          <div className="section-header text-center mb-5">
             <h2 className="section-title">Section 2: Why It <span className="primary-text">Matters</span></h2>
             <p className="section-subtitle">Comprehensive protection for every investor and homeowner.</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card luxury-glass click-interaction">
              <div className="benefit-icon-box"><ShieldAlert /></div>
              <h3>Buyer Protection</h3>
              <p>Strict rules prevent the diversion of project funds, ensuring your investment is used exclusively for your home.</p>
            </div>
            <div className="benefit-card luxury-glass click-interaction">
              <div className="benefit-icon-box"><FileCheck /></div>
              <h3>Transparency</h3>
              <p>Developers are legally mandated to share detailed project plans, timelines, and floor area measurements.</p>
            </div>
            <div className="benefit-card luxury-glass click-interaction">
              <div className="benefit-icon-box"><Gavel /></div>
              <h3>Legal Safety</h3>
              <p>RERA creates a specialized tribunal for fast-track dispute resolution and heavy penalties for non-compliance.</p>
            </div>
            <div className="benefit-card luxury-glass click-interaction">
              <div className="benefit-icon-box"><CheckCircle2 /></div>
              <h3>Absolute Trust</h3>
              <p>Every RERA-registered project has been vetted for title deeds, land approvals, and structural plans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Basera Compliance Statement */}
      <section className="rera-section compliance-statement-section">
        <div className="container">
          <div 
            className={`compliance-quote-card luxury-glass ${isVerified ? 'verified-state' : ''}`}
            onClick={() => setIsVerified(!isVerified)}
          >
            <div className="quote-shield">
              {isVerified ? <CheckCircle2 size={60} color="#22c55e" /> : <ShieldCheck size={60} />}
            </div>
            <h2 className="statement-heading">Section 3: Basera <span className="primary-text">Compliance Statement</span></h2>
            <blockquote className="compliance-quote">
              {isVerified ? 
                "“This project is verified under the Basera Gold Standard. Our legal documentation matches RERA portal records 1:1 for your security.”" : 
                "“Basera Associates ensures that all our projects are fully RERA approved, following strict government regulations and legal standards. This guarantees transparency, safety, and complete trust for our buyers and investors.”"
              }
            </blockquote>
            <div className="gold-separator"></div>
            <p className="statement-footer">
              {isVerified ? "VERIFIED BY BASERA ASSOCIATES LEGAL TEAM" : "Our commitment to legality is our commitment to you."}
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .rera-page {
          background: #0a0c10;
          color: #fff;
          cursor: default;
        }

        /* Click Animations */
        .click-interaction {
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
        }

        .click-interaction:active {
          transform: scale(0.94);
        }

        .rera-hero {
          min-height: 70vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070') center/cover no-repeat fixed;
          text-align: center;
        }

        .hero-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, rgba(10, 12, 16, 0.4), #0a0c10);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          padding: 0 20px;
        }

        .icon-badge-wrapper {
          width: 90px;
          height: 90px;
          background: rgba(195, 157, 99, 0.1);
          border: 1px solid rgba(195, 157, 99, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 30px;
          color: var(--primary);
          animation: pulse-gold 3s infinite;
        }

        @keyframes pulse-gold {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(195,157,99,0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(195,157,99,0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(195,157,99,0); }
        }

        .hero-content h1 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-family: 'Outfit', sans-serif;
          margin-bottom: 25px;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .highlight { color: var(--primary); }

        .rera-section { padding: 120px 0; }
        .section-light { background: #111419; }
        .section-dark { background: #0a0c10; }

        .content-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .section-tag {
          color: var(--primary);
          letter-spacing: 4px;
          font-size: 0.8rem;
          font-weight: 900;
          margin-bottom: 15px;
        }

        .primary-text { color: var(--primary); }

        .text-content h2 {
          font-size: 3rem;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 30px;
        }

        .text-content p {
          font-size: 1.1rem;
          line-height: 1.9;
          color: #a0a5b1;
          margin-bottom: 25px;
        }

        .info-glass-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          padding: 50px;
          border-radius: 30px;
          text-align: center;
        }

        .info-glass-card:hover {
          border-color: var(--primary);
        }

        .card-icon { color: var(--primary); margin-bottom: 20px; }

        .section-title { font-size: 3rem; font-family: 'Outfit', sans-serif; }
        .section-subtitle { color: #a0a5b1; font-size: 1.2rem; }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }

        .benefit-card {
          padding: 45px 30px;
          border-radius: 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          text-align: center;
        }

        .benefit-card:hover {
          background: rgba(195,157,99,0.08);
          border-color: var(--primary);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .benefit-icon-box {
          width: 70px; height: 70px;
          background: rgba(195,157,99,0.1);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 25px;
          color: var(--primary);
        }

        .benefit-card h3 { font-size: 1.4rem; margin-bottom: 15px; }
        .benefit-card p { color: #a0a5b1; font-size: 0.95rem; line-height: 1.6; }

        .compliance-quote-card {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
          padding: 100px 50px;
          border-radius: 40px;
          background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid rgba(195, 157, 99, 0.2);
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .compliance-quote-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }

        .verified-state {
          border-color: #22c55e !important;
          background: rgba(34, 197, 94, 0.05) !important;
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.1) !important;
        }

        .quote-shield { color: var(--primary); margin-bottom: 40px; transition: all 0.5s ease; }

        .compliance-quote {
          font-size: clamp(1.4rem, 4vw, 2.2rem);
          font-family: 'Outfit', sans-serif;
          font-style: italic;
          line-height: 1.5;
          margin: 0 auto 40px;
          max-width: 800px;
          color: #fff;
          transition: all 0.5s ease;
        }

        .gold-separator {
          width: 80px; height: 3px;
          background: var(--primary);
          margin: 0 auto 30px;
          border-radius: 2px;
          transition: all 0.5s ease;
        }

        .verified-state .gold-separator {
          background: #22c55e;
          width: 150px;
        }

        .statement-footer {
          color: var(--primary);
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.9rem;
          transition: all 0.5s ease;
        }

        .verified-state .statement-footer {
          color: #22c55e;
        }

        @media (max-width: 992px) {
          .content-grid { grid-template-columns: 1fr; gap: 50px; }
          .text-content h2 { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
};

export default ReraCompliance;
