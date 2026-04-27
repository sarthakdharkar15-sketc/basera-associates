import { X, Sparkles, ShieldCheck, User, LogIn, Bell, Home, Info, Briefcase, LayoutGrid, Gem, MapPin, Scale, Compass, Users, CreditCard, Camera, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const FullScreenMenu = ({ isOpen, onClose }) => {
  const { user, logout } = useContext(AuthContext);
  if (!isOpen) return null;

  const menuLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'About Us', path: '/about', icon: <Info size={20} /> },
    { name: 'Services', path: '/services', icon: <Briefcase size={20} /> },
    { name: 'Portfolio', path: '/portfolio', icon: <LayoutGrid size={20} /> },
    { name: 'Altamount Crown', path: '/altamount-crown', icon: <Gem size={20} /> },
    { name: 'Coastal Luxury', path: '/coastal-villas', icon: <MapPin size={20} /> },
    { name: 'Projects', path: '/#projects', icon: <LayoutGrid size={20} /> },
    { name: 'RERA Compliance', path: '/rera-compliance', icon: <Scale size={20} /> },
    { name: 'Vastu Homes', path: '/vastu-homes', icon: <Compass size={20} /> },
    { name: 'Broker Network', path: '/broker-network', icon: <Users size={20} /> },
    { name: 'Membership Plans', path: '/pricing', icon: <CreditCard size={20} /> },
    { name: 'Moments', path: '/extra-ordinary', icon: <Camera size={20} /> },
    { name: 'Contact', path: '/#footer', icon: <PhoneCall size={20} /> },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(5, 6, 8, 0.98)',
      backdropFilter: 'blur(30px)',
      zIndex: 100000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeInMenu 0.4s var(--apple-spring) forwards',
      color: '#ffffff',
      overflowX: 'hidden'
    }}>
      <style>{`
        @keyframes fadeInMenu {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .fs-menu-item {
          font-size: clamp(1rem, 3.5vw, 1.3rem);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 10px 25px;
          display: flex;
          align-items: center;
          justify-content: center; /* Center Content */
          gap: 15px;
          border-radius: 12px;
          width: 95%;
          max-width: 400px; /* Constrain width for better centering look */
          border: 1px solid transparent;
          text-align: center;
        }
        .fs-menu-item:hover {
          color: var(--primary);
          background: rgba(195, 157, 99, 0.1);
          border-color: rgba(195, 157, 99, 0.2);
          transform: scale(1.05); /* Change animation from translateX to scale for centered feel */
        }
        .fs-btn {
          width: 90%;
          max-width: 300px;
          padding: 14px;
          border-radius: 100px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 8px 0;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          font-size: 0.9rem;
        }
      `}</style>
      
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '25px 20px', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="Basera" style={{ height: '30px', width: 'auto' }} />
          <span style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '1px' }}>BASERA ASSOCIATES<span style={{ color: '#ef4444' }}>.</span></span>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '8px', borderRadius: '50%' }}>
          <X size={24} />
        </button>
      </div>

      {/* Main Scrollable Content - Centered */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '30px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        
        {/* Profile Section - Centered */}
        {user ? (
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px 20px', borderRadius: '20px', width: '90%', maxWidth: '350px', marginBottom: '25px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
            <div style={{ background: 'var(--primary)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
              <User size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{user.name}</h3>
              <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{user.role} Account</p>
            </div>
          </div>
        ) : (
          <Link to="/auth" className="fs-btn" onClick={onClose} style={{ background: 'var(--primary)', color: '#fff', marginBottom: '25px' }}>
            <LogIn size={18} /> Login / Sign Up
          </Link>
        )}

        {/* Dynamic Menu Links - All centered with staggered animation */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          {menuLinks.map((link, idx) => (
            <Link 
              key={idx} 
              to={link.path} 
              className="fs-menu-item" 
              onClick={onClose}
              style={{ animation: `fadeInMenu 0.4s var(--apple-spring) ${0.1 + idx * 0.03}s forwards`, opacity: 0 }}
            >
              <span style={{ color: 'var(--primary)', flexShrink: 0 }}>{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Footer Actions */}
        <div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
          {user && (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="fs-btn" onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}>
                  <ShieldCheck size={18} /> Admin Dashboard
                </Link>
              )}
              <button onClick={() => { logout(); onClose(); }} className="fs-btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                 Logout and Exit
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ padding: '20px', textAlign: 'center', opacity: 0.3, fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
         &copy; 2026 BASERA ASSOCIATES
      </div>
    </div>
  );
};

export default FullScreenMenu;
