import { X, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const FullScreenMenu = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000000',
      zIndex: 100000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeInMenu 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      color: '#ffffff',
      overflowY: 'auto',
      paddingBottom: '50px'
    }}>
      <style>{`
        @keyframes fadeInMenu {
          from { opacity: 0; backdrop-filter: blur(0px); transform: scale(1.05); }
          to { opacity: 1; backdrop-filter: blur(30px); transform: scale(1); }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fs-menu-item {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 200;
          letter-spacing: 6px;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          text-transform: uppercase;
          margin: 12px 0;
          font-family: 'Outfit', sans-serif;
          position: relative;
          padding: 8px 20px;
        }
        .fs-menu-item:hover {
          color: #ffffff;
          transform: scale(1.05);
          letter-spacing: 10px;
          text-shadow: 0 0 20px rgba(255,255,255,0.4);
        }
        .fs-menu-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: #ffffff;
          transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
        }
        .fs-menu-item:hover::after {
          width: 80%;
        }
        
        /* Highlight Item Styles */
        .fs-highlight-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 35px 0 25px 0;
          animation: floatIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          animation-delay: 0.3s;
          text-decoration: none;
          position: relative;
        }
        .highlight-title-wrapper {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
        }
        .highlight-title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 500;
          letter-spacing: 8px;
          color: #ffffff;
          text-transform: uppercase;
          font-family: "Playfair Display", "Times New Roman", serif;
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          text-shadow: 0 0 15px rgba(255,255,255,0.2);
        }
        .highlight-tag {
          background: rgba(195, 157, 99, 0.15);
          border: 1px solid rgba(195, 157, 99, 0.5);
          color: #c39d63;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          white-space: nowrap;
          text-transform: uppercase;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .highlight-subtitle {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 3px;
          margin-top: 10px;
          text-transform: uppercase;
          transition: color 0.4s ease;
          font-family: 'Outfit', sans-serif;
        }
        .fs-highlight-item:hover .highlight-title {
          transform: scale(1.05);
          letter-spacing: 12px;
          color: #c39d63;
          text-shadow: 0 0 30px rgba(195, 157, 99, 0.5);
        }
        .fs-highlight-item:hover .highlight-subtitle {
          color: rgba(195, 157, 99, 0.8);
        }
        .fs-highlight-item:hover .highlight-tag {
          background: #c39d63;
          color: #111;
          border-color: #c39d63;
          box-shadow: 0 0 15px rgba(195, 157, 99, 0.4);
        }
        .highlight-glow-bar {
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: #c39d63;
          box-shadow: 0 0 15px 2px rgba(195, 157, 99, 0.6);
          transition: width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .fs-highlight-item:hover .highlight-glow-bar {
          width: 100%;
        }

        .fs-taskbar {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(40px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          position: relative;
        }
        .win-icon {
          width: 28px;
          height: 28px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .win-icon:hover {
          background: rgba(255,255,255,0.25);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(255,255,255,0.1);
        }
        .win-icon.start {
          background: linear-gradient(135deg, #00A4EF, #0078D7);
          border-radius: 6px;
        }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '40px 6vw', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img 
            src="/logo.png" 
            alt="Basera" 
            style={{ height: '45px', width: 'auto', objectFit: 'contain' }} 
          />
          <span style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '2px', color: '#fff', fontFamily: "'Outfit', sans-serif" }}>
            Basera Associates<span style={{ color: '#ef4444' }}>.</span>
          </span>
        </div>
        <button onClick={onClose} style={{
          background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', transition: 'transform 0.4s ease'
        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}>
          <X size={44} strokeWidth={1} color="#ffffff" />
        </button>
      </div>

      {/* Center Menu */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/" className="fs-menu-item" onClick={onClose}>HOME</Link>
        <Link to="/about" className="fs-menu-item" onClick={onClose}>ABOUT US</Link>
        <Link to="/services" className="fs-menu-item" onClick={onClose}>SERVICES</Link>
        <Link to="/portfolio" className="fs-menu-item" onClick={onClose}>PORTFOLIO</Link>
        <Link to="/altamount-crown" className="fs-menu-item" onClick={onClose}>ALTAMOUNT CROWN</Link>
        <Link to="/coastal-villas" className="fs-menu-item" onClick={onClose}>EXCLUSIVE COASTAL COLLECTION</Link>
        <Link to="/#projects" className="fs-menu-item" onClick={onClose}>PROJECTS</Link>
        <Link to="/rera-compliance" className="fs-menu-item" onClick={onClose}>RERA COMPLIANCE</Link>
        <Link to="/vastu-homes" className="fs-menu-item" onClick={onClose}>VASTU COMPLIANT HOMES</Link>
        
        {/* New Premium Sections */}
        <Link to="/broker-network" className="fs-menu-item" onClick={onClose}>SMART BROKER NETWORK</Link>
        <Link to="/pricing" className="fs-menu-item" onClick={onClose}>MEMBERSHIP PLANS</Link>
        
        <Link to="/extra-ordinary" className="fs-menu-item" onClick={onClose}>EXTRAORDINARY MOMENTS</Link>
        

        <Link to="/#footer" className="fs-menu-item" onClick={onClose}>CONTACT</Link>
        
        {user?.role === 'admin' && (
          <Link to="/admin" className="fs-menu-item" onClick={onClose} style={{ color: 'var(--primary)', marginTop: '40px', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 'bold' }}>
            <ShieldCheck size={32} /> ADMIN CONSOLE
          </Link>
        )}
      </div>

      {/* Bottom Section */}
      <div>
        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', width: '100%' }}></div>
        <div className="fs-taskbar">
           {/* Simulated Windows 11 Taskbar Icons */}
           <div className="win-icon start"></div>
           <div className="win-icon" style={{ borderRadius: '50%' }}></div>
           <div className="win-icon" style={{ borderRadius: '8px' }}></div>
           <div className="win-icon" style={{ width: '40px', background: 'rgba(255,255,255,0.05)' }}></div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenMenu;
