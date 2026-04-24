import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, MessageCircle } from 'lucide-react';

function Footer() {
  return (
    <footer id="footer" style={{ background: '#0a0c10', color: '#f5f6fa', paddingTop: 'clamp(40px, 8vh, 60px)', paddingBottom: '20px', borderTop: '1px solid rgba(195, 157, 99, 0.2)', marginTop: 'clamp(40px, 8vh, 60px)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', marginBottom: '40px' }}>
        
        {/* Company Info */}
        <div className="footer-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <img 
              src="/logo.png" 
              alt="Basera Associates Footer Logo" 
              style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))' }} 
              onError={(e) => e.target.style.display = 'none'}
            />
            <h3 style={{ color: 'var(--primary)', fontSize: '1.5rem', fontFamily: 'Outfit, sans-serif', margin: 0 }}>BASERA ASSOCIATES</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            Delivering excellence in real estate. We specialize in premium commercial spaces, luxury flats, and prime plots to help you build your future.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 style={{ color: 'var(--primary)', marginBottom: '20px', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}><Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Home</Link></li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/#projects" 
                style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} 
                onMouseOver={e => e.target.style.color = 'var(--primary)'} 
                onMouseOut={e => e.target.style.color = 'var(--text-muted)'}
              >
                Projects
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}><Link to="/portfolio" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Portfolio</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/coastal-villas" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Coastal Luxury Villas - Mumbai & Goa</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/admin" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Admin Dashboard</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/auth" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div id="contact" className="footer-section">
          <h4 style={{ color: 'var(--primary)', marginBottom: '20px', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>Contact Us</h4>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px', color: 'var(--text-muted)' }}>
            <MapPin size={18} style={{ color: 'var(--primary)', marginRight: '10px', flexShrink: 0, marginTop: '4px' }} />
            <span>109 Pandharinath Joshi Complex, Near Pandharinath Marg, Indore-452003, Madhya Pradesh, India</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px', color: 'var(--text-muted)' }}>
            <MapPin size={18} style={{ color: 'var(--primary)', marginRight: '10px', flexShrink: 0, marginTop: '4px' }} />
            <span>8/B, Manas Mayfair, Opposite Nath Mandir, Nath Mandir Road, South Tukoganj, Indore - 452001</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px', color: 'var(--text-muted)' }}>
            <Phone size={18} style={{ color: 'var(--primary)', marginRight: '10px', marginTop: '4px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span>+91 79098-82908</span>
              <span>+91 98932-50908</span>
              <span>+91 98938-12223</span>
              <span>+91 99771-12223</span>
              <span>+91 98270-32070</span>
              <span>+91 99934-10114</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
            <Mail size={18} style={{ color: 'var(--primary)', marginRight: '10px' }} />
            <span>contact@baseraassociates.com</span>
          </div>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4 style={{ color: 'var(--primary)', marginBottom: '25px', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>Follow Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/baseraassociates/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'inherit', transition: 'transform 0.3s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif" }}>
                <div style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: '500' }}>Instagram</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>@baseraassociates</div>
              </div>
            </a>

            {/* WhatsApp 1 */}
            <a 
              href="https://wa.me/917909882908" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'inherit', transition: 'transform 0.3s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                <MessageCircle size={20} style={{ color: '#fff' }} />
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif" }}>
                <div style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: '500' }}>WhatsApp 1</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Click to chat</div>
              </div>
            </a>

            {/* WhatsApp 2 */}
            <a 
              href="https://wa.me/919893250908" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'inherit', transition: 'transform 0.3s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                <MessageCircle size={20} style={{ color: '#fff' }} />
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif" }}>
                <div style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: '500' }}>WhatsApp 2</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Click to chat</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', fontSize: '0.9rem' }}>
        <p style={{ margin: '0 0 10px 0' }}>&copy; {new Date().getFullYear()} Basera Associates. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
          <span>Crafted with ❤️ in Indore</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <Link to="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Privacy</Link>
          <span style={{ opacity: 0.5 }}>•</span>
          <Link to="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Terms</Link>
          <span style={{ opacity: 0.5 }}>•</span>
          <Link to="/cookies" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Cookies</Link>
        </div>
        <p style={{ 
          margin: '20px 0 0 0', 
          fontSize: '0.85rem', 
          opacity: 0.8, 
          letterSpacing: '2px', 
          textTransform: 'uppercase',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          color: 'rgba(255,255,255,0.7)'
        }}>
          Design and developed by <span style={{ 
            color: 'var(--primary)', 
            fontWeight: 800,
            textShadow: '0 0 15px rgba(195, 157, 99, 0.3)',
            transition: 'all 0.3s ease'
          }} onMouseOver={e => e.target.style.textShadow = '0 0 25px rgba(195, 157, 99, 0.8)'} onMouseOut={e => e.target.style.textShadow = '0 0 15px rgba(195, 157, 99, 0.3)'}>SARTHAK DHARKAR</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
