import React, { useEffect, useState } from 'react';
import SarafaCommercial from '../components/SarafaCommercial';
import { Download, User, Mail, Phone, CheckCircle, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const JagdishBhawan = () => {
  const [pageData, setPageData] = useState(null);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Request Brochure');
  const [brochureFormData, setBrochureFormData] = useState({ name: '', email: '', phone: '' });
  const [brochureSubmitted, setBrochureSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/page-content/jagdish-bhawan');
        if (res.ok) {
          const data = await res.json();
          setPageData(data);
        }
      } catch (err) { console.error('Failed to fetch page content:', err); }
    };
    fetchContent();
  }, []);

  const handleBrochureSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: brochureFormData.name,
          email: brochureFormData.email,
          phone: brochureFormData.phone,
          projectId: null, // General inquiry for this page
          offerPrice: 0,
          source: 'Jagdish Bhawan Landing Page'
        })
      });
      if (res.ok) {
        setBrochureSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (title) => {
    setModalTitle(title);
    setShowBrochureModal(true);
  };

  return (
    <div className="jagdish-bhawan-page" style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '60px' }}>
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Link to="/#projects" style={{ 
          color: 'rgba(255,255,255,0.5)', 
          textDecoration: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontSize: '0.9rem',
          fontWeight: 500,
          transition: 'color 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#c39d63'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >
          <ArrowLeft size={18} /> Back to listings
        </Link>
      </div>

      <SarafaCommercial 
         customTitle={pageData?.metadata?.title} 
         customSubtitle={pageData?.metadata?.subtitle} 
         customImage={pageData?.metadata?.heroImage}
         onToggleBrochure={() => openModal('Early Access Priority')}
      />
      
      {/* Sarafa Bazaar Identity & Story */}
      <section style={{ padding: '100px 20px', background: 'linear-gradient(to bottom, #0a0a0a, #111)' }}>
        <div className="container">
          
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }} className="scroll-reveal">
            <h2 style={{ fontSize: '3rem', color: '#fff', fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>
              The Soul of Indore: <span className="gold-text">Sarafa Bazaar</span>
            </h2>
            <div style={{ width: '80px', height: '2px', background: '#c39d63', margin: '0 auto' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }} className="bazaar-story-grid">
            
            {/* Location & Concept */}
            <div className="scroll-reveal">
              <div style={{ marginBottom: '50px' }}>
                <h4 style={{ color: '#c39d63', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                   Location & Identity
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Located in the heart of Indore, Sarafa Bazaar sits close to the iconic <span style={{ color: '#c39d63', fontWeight: 700 }}>Rajwada Palace</span>. 
                  Strategically located at <span style={{ color: '#c39d63', fontWeight: 700 }}>Jagdish Bhawan</span>, this upcoming development enjoys a prime position right beside the iconic <span style={{ color: '#c39d63', fontWeight: 700 }}>Rajhans Dal Bafla</span> — one of the most celebrated culinary landmarks in the city.
                </p>
              </div>

              <div className="glass-premium" style={{ padding: '40px', borderRadius: '30px', border: '1px solid rgba(195, 157, 99, 0.2)', background: 'rgba(195, 157, 99, 0.03)' }}>
                <h4 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#c39d63' }}>🕰️</div> Unique Day-to-Night Concept
                </h4>
                
                <div style={{ display: 'grid', gap: '30px' }}>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ fontSize: '2rem' }}>🏙️</div>
                    <div>
                      <h5 style={{ color: '#c39d63', fontSize: '1.1rem', marginBottom: '5px' }}>Daytime (Jewellery Market)</h5>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>A thriving hub for gold, silver, and fine ornaments.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ fontSize: '2rem' }}>🌙</div>
                    <div>
                      <h5 style={{ color: '#c39d63', fontSize: '1.1rem', marginBottom: '5px' }}>Night (10 PM – 4 AM)</h5>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>A lively street food destination attracting food lovers from across the city.</p>
                    </div>
                  </div>
                </div>
                <p style={{ marginTop: '30px', color: '#c39d63', fontWeight: 600, fontSize: '0.9rem', italic: 'italic' }}>
                  * A rare dual-purpose model making it one of India's most unique marketplaces.
                </p>
              </div>
            </div>

            {/* Commercial & History */}
            <div className="scroll-reveal">
              <div style={{ marginBottom: '50px' }}>
                <h4 style={{ color: '#c39d63', fontSize: '1.5rem', marginBottom: '20px' }}>
                   Commercial Importance
                </h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  {[
                    'High footfall from both locals and tourists',
                    'Prime central business location',
                    'Dynamic mix of jewellery, retail, and food',
                    'Strong rental demand and consistent activity'
                  ].map((text, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c39d63' }}></div>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '50px' }}>
                 <h4 style={{ color: '#c39d63', fontSize: '1.5rem', marginBottom: '20px' }}>
                   Footfall & Lifestyle
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7 }}>
                  Sarafa Bazaar attracts thousands of visitors every night, making it one of the most vibrant destinations in Indore. 
                  It draws a diverse crowd of both locals and tourists, and plays a defining role in shaping the city’s nightlife. 
                  The area operates as a <span style={{ color: '#c39d63', fontWeight: 700 }}>24/7 active ecosystem</span>, ensuring continuous movement, energy, and commercial activity.
                </p>
              </div>

              <div style={{ marginBottom: '50px' }}>
                 <h4 style={{ color: '#c39d63', fontSize: '1.5rem', marginBottom: '20px' }}>
                   🏗️ Development & Future Growth
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7 }}>
                  As part of the ongoing <span style={{ color: '#c39d63', fontWeight: 700 }}>Smart City initiatives</span> in Indore, Sarafa Bazaar is witnessing steady infrastructure upgrades. 
                  The area is evolving with a balanced blend of heritage charm and modern development, ensuring significant value appreciation in the future.
                </p>
              </div>

              <div style={{ padding: '30px', borderLeft: '3px solid #c39d63', background: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '15px' }}>🏛️ Historical Background</h4>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Established in the <span style={{ color: '#c39d63', fontWeight: 700 }}>18th century during the Holkar era</span>, Sarafa Bazaar was originally a central hub for jewellery trading. 
                  Today, it stands as a <span style={{ color: '#c39d63', fontWeight: 700 }}>200+ year-old commercial zone</span> that continues to thrive with the perfect blend of tradition and modern activity.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Commercial & Strategic Advantages */}
      <section style={{ padding: '80px 20px', background: '#0a0a0a', borderTop: '1px solid rgba(195, 157, 99, 0.1)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }} className="advantage-grid">
            
            {/* Retail Ecosystem */}
            <div className="scroll-reveal glass-premium" style={{ padding: '30px', borderRadius: '24px' }}>
              <h4 style={{ color: '#c39d63', fontSize: '1.4rem', marginBottom: '15px' }}>Retail & Business Ecosystem</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Sarafa Bazaar is home to a highly diverse and well-established business ecosystem. 
                From traditional jewellery shops to modern retail outlets, the market supports multiple formats, ensuring continuous customer flow.
              </p>
            </div>

            {/* Investment Potential */}
            <div className="scroll-reveal glass-premium" style={{ padding: '30px', borderRadius: '24px' }}>
              <h4 style={{ color: '#c39d63', fontSize: '1.4rem', marginBottom: '15px' }}>📈 Investment Potential</h4>
              <ul style={{ listStyle: 'none', padding: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                {['Consistent high demand', 'Prime central location', 'Limited property availability', 'Strong rental yield'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '5px', height: '5px', background: '#c39d63', borderRadius: '50%' }}></div> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Connectivity */}
            <div className="scroll-reveal glass-premium" style={{ padding: '30px', borderRadius: '24px' }}>
              <h4 style={{ color: '#c39d63', fontSize: '1.4rem', marginBottom: '15px' }}>🚗 Connectivity</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Enjoys excellent connectivity to all major parts of Indore. Close to Rajwada and major transport routes, ensuring convenience for both owners and customers.
              </p>
            </div>

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', marginTop: '60px' }} className="target-brand-grid">
            
            {/* Ideal For */}
            <div className="scroll-reveal glass-premium" style={{ padding: '40px', borderRadius: '30px' }}>
              <h4 style={{ color: '#c39d63', fontSize: '1.5rem', marginBottom: '25px' }}>🎯 Ideal For</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {['Retail Shops', 'Jewellery Showrooms', 'Food & Beverage', 'Boutique Stores', 'Investment Assets'].map((tag, i) => (
                  <span key={i} style={{ 
                    padding: '10px 20px', 
                    borderRadius: '100px', 
                    background: 'rgba(195, 157, 99, 0.1)', 
                    color: '#fff', 
                    fontSize: '0.85rem', 
                    fontWeight: 600,
                    border: '1px solid rgba(195, 157, 99, 0.2)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: '25px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', italic: 'italic' }}>
                👉 Unique blend of culture and commerce for both traditional and modern businesses.
              </p>
            </div>

            {/* Brand Value */}
            <div className="scroll-reveal" style={{ 
              padding: '40px', 
              borderRadius: '30px', 
              background: 'linear-gradient(135deg, rgba(195, 157, 99, 0.1), transparent)',
              border: '1px solid rgba(195, 157, 99, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h4 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '20px' }}>🌆 Brand Value & Prestige</h4>
              <p style={{ color: '#fff', fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 500 }}>
                Owning a space in Sarafa Bazaar is a <span style={{ color: '#c39d63', fontWeight: 800 }}>Status Symbol</span>. 
                The location enhances business credibility and attracts <span style={{ color: '#c39d63', fontWeight: 800 }}>Premium Customers</span> effortlessly.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Night View Showcase */}
      <section style={{ padding: '100px 20px', background: '#0a0a0a', textAlign: 'center' }}>
        <div className="container">
          <div className="scroll-reveal" style={{ marginBottom: '60px' }}>
            <h4 style={{ color: '#c39d63', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '15px' }}>Visualizing Excellence</h4>
            <h2 style={{ fontSize: '2.8rem', color: '#fff', fontFamily: "'Playfair Display', serif" }}>
              Architecture at <span className="gold-text">Night</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '700px', margin: '20px auto' }}>
              Witness how Jagdish Bhawan transforms after sunset, with premium architectural lighting that emphasizes its grand facade against the vibrant Indore sky.
            </p>
          </div>

          <div className="scroll-reveal glass-premium" style={{ 
            borderRadius: '40px', 
            padding: '15px', 
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            maxWidth: '1100px',
            margin: '0 auto',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
          }}>
            <img 
              src={pageData?.metadata?.nightImage || "/jagdish_bhawan_night_user.png"} 
              alt="Jagdish Bhawan Night View" 
              style={{ width: '100%', borderRadius: '30px', display: 'block' }} 
            />
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="container" style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ color: '#c39d63', fontSize: '2rem', marginBottom: '20px' }}>Secure Your Space Today</h3>
        <p style={{ color: '#fff', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 40px' }}>
          Be part of Indore's retail revolution. Jagdish Bhawan offers limited premium units for visionary businesses.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }} className="cta-flex">
            <button 
              onClick={() => openModal('Request Brochure')}
              className="btn btn-primary" 
              style={{ padding: '15px 40px', borderRadius: '30px', border: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Download size={18} style={{ marginRight: '10px' }} /> Request Brochure
            </button>
            <a 
              href={`https://wa.me/917909882908?text=${encodeURIComponent("Hello, please share the floor plan for Jagdish Bhawan, Sarafa Bazaar.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline" 
              style={{ padding: '15px 40px', borderRadius: '30px', border: '1px solid #c39d63', color: '#c39d63', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
              View Floor Plan
            </a>
        </div>
      </section>

      {/* Brochure Request Modal */}
      {showBrochureModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass animate-slide-up" style={{ width: '100%', maxWidth: '500px', padding: '50px 40px', borderRadius: '32px', border: '1px solid rgba(195, 157, 99, 0.3)', position: 'relative', background: 'rgba(10,10,10,0.95)' }}>
            <button onClick={() => { setShowBrochureModal(false); setBrochureSubmitted(false); }} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            
            {!brochureSubmitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'rgba(195, 157, 99, 0.1)', borderRadius: '15px', color: '#c39d63', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <Download size={30} />
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 10px 0', fontFamily: "'Playfair Display', serif" }}>{modalTitle}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Enter your details to get started with <strong>Jagdish Bhawan</strong>.</p>
                </div>

                <form onSubmit={handleBrochureSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', top: '18px', color: '#c39d63' }} />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required 
                      style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
                      onChange={e => setBrochureFormData({...brochureFormData, name: e.target.value})} 
                    />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '16px', top: '18px', color: '#c39d63' }} />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
                      onChange={e => setBrochureFormData({...brochureFormData, email: e.target.value})} 
                    />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '16px', top: '18px', color: '#c39d63' }} />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required 
                      style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
                      onChange={e => setBrochureFormData({...brochureFormData, phone: e.target.value})} 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', border: 'none', justifyContent: 'center', height: '54px', borderRadius: '100px', fontWeight: 'bold' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Get Brochure Now'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', background: 'rgba(52, 199, 89, 0.1)', borderRadius: '50%', color: '#34c759', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                   <CheckCircle size={32} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 10px 0', fontFamily: "'Playfair Display', serif" }}>Details Received</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.5', marginBottom: '25px' }}>
                  Thank you! Our team will contact you shortly with the exclusive project details.
                </p>
                <a 
                  href="/jagdish_bhawan_brochure.pdf" 
                  download="Jagdish_Bhawan_Brochure.pdf"
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', background: '#34c759', color: '#fff', border: 'none', height: '54px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                   <Download size={18} /> Download Brochure PDF
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JagdishBhawan;
