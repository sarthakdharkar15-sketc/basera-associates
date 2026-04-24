import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Users, ShieldCheck, MapPin, Handshake } from 'lucide-react';
import TopArchitects from '../components/TopArchitects';
import QuickStats from '../components/QuickStats';
import Testimonials from '../components/Testimonials';
import ContactCards from '../components/ContactCards';

function About() {
  const whyChooseUs = [
    { icon: <Users size={32} />, title: "Trusted by 500+ clients", desc: "A proven track record of finding the perfect real estate matches for happy homeowners." },
    { icon: <ShieldCheck size={32} />, title: "Transparent & honest deals", desc: "No hidden costs or complicated jargon. Complete clarity from start to finish." },
    { icon: <MapPin size={32} />, title: "Premium & prime locations", desc: "Handpicked properties situated in the most sought-after and rapidly growing areas." },
    { icon: <Handshake size={32} />, title: "Expert guidance & support", desc: "Dedicated professionals navigating every legal and structural step alongside you." }
  ];

  return (
    <div className="about-page animate-fade-in" style={{ paddingBottom: '60px' }}>

      {/* Hero Section */}
      <section className="hero" style={{
        textAlign: 'center',
        padding: '120px 20px 80px 20px',
        background: 'linear-gradient(to bottom, #1a1d24 0%, #0f1115 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Decorative Element */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(195, 157, 99, 0.05) 0%, transparent 70%)',
          zIndex: 0
        }}></div>

        <div className="container animate-slide-up" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: '10px',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            letterSpacing: '-1px'
          }}>
            The Creative Minds
          </h1>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 800,
            color: 'var(--primary)',
            lineHeight: 1,
            fontStyle: 'italic',
            textShadow: '0 10px 30px rgba(195, 157, 99, 0.2)'
          }}>
            Behind Every Project
          </h1>
          <p style={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 400,
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            marginTop: '30px',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            letterSpacing: '1px',
            opacity: 0.8
          }}>
            Basera Associates is dedicated to providing ultra-premium properties with unmatched transparency, quality, and commitment.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="container mt-5 mb-5">
        <div className="story-section glass animate-slide-up hover-glow" style={{ padding: '60px 40px', borderRadius: '24px', border: '1px solid rgba(195, 157, 99, 0.2)', textAlign: 'center', transition: 'all 0.3s ease' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--primary)', fontFamily: '"Playfair Display", serif', marginBottom: '25px', fontWeight: 800 }}>
            Our Story
          </h2>
          <p style={{ color: 'var(--text-main)', fontSize: '1.15rem', lineHeight: '1.9', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            Basera Associates was founded with a singular, resolute vision: to revolutionize the real estate landscape by offering unparalleled transparency and exclusive premium property access. Recognizing the daunting challenges buyers and investors face when navigating the market, we embarked on a journey to bridge the gap between dream homes and reality. Today, our formidable growth journey is defined by our unwavering commitment to structural quality and client happiness—ensuring that every individual not only finds a property, but secures a space they are proud to call their own.
          </p>
          <p style={{ color: 'var(--text-main)', fontSize: '1.15rem', lineHeight: '1.9', maxWidth: '900px', margin: '20px auto 0 auto', textAlign: 'center' }}>
            We are also exploring future collaborations with leading developers like DLF Limited, Lodha Group, and Godrej Properties to expand our offerings.
          </p>
          <div style={{ marginTop: '35px' }}>
            <Link
              to="/#upcoming-collaborations"
              onClick={() => {
                window.location.href = '/';
                setTimeout(() => {
                  const el = document.getElementById('upcoming-collaborations');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              style={{
                background: 'rgba(195, 157, 99, 0.1)',
                border: '1px solid var(--primary)',
                color: 'var(--primary)',
                padding: '12px 30px',
                fontSize: '1.1rem',
                fontWeight: '500',
                borderRadius: '50px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--primary)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(195, 157, 99, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(195, 157, 99, 0.1)';
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Upcoming Collaborations
            </Link>
          </div>
        </div>
      </section>

      {/* Inside Our Workspace Section */}
      <section className="container mt-5 mb-5" style={{ paddingTop: '30px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--primary)', fontFamily: '"Playfair Display", serif', marginBottom: '15px', fontWeight: 800 }}>
            Inside Our Workspace
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Step into the heart of Basera Associates. Our office is defined by a culture of excellence and collaboration, where our team works tirelessly to curate the best real estate experiences for you.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '30px', // Increased gap
          marginBottom: '60px', // Extra breathing room before button
          marginTop: '20px'
        }}>
          {[
            "/workspace/1.jpg",
            "/workspace/2.jpg",
            "/workspace/3.jpg",
            "/workspace/4.jpg",
            "/workspace/5.jpg"
          ].map((img, idx) => (
            <div key={idx} className="workspace-card" style={{
              borderRadius: '20px',
              overflow: 'hidden',
              flex: '1 1 320px', // Slightly larger minimum width
              maxWidth: '420px',
              aspectRatio: '16 / 11',
              boxShadow: '0 15px 50px rgba(0,0,0,0.5)', // Enhanced shadow for separation
              position: 'relative',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <img
                src={img}
                alt={`Workspace ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.2, 0, 0, 1)'
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to top, rgba(15,17,21,0.6), transparent)',
                opacity: 0,
                transition: 'opacity 0.4s ease'
              }} className="workspace-overlay" />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', paddingBottom: '40px' }}>
          <button className="btn btn-outline" style={{ padding: '16px 50px', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '600' }}>
            View Gallery
          </button>
        </div>
      </section>

      {/* Our Presence Section */}
      <section className="container mt-5 mb-5" style={{ paddingTop: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--primary)', fontFamily: '"Playfair Display", serif', marginBottom: '15px', fontWeight: 800 }}>
            Our Presence
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Basera Associates is expanding its footprint across major cities in India, delivering premium real estate and co-working solutions.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px'
        }}>
          {[
            { city: 'Indore', desc: 'Emerging luxury residential & prime structural projects' },
            { city: 'Mumbai', desc: 'Premium commercial & co-working hubs' },
            { city: 'Pune', desc: 'Growing startup ecosystem & smart workspaces' },
            { city: 'Delhi', desc: 'Strategic urban planning & real estate services' },
            { city: 'Gurgaon', desc: 'Modern infrastructure & corporate co-working spaces' }
          ].map((item, idx) => (
            <div key={idx} className="glass hover-glow" style={{
              padding: '35px 25px',
              borderRadius: '24px',
              border: '1px solid rgba(195, 157, 99, 0.1)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '1 1 280px',
              maxWidth: '350px'
            }}>
              <div style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: 'var(--primary)', marginBottom: '20px',
                boxShadow: '0 0 15px var(--primary)'
              }}></div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>{item.city}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mt-5 mb-5" style={{ paddingTop: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          <div className="mission-card glass animate-slide-up hover-glow" style={{ padding: '50px 30px', borderRadius: '20px', border: '1px solid rgba(195, 157, 99, 0.2)', transition: 'all 0.3s ease', textAlign: 'center' }}>
            <div style={{ background: 'rgba(195, 157, 99, 0.1)', color: 'var(--primary)', padding: '20px', borderRadius: '50%', display: 'inline-block', marginBottom: '25px', boxShadow: 'inset 0 0 20px rgba(195, 157, 99, 0.1)' }}>
              <Target size={40} />
            </div>
            <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '15px', fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
              Our Mission
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '350px', margin: '0 auto' }}>
              Helping clients find their perfect property with absolute trust, innovation, and transparency at every critical juncture.
            </p>
          </div>

          <div className="vision-card glass animate-slide-up hover-glow" style={{ padding: '50px 30px', borderRadius: '20px', border: '1px solid rgba(195, 157, 99, 0.2)', transition: 'all 0.3s ease', textAlign: 'center', animationDelay: '0.2s' }}>
            <div style={{ background: 'rgba(195, 157, 99, 0.1)', color: 'var(--primary)', padding: '20px', borderRadius: '50%', display: 'inline-block', marginBottom: '25px', boxShadow: 'inset 0 0 20px rgba(195, 157, 99, 0.1)' }}>
              <Eye size={40} />
            </div>
            <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '15px', fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
              Our Vision
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '350px', margin: '0 auto' }}>
              Becoming an iconic, trusted, and universally definitive leading structural and real estate brand across India.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mt-5 mb-5" style={{ paddingTop: '30px' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--primary)', fontFamily: '"Playfair Display", serif', marginBottom: '50px', textAlign: 'center', fontWeight: 800 }}>
          Why Choose Us
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
          {whyChooseUs.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card glass hover-glow"
              style={{
                padding: '40px 25px',
                borderRadius: '16px',
                border: '1px solid rgba(195, 157, 99, 0.15)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(145deg, #181c25 0%, #0a0c10 100%)'
              }}
            >
              <div style={{ color: 'var(--primary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ padding: '15px', background: 'rgba(195, 157, 99, 0.05)', borderRadius: '50%' }}>
                  {feature.icon}
                </div>
              </div>
              <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '15px', fontWeight: '600', fontFamily: 'Outfit, sans-serif' }}>
                {feature.title}
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mt-5 mb-5" style={{ paddingTop: '20px' }}>
        <QuickStats />
      </section>

      {/* Architect Collaboration Section */}
      <section className="container mt-5 mb-5">
        <TopArchitects />
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action (CTA) Section */}
      <section className="container mt-5 mb-5" style={{ paddingTop: '30px' }}>
        <div
          className="cta-section glass"
          style={{
            padding: '70px 40px',
            borderRadius: '24px',
            border: '2px solid rgba(195, 157, 99, 0.3)',
            textAlign: 'center',
            background: 'linear-gradient(145deg, #111318 0%, #0a0c10 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background glow element for CTA */}
          <div style={{
            position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
            width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(195, 157, 99, 0.1) 0%, rgba(0,0,0,0) 70%)',
            zIndex: 0, pointerEvents: 'none'
          }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', fontFamily: '"Playfair Display", serif', marginBottom: '20px', fontWeight: 800 }}>
              Start your property journey with us today
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '45px', maxWidth: '600px', margin: '0 auto 45px auto' }}>
              Our dedicated team of professionals is standing by to help you discover the residential or commercial space of your dreams.
            </p>

            <button
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
              style={{
                background: 'transparent',
                border: '2px solid var(--primary)',
                color: 'var(--primary)',
                padding: '16px 50px',
                fontSize: '1.3rem',
                fontWeight: '600',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'inline-block'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--primary)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(195, 157, 99, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Existing Contact Cards */}
      <section className="container mt-5 mb-5" style={{ paddingTop: '20px' }}>
        <ContactCards />
      </section>

      <style>
        {`
          .workspace-card:hover img {
            transform: scale(1.1);
          }
          .workspace-card:hover .workspace-overlay {
            opacity: 1;
          }
          .hover-glow {
            will-change: transform, box-shadow, border-color;
          }
          .hover-glow:hover {
            transform: translateY(-8px) !important;
            box-shadow: 0 15px 35px rgba(195, 157, 99, 0.15) !important;
            border-color: rgba(195, 157, 99, 0.6) !important;
          }
        `}
      </style>
    </div>
  );
}

export default About;