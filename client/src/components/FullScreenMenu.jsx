import { X, ShieldCheck, Home, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const FullScreenMenu = ({ isOpen, onClose }) => {
  const { user, logout } = useContext(AuthContext);
  const [notificationCount, setNotificationCount] = useState(3);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [upcomingProjectsList, setUpcomingProjectsList] = useState([]);

  useEffect(() => {
    // Fetch upcoming projects to determine count if needed, 
    // but for now mirroring the Navbar logic or using a default
    fetch('/api/projects')
      .then(data => {
        const upcoming = data.filter(p => p.status === 'Upcoming');
        setUpcomingProjectsList(upcoming);
        setNotificationCount(2 + (upcoming.length > 0 ? 1 : 0));
      })
      .catch(() => setNotificationCount(3));
  }, []);

  if (!isOpen) return null;

  const menuLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PORTFOLIO', path: '/portfolio' },
    { name: 'ALTAMOUNT CROWN', path: '/altamount-crown' },
    { name: 'EXCLUSIVE COASTAL COLLECTION', path: '/coastal-villas' },
    { name: 'PROJECTS', path: '/#projects' },
    { name: 'RERA COMPLIANCE', path: '/rera-compliance' },
    { name: 'VASTU COMPLIANT HOMES', path: '/vastu-homes' },
    { name: 'SMART BROKER NETWORK', path: '/broker-network' },
    { name: 'MEMBERSHIP PLANS', path: '/pricing' },
    { name: 'EXTRAORDINARY MOMENTS', path: '/extra-ordinary' },
    { name: 'CONTACT', path: '/#footer' },
  ];

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
      animation: 'fadeInMenu 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      color: '#ffffff',
      overflowX: 'hidden'
    }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInMenu {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fs-menu-item {
          font-size: clamp(1.2rem, 5.5vw, 1.5rem);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.4s ease;
          padding: 12px 20px;
          display: block;
          width: 100%;
          text-align: center;
          letter-spacing: 2px;
          font-family: 'Outfit', sans-serif;
          text-transform: uppercase;
        }
        .fs-menu-item:hover {
          color: #ffffff;
          letter-spacing: 4px;
        }
        .admin-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #c39d63;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 1rem;
          text-decoration: none;
          margin-top: 40px;
          transition: all 0.3s;
        }
        .admin-link:hover {
          opacity: 0.8;
          transform: scale(1.05);
        }
      `}</style>
      
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 25px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Home size={20} strokeWidth={1.5} />
          <span style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '0.5px', fontFamily: "'Outfit', sans-serif" }}>
            Basera Associates<span style={{ color: '#ef4444' }}>.</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Bell size={22} strokeWidth={1.5} />
            <span style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-8px', 
              background: '#ef4444', 
              color: '#000', 
              borderRadius: '50%', 
              width: '18px', 
              height: '18px', 
              fontSize: '10px', 
              fontWeight: '800',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <span style={{ 
                background: '#c39d63', 
                width: '10px', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {notificationCount}
              </span>
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', padding: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', position: 'relative' }}>
        
        {notificationsOpen ? (
          <div style={{ 
            width: '100%', 
            maxWidth: '500px', 
            animation: 'fadeInUp 0.5s ease forwards',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '2px', color: '#c39d63' }}>NOTIFICATIONS</h3>
              <button 
                onClick={() => setNotificationsOpen(false)}
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '8px 15px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                BACK TO MENU
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {upcomingProjectsList.length > 0 && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '15px', borderLeft: '4px solid #c39d63' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '5px', color: '#fff' }}>New Project Added</div>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                    {upcomingProjectsList[0].name} has been added to our exclusive collection. Explore the new luxury standards.
                  </p>
                  <Link to="/portfolio" onClick={onClose} style={{ color: '#c39d63', fontSize: '0.8rem', textDecoration: 'none', fontWeight: '700', marginTop: '10px', display: 'inline-block' }}>
                    VIEW PROJECT DETAILS
                  </Link>
                </div>
              )}

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '5px', color: '#fff' }}>Welcome to Basera Associates</div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                  Experience India's most curated luxury real estate portfolio. From coastal villas to urban skyscrapers.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '5px', color: '#fff' }}>Market Update</div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                  Luxury real estate market shows a 15% growth in high-end coastal properties this quarter.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuLinks.map((link, idx) => (
            <Link 
              key={idx} 
              to={link.path} 
              className="fs-menu-item" 
              onClick={onClose}
              style={{ 
                animation: `slideUpLink 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + idx * 0.03}s forwards`, 
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              {link.name}
            </Link>
          ))}
          
          <style>{`
            @keyframes slideUpLink {
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {user && user.role === 'admin' ? (
            <Link to="/admin" className="admin-link" onClick={onClose}>
              <ShieldCheck size={18} /> ADMIN CONSOLE
            </Link>
          ) : (
            <Link to="/auth" className="admin-link" onClick={onClose} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '30px' }}>
               LOGIN / SIGN UP
            </Link>
          )}

          {user && (
            <button 
              onClick={() => { logout(); onClose(); }} 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'rgba(255,255,255,0.3)', 
                fontSize: '0.7rem', 
                letterSpacing: '2px', 
                marginTop: '20px', 
                cursor: 'pointer' 
              }}
            >
              LOGOUT
            </button>
          )}
        </div>
      )}
      </div>

      {/* Subtle Copyright */}
      <div style={{ padding: '20px', textAlign: 'center', opacity: 0.2, fontSize: '0.6rem', letterSpacing: '2px' }}>
         © 2026 BASERA ASSOCIATES
      </div>
    </div>
  );
};

export default FullScreenMenu;
