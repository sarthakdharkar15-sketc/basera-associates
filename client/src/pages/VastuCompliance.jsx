import React, { useEffect } from 'react';
import { Compass, Sun, Wind, Moon, Star, Layout, CheckCircle2 } from 'lucide-react';

const VastuCompliance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="vastu-page animate-fade-in">
      {/* Premium Hero Section */}
      <section className="vastu-hero">
        <div className="vastu-hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            <div className="vastu-badge click-interaction">
              <Compass size={40} />
            </div>
            <h1 className="hero-title">Vastu <span className="gold-text">Compliant</span> <br /> Luxury Homes</h1>
            <p className="hero-subtitle">Harmonizing ancient architectural wisdom with modern luxury living.</p>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="mouse"></div>
        </div>
      </section>

      {/* The Science of Vastu Section */}
      <section className="vastu-info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-text">
              <div className="tag">THE SCIENCE OF SPACE</div>
              <h2>Energy Flow & <span className="gold-text">Prosperity</span></h2>
              <p>
                Vastu Shastra is more than just a tradition; it's the science of balancing the five elements—Earth, Water, Fire, Air, and Space. At Basera Associates, we ensure that every square foot of your home is aligned to maximize positive energy (Prana) and attract prosperity.
              </p>
              <ul className="modern-list">
                <li><CheckCircle2 color="var(--primary)" size={20} /> Optimized Multi-Directional Ventilation</li>
                <li><CheckCircle2 color="var(--primary)" size={20} /> Calculated Solar Energy Intake</li>
                <li><CheckCircle2 color="var(--primary)" size={20} /> Elemental Zoning Alignment</li>
              </ul>
            </div>
            <div className="info-visual">
                <div className="vastu-mandala-container click-interaction">
                  <div className="outer-glow"></div>
                  <div className="mystic-ring r-zodiac"></div>
                  <div className="mystic-ring r-star"></div>
                  <div className="cardinal-directions">
                    <span className="cardinal-label label-n">N</span>
                    <span className="cardinal-label label-s">S</span>
                    <span className="cardinal-label label-e">E</span>
                    <span className="cardinal-label label-w">W</span>
                  </div>
                  <div className="mandala-center">
                    <div className="center-flare"></div>
                    <Compass size={50} color="var(--primary)" strokeWidth={1} style={{ position: 'relative', zIndex: 11 }} />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directional Benefits Grid */}
      <section className="vastu-directions-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="title-large">Directional <span className="gold-text">Excellence</span></h2>
            <p className="subtitle-main">How each corner of a Basera home serves your well-being.</p>
          </div>

          <div className="directions-grid">
            <div className="dir-card glass-card click-interaction">
              <div className="dir-icon-box"><Sun /></div>
              <h3>East (Ishanya)</h3>
              <p>The source of enlightenment. We place entrances or meditation halls here to capture the morning’s vitalizing energy.</p>
            </div>
            <div className="dir-card glass-card click-interaction">
              <div className="dir-icon-box"><Moon /></div>
              <h3>North (Kuber)</h3>
              <p>The direction of wealth. Our residential plans prioritize open spaces in the north to allow flow of financial prosperity.</p>
            </div>
            <div className="dir-card glass-card click-interaction">
              <div className="dir-icon-box"><Star /></div>
              <h3>Southwest (Niruti)</h3>
              <p>The zone of stability. Master bedrooms are positioned here to ensure heavy positive grounding and restorative sleep.</p>
            </div>
            <div className="dir-card glass-card click-interaction">
              <div className="dir-icon-box"><Layout /></div>
              <h3>Northeast (Water)</h3>
              <p>The spiritual core. Designed to remain light and clean, often featuring elegant water elements or quiet corners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="vastu-promise-section">
        <div className="container">
          <div className="vastu-cta-card luxury-glass">
            <div className="cta-icon-wrapper">
               <CheckCircle2 size={50} color="var(--primary)" />
            </div>
            <h2>The Basera Vastu <span className="gold-text">Audit</span></h2>
            <p>
              Every property listed under our "Vastu Compliant" category undergoes a 32-point check by certified experts to ensure total elemental harmony before it reaches you.
            </p>
            <div className="vastu-divider"></div>
            <a href="tel:+919876543210" className="btn btn-primary" style={{ padding: '20px 50px', borderRadius: '50px', fontSize: '1.1rem' }}>Speak to a Vastu Expert</a>
          </div>
        </div>
      </section>

      <style>{`
        .vastu-page {
          background: #0a0c10;
          color: #fff;
          overflow-x: hidden;
        }

        .gold-text { color: var(--primary); }

        /* Hero */
        .vastu-hero {
          height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          text-align: center;
          background: #000;
        }

        .vastu-hero-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: url('https://images.unsplash.com/photo-1628592102751-ba83b0314276?q=80&w=1997') center/cover no-repeat;
          opacity: 0.4;
          filter: saturate(0.5);
        }

        .hero-content { position: relative; z-index: 10; padding: 0 20px; }

        .vastu-badge {
          width: 80px; height: 80px;
          background: rgba(195,157,99,0.1);
          border: 1px solid var(--primary);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 30px;
          color: var(--primary);
          box-shadow: 0 0 30px rgba(195,157,99,0.2);
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -2px;
          margin-bottom: 25px;
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          color: rgba(255,255,255,0.6);
          max-width: 800px;
          margin: 0 auto;
          font-weight: 300;
        }

        /* Detailed Info Section */
        .vastu-info-section { padding: 150px 0; background: #0a0c10; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }

        .tag { color: var(--primary); font-weight: 900; letter-spacing: 3px; font-size: 0.8rem; margin-bottom: 20px; }
        .info-text h2 { font-size: 3.5rem; font-family: 'Outfit', sans-serif; margin-bottom: 30px; font-weight: 800; }
        .info-text p { font-size: 1.25rem; line-height: 1.8; color: #a0a5b1; margin-bottom: 40px; }

        .modern-list { list-style: none; padding: 0; }
        .modern-list li { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; font-size: 1.1rem; color: #fff; }

        .vastu-mandala-container {
          position: relative;
          width: 500px; height: 500px;
          display: flex; align-items: center; justify-content: center;
          perspective: 1200px;
        }

        .mystic-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(195,157,99,0.3);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .outer-glow {
          position: absolute;
          width: 110%; height: 110%;
          background: radial-gradient(circle, rgba(195,157,99,0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse-glow 5s infinite alternate ease-in-out;
        }

        @keyframes pulse-glow {
          from { transform: scale(0.9); opacity: 0.3; }
          to { transform: scale(1.1); opacity: 0.6; }
        }

        .r-zodiac { 
          width: 100%; height: 100%; 
          border: 2px solid rgba(195,157,99,0.4);
          animation: spin-slow 80s linear infinite;
          background: url('https://images.unsplash.com/photo-1599420186946-7b6fb4eaba23?q=80&w=1974') center/cover;
          opacity: 0.3;
          mask-image: radial-gradient(circle, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle, black 30%, transparent 100%);
        }

        .r-star {
          width: 80%; height: 80%;
          border: 1px solid rgba(195,157,99,0.4);
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          animation: spin-slow 40s linear reverse infinite;
          background: linear-gradient(45deg, var(--primary), transparent);
          opacity: 0.15;
        }

        .cardinal-directions {
          position: absolute;
          width: 85%; height: 85%;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
          z-index: 8;
          animation: spin-slow 40s linear reverse infinite;
        }

        .cardinal-label {
          position: absolute;
          color: var(--primary);
          font-weight: 900;
          font-size: 1.2rem;
          text-shadow: 0 0 10px rgba(195,157,99,0.5);
          letter-spacing: 2px;
        }

        .label-n { top: 0; }
        .label-s { bottom: 0; }
        .label-e { right: 0; }
        .label-w { left: 0; }

        .mandala-center {
          width: 120px; height: 120px;
          background: #000;
          border: 2px solid var(--primary);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 40px var(--primary);
          z-index: 10;
          position: relative;
        }

        .center-flare {
          position: absolute;
          width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(195,157,99,0.4) 0%, transparent 70%);
          animation: flare 2s infinite alternate ease-in-out;
          pointer-events: none;
        }

        @keyframes flare {
          from { transform: scale(0.8); opacity: 0.5; }
          to { transform: scale(1.2); opacity: 1; }
        }

        .vastu-mandala-container:hover .r-zodiac { opacity: 0.6; transform: scale(1.05); }
        .vastu-mandala-container:hover .mandala-center { transform: scale(1.1) translateZ(30px); }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Directions Grid */
        .vastu-directions-section { padding: 120px 0; background: #111419; }
        .title-large { font-size: 3.5rem; font-family: 'Outfit', sans-serif; font-weight: 800; }
        .subtitle-main { color: #a0a5b1; font-size: 1.4rem; margin-bottom: 60px; }

        .directions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .dir-card {
          padding: 60px 30px;
          text-align: center;
          border-radius: 30px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.4s ease;
        }

        .dir-card:hover {
          transform: translateY(-15px);
          background: rgba(195,157,99,0.05);
          border-color: var(--primary);
        }

        .dir-icon-box { color: var(--primary); margin-bottom: 30px; transform: scale(1.5); }
        .dir-card h3 { font-size: 1.6rem; margin-bottom: 15px; font-weight: 700; }
        .dir-card p { color: #a0a5b1; line-height: 1.6; }

        /* Promise Section */
        .vastu-promise-section { padding: 150px 0; }
        .vastu-cta-card {
           max-width: 1100px;
           margin: 0 auto;
           padding: 120px 60px;
           text-align: center;
           background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
           border-radius: 60px;
           border: 1px solid rgba(195,157,99,0.3);
        }

        .cta-icon-wrapper { margin-bottom: 40px; }
        .vastu-cta-card h2 { font-size: 3.5rem; font-family: 'Outfit', sans-serif; margin-bottom: 25px; font-weight: 900; }
        .vastu-cta-card p { font-size: 1.4rem; color: #a0a5b1; max-width: 800px; margin: 0 auto 50px auto; line-height: 1.6; }

        .vastu-divider {
          width: 100px; height: 4px;
          background: var(--primary);
          margin: 0 auto 50px;
          border-radius: 10px;
          box-shadow: 0 0 20px var(--primary);
        }

        .click-interaction { cursor: pointer; transition: transform 0.2s; }
        .click-interaction:active { transform: scale(0.95); }

        @media (max-width: 992px) {
          .info-grid { grid-template-columns: 1fr; gap: 60px; text-align: center; }
          .modern-list li { justify-content: center; }
          .vastu-mandala-container { width: 300px; height: 300px; margin: 0 auto; }
          .directions-grid { grid-template-columns: 1fr; }
          .vastu-cta-card { padding: 80px 30px; }
          .hero-title { font-size: 3rem; }
        }
      `}</style>
    </div>
  );
};

export default VastuCompliance;
