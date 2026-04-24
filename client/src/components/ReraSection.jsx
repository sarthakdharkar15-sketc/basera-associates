import React from 'react';
import { ShieldCheck, CheckCircle, Clock, Gavel, FileText, ArrowRight } from 'lucide-react';

const ReraSection = () => {
  const trustPoints = [
    {
      icon: <FileText size={24} />,
      title: "Transparent Pricing",
      desc: "No hidden costs, complete breakdown provided."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Verified Listings",
      desc: "Every property is pre-vetted for legal safety."
    },
    {
      icon: <Clock size={24} />,
      title: "On-Time Delivery",
      desc: "Strict adherence to project timelines and milestones."
    },
    {
      icon: <Gavel size={24} />,
      title: "Full Legal Support",
      desc: "Expert guidance throughout the documentation process."
    }
  ];

  return (
    <section className="rera-showcase-section">
      <div className="container">
        <div className="rera-grid">
          <div className="rera-content-side">
            <div className="trust-badge-pill">
              <ShieldCheck size={16} />
              <span>GOVERNMENT REGISTERED</span>
            </div>
            
            <h2 className="rera-heading">
              RERA Approved Projects – <br />
              <span className="accent-text">Safe & Transparent Investments</span>
            </h2>
            
            <p className="rera-description">
              At Basera Associates, we prioritize your peace of mind. All our properties are 100% RERA registered, 
              ensuring absolute legal compliance, pricing transparency, buyer protection, and guaranteed 
              timely delivery for every homeowner and investor.
            </p>

            <div className="rera-registration-card">
              <div className="reg-icon">
                <CheckCircle size={32} />
              </div>
              <div className="reg-info">
                <span className="reg-label">RERA REGISTERED</span>
                <span className="reg-number">REG NR: PRM/KA/RERA/1251/446/AG/230524</span>
              </div>
            </div>

            <button className="view-rera-btn" onClick={() => window.scrollTo({ top: document.querySelector('.projects-grid-v2').offsetTop - 100, behavior: 'smooth' })}>
              View RERA Projects <ArrowRight size={18} />
            </button>
          </div>

          <div className="rera-points-side">
            <div className="points-grid">
              {trustPoints.map((point, index) => (
                <div key={index} className="trust-point-card">
                  <div className="point-icon-wrapper">
                    {point.icon}
                  </div>
                  <h3>{point.title}</h3>
                  <p>{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .rera-showcase-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #fff9f0 100%);
          padding: 100px 0;
          color: #0f1115;
          position: relative;
          overflow: hidden;
        }

        .rera-showcase-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(195,157,99,0.3), transparent);
        }

        .rera-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .rera-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .trust-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(195, 157, 99, 0.1);
          color: #b08d59;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 25px;
          border: 1px solid rgba(195, 157, 99, 0.2);
        }

        .rera-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-family: 'Outfit', sans-serif;
          line-height: 1.2;
          margin-bottom: 25px;
          color: #1a1d24;
          font-weight: 800;
        }

        .accent-text {
          color: #c39d63;
        }

        .rera-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555;
          max-width: 600px;
          margin-bottom: 40px;
        }

        .rera-registration-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #fff;
          padding: 20px 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          width: fit-content;
          margin-bottom: 40px;
          border: 1px solid rgba(0,0,0,0.03);
          transition: transform 0.3s ease;
        }

        .rera-registration-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(195, 157, 99, 0.15);
        }

        .reg-icon {
          color: #22c55e;
        }

        .reg-info {
          display: flex;
          flex-direction: column;
        }

        .reg-label {
          font-size: 0.7rem;
          font-weight: 800;
          color: #888;
          letter-spacing: 2px;
        }

        .reg-number {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1d24;
          font-family: 'Courier New', monospace;
        }

        .view-rera-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #1a1d24;
          color: #fff;
          border: none;
          padding: 16px 32px;
          border-radius: 100px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .view-rera-btn:hover {
          background: #c39d63;
          transform: translateX(5px);
          box-shadow: 0 10px 25px rgba(195, 157, 99, 0.3);
        }

        /* Points Grid Styling */
        .points-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }

        @media (max-width: 576px) {
          .points-grid {
            grid-template-columns: 1fr;
          }
        }

        .trust-point-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .trust-point-card:hover {
          transform: translateY(-10px);
          background: #fff;
          box-shadow: 0 20px 40px rgba(195, 157, 99, 0.1);
          border-color: rgba(195, 157, 99, 0.3);
        }

        .point-icon-wrapper {
          width: 50px;
          height: 50px;
          background: rgba(195, 157, 99, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c39d63;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .trust-point-card:hover .point-icon-wrapper {
          background: #c39d63;
          color: #fff;
          transform: rotate(10deg);
        }

        .trust-point-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: #1a1d24;
        }

        .trust-point-card p {
          font-size: 0.9rem;
          color: #777;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
};

export default ReraSection;
