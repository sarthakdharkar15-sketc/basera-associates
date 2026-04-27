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
                  width: 'min(300px, 85vw)', // Responsive width
                  background: 'rgba(10, 11, 14, 0.98)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(20px)',
                  zIndex: 10000,
                  padding: '12px 0',
                  animation: 'slideDownNav 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}>
                  <div style={{ padding: '0 15px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#c39d63', letterSpacing: '1px' }}>NOTIFICATIONS</span>
                    <button onClick={() => setNotificationsOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
                      <X size={14} />
                    </button>
                  </div>
                  
                  <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {upcomingProjects.length > 0 && (
                      <div style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                        <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: '600', marginBottom: '2px' }}>New Project Alert</div>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.4' }}>
                          {upcomingProjects[0].name} has been added.
                        </div>
                      </div>
                    )}
                    
                    <div style={{ padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                      <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: '600', marginBottom: '2px' }}>Welcome</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.4' }}>
                        Explore our luxury collection.
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ padding: '10px 15px 0', textAlign: 'center' }}>
                    <Link to="/portfolio" style={{ fontSize: '0.65rem', color: '#c39d63', textDecoration: 'none', fontWeight: '700' }} onClick={() => setNotificationsOpen(false)}>
                      VIEW ALL
                    </Link>
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
