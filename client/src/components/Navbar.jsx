import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Key, Menu, X, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import FullScreenMenu from './FullScreenMenu';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [upcomingProjects, setUpcomingProjects] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch upcoming projects
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const upcoming = data.filter(p => p.status === 'Upcoming');
        setUpcomingProjects(upcoming);
      })
      .catch(err => console.error(err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
    <FullScreenMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 9995,
      transition: 'all 0.5s var(--apple-spring)',
      background: scrolled ? 'rgba(10, 11, 14, 0.92)' : 'transparent',
      boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none'
    }}>
    <nav className="navbar container" style={{ borderBottom: 'none', height: scrolled ? '70px' : '90px', transition: 'height 0.5s var(--apple-spring)', padding: '0 15px' }}>
      <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
          <img
            src="/logo.png"
            alt="Basera Logo"
            className="navbar-logo"
            style={{
              height: scrolled ? 'clamp(30px, 5vh, 35px)' : 'clamp(35px, 6vh, 45px)',
              width: 'auto',
              transition: 'height 0.3s ease',
            }}
          />
          <span style={{ 
            fontSize: 'clamp(1rem, 4.5vw, 1.4rem)', 
            fontWeight: '800', 
            letterSpacing: '0.5px', 
            fontFamily: "'Outfit', sans-serif",
            color: '#fff',
            lineHeight: 1,
            whiteSpace: 'nowrap'
          }}>Basera Associates<span style={{ color: '#ef4444' }}>.</span></span>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 20px)' }}>
        {/* Core Actions - Kept as requested previously */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1.5vw, 15px)' }}>
          
          {user && user.role === 'admin' && (
            <Link to="/admin" title="Admin Dashboard" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
              <LayoutDashboard size={20} />
            </Link>
          )}

          <div style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-main)', padding: '5px' }}>
              <div onClick={() => setNotificationsOpen(!notificationsOpen)}>
                <Bell size={18} />
                  <span style={{ 
                    position: 'absolute', 
                    top: '-3px', 
                    right: '-3px', 
                    background: '#ef4444', 
                    color: '#000', 
                    borderRadius: '50%', 
                    width: '14px', 
                    height: '14px', 
                    fontSize: '8px', 
                    fontWeight: '800',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <span style={{ 
                      background: '#c39d63', 
                      width: '8px', 
                      height: '100%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      {2 + (upcomingProjects.length > 0 ? 1 : 0)}
                    </span>
                  </span>
              </div>

              {notificationsOpen && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: '-10px',
                  width: 'min(340px, 90vw)',
                  background: 'rgba(20, 22, 27, 0.98)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(20px)',
                  zIndex: 10000,
                  padding: '16px',
                  animation: 'slideDownNav 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>Notifications</span>
                    <button onClick={() => setNotificationsOpen(false)} style={{ background: 'none', border: 'none', color: '#c39d63', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}>
                      Mark all as read
                    </button>
                  </div>
                  
                  <div style={{ maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* First Item */}
                    <div style={{ padding: '14px', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))', border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                      <div style={{ fontSize: '0.65rem', color: '#60a5fa', fontWeight: '700', marginBottom: '6px', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🚀</span> NETWORK LAUNCH
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600', marginBottom: '4px' }}>Coming Soon: Smart Broker Network</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>
                        Join the elite platform for professionals.
                      </div>
                    </div>

                    {/* Second Item */}
                    <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                      <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600', marginBottom: '4px' }}>Welcome to Basera Associates!</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>
                        We are thrilled to have you here, {user ? user.name.split(' ')[0] : 'Guest'}.
                      </div>
                    </div>

                    {/* Third Item */}
                    {upcomingProjects.length > 0 ? (
                      <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <div style={{ fontSize: '0.65rem', color: '#c39d63', fontWeight: '700', marginBottom: '6px', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>✨</span> UPCOMING PROJECT
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600', marginBottom: '4px' }}>{upcomingProjects[0].name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>
                          {upcomingProjects[0].location || 'Explore our newest luxury development.'}
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <div style={{ fontSize: '0.65rem', color: '#c39d63', fontWeight: '700', marginBottom: '6px', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>✨</span> UPCOMING PROJECT
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600', marginBottom: '4px' }}>Jagdish Bhawan</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>
                          Beside Rajhans Dal Bafla, Sarafa Bajaar
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>

          <Link to="/broker-network" style={{ textDecoration: 'none' }}>
            <div className="launching-mini-badge" style={{ padding: '3px 10px', fontSize: '0.65rem' }}>
              <span>Launching</span>
              <div className="pulse-dot"></div>
            </div>
          </Link>

          {user ? (
            <div style={{ position: 'relative' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '5px', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User size={16} />
                <span className="mobile-hide" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', textDecoration: 'none' }}>Login</Link>
          )}
        </div>

        {/* Global Hamburger Toggle */}
        <div 
          onClick={() => setMobileMenuOpen(true)} 
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.1)', 
            width: '40px',
            height: '40px',
            borderRadius: '50%', 
            border: '1px solid rgba(255,255,255,0.15)',
            transition: 'all 0.3s' 
          }}
        >
          <Menu size={20} color="#ffffff" />
        </div>
      </div>
    </nav>
    </div>
    </>
  );
}

export default Navbar;
