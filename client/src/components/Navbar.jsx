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
      background: scrolled ? 'rgba(10, 11, 14, 0.75)' : 'transparent',
      boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.2)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none'
    }}>
    <nav className="navbar container" style={{ borderBottom: 'none', height: scrolled ? '70px' : '90px', transition: 'height 0.5s var(--apple-spring)' }}>
      <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
          <img
            src="/logo.png"
            alt="Basera Logo"
            className="navbar-logo"
            style={{
              height: '45px',
              width: 'auto',
              objectFit: 'contain',
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
          <span style={{ 
            fontSize: '1.6rem', 
            fontWeight: '800', 
            letterSpacing: '1px', 
            fontFamily: "'Outfit', sans-serif",
            color: '#fff',
            lineHeight: 1
          }}>Basera Associates<span style={{ color: '#ef4444' }}>.</span></span>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        {/* User / Authentication / Notifications */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Admin Dashboard Quick Access */}
          {user && user.role === 'admin' && (
            <Link 
              to="/admin" 
              title="Admin Dashboard"
              style={{ 
                color: 'var(--text-main)', 
                display: 'flex', 
                alignItems: 'center', 
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'}
            >
              <LayoutDashboard size={20} />
            </Link>
          )}

          {/* Notifications Logic */}
          <div style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-main)' }}>
              <div onClick={() => setNotificationsOpen(!notificationsOpen)} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main)'} style={{ transition: 'all 0.3s ease' }}>
                <Bell size={20} />
                  <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--danger)', color: 'white', borderRadius: '50%', width: '15px', height: '15px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {2 + (upcomingProjects.length > 0 ? 1 : 0)}
                  </span>
              </div>

              {notificationsOpen && (
                <div className="glass" style={{ position: 'absolute', right: 0, top: '45px', width: '320px', padding: '15px', zIndex: 100, border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                  <h4 style={{ margin: '0 0 15px 0', borderBottom: '1px solid var(--border)', paddingBottom: '10px', fontSize: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    Notifications
                    <span style={{ fontSize: '0.7rem', color: 'var(--primary)', cursor: 'pointer' }}>Mark all as read</span>
                  </h4>
                  
                  {/* Broker Network Promo */}
                  <Link to="/broker-network" style={{ textDecoration: 'none' }} onClick={() => setNotificationsOpen(false)}>
                    <div style={{ padding: '12px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', borderLeft: '3px solid #60a5fa', marginBottom: '12px', animation: 'fadeIn 0.5s ease', cursor: 'pointer' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#60a5fa', fontWeight: '800', letterSpacing: '1px' }}>🚀 NETWORK LAUNCH</p>
                      <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>Coming Soon: Smart Broker Network</p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Join the elite platform for professionals.</p>
                    </div>
                  </Link>

                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--primary)', marginBottom: '10px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                      <strong>Welcome to Basera Associates!</strong><br />
                      We are thrilled to have you here, {user ? user.name.split(' ')[0] : 'Guest'}.
                    </p>
                  </div>

                  {upcomingProjects.length > 0 && (
                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold' }}>✨ UPCOMING PROJECT</p>
                      <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', fontWeight: '600' }}>{upcomingProjects[0].title}</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{upcomingProjects[0].location}</p>
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* New Broker Network Mini-Badge */}
          <Link to="/broker-network" style={{ textDecoration: 'none' }}>
            <div className="launching-mini-badge">
              <span>Launching Soon</span>
              <div className="pulse-dot"></div>
            </div>
          </Link>

          {/* User Profile / Login Logic */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '20px' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div style={{ background: 'var(--primary)', color: '#fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={16} />
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.name ? user.name.split(' ')[0] : 'User'}</span>
              </div>

              {dropdownOpen && (
                <div className="glass" style={{ position: 'absolute', right: 0, top: '45px', width: '200px', padding: '10px 0', zIndex: 100 }}>
                  <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', marginBottom: '10px' }}>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{user.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Role: {user.role}</p>
                  </div>
                   <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li>
                      <Link to="/dashboard" onClick={() => setDropdownOpen(false)} style={{ textDecoration: 'none', width: '100%', textAlign: 'left', background: 'transparent', color: 'var(--text-main)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button className="btn" style={{ width: '100%', textAlign: 'left', background: 'transparent', color: 'var(--text-main)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Key size={16} /> Change Password
                      </button>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="btn" style={{ width: '100%', textAlign: 'left', background: 'transparent', color: 'var(--danger)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <LogOut size={16} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary" style={{ padding: '8px 16px', textDecoration: 'none' }}>Login</Link>
          )}
        </div>

        {/* Global Premium Hamburger Toggle */}
        <div 
          onClick={() => setMobileMenuOpen(true)} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', transition: 'background 0.3s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <Menu size={24} color="#ffffff" />
        </div>
      </div>
    </nav>
    </div>
    </>
  );
}

export default Navbar;
