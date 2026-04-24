import React from 'react';
import { 
  Building2, 
  Wifi, 
  Users2, 
  Clock, 
  Coffee, 
  Shield, 
  LayoutPanelLeft, 
  TrendingUp, 
  MapPin, 
  Phone,
  Sofa,
  BarChart3,
  HardHat,
  Home,
  Palette,
  Briefcase,
  Layers,
  CheckCircle2,
  Zap,
  Leaf
} from 'lucide-react';
import FinancingCTA from '../components/FinancingCTA';
import expertiseBg from '../assets/expertise_bg.png';

const Services = () => {
  const detailedServices = [
    {
      id: "coworking",
      title: "Co-Working Spaces",
      subtitle: "Work smarter in our thoughtfully designed co-working environments.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
      description: "Our co-working spaces are more than just desks; they're communities designed for productivity and networking. We provide everything you need to focus on what matters: your business.",
      features: ["Fully furnished workspaces", "High-speed internet", "Meeting rooms", "Flexible seating", "24/7 access", "Premium Cafeteria"],
      approach: "A professional environment with cost-effective solutions for startups and corporate teams alike."
    },
    {
      id: "urban",
      title: "Urban Planning",
      subtitle: "Designing smarter cities for a better tomorrow.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
      description: "We use modern technology combined with practical insights to deliver future-ready urban spaces that prioritize sustainability and efficiency.",
      features: ["Land use planning", "Strategic project planning", "Sustainable infrastructure", "Traffic & transit systems", "Public space design"],
      approach: "Modern technology combined with practical insights to deliver future-ready urban spaces."
    },
    {
      id: "structural",
      title: "Structural Planning",
      subtitle: "Strong and efficient structural design ensuring safety and durability.",
      image: "/uploads/st-planning.jpg",
      description: "Our engineering team focuses on creating robust frameworks that withstand the test of time while optimizing material usage and construction costs.",
      features: ["Safety compliance auditing", "Material strength analysis", "Earthquake resistant design", "Cost-effective framing", "Modern standards adherence"],
      approach: "Safety first. We never compromise on the skeletal integrity of any project, ensuring peace of mind for decades."
    },
    {
      id: "interior",
      title: "Interior Design",
      subtitle: "Premium interior solutions that combine aesthetics with functionality.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
      description: "We transform spaces into experiences. Our interior design services focus on custom furniture, lighting, and layout to match your unique brand or lifestyle.",
      features: ["Space optimization", "Custom furniture design", "Lighting solutions", "Premium finishes", "Vastu-compliant layouts", "Residential & Commercial"],
      approach: "Every detail matters. We blend luxury with utility to create spaces that breathe and inspire."
    },
    {
      id: "consulting",
      title: "Real Estate Consulting",
      subtitle: "Expert guidance for buying, selling, and investing in properties.",
      image: "/uploads/real-estate-pl.jpg",
      description: "Navigating the real estate market is complex. Our consultants provide market data, legal insights, and investment analysis to help you make informed decisions.",
      features: ["Investment ROI analysis", "Market trend forecasting", "Property valuation", "Legal & site vetting", "Portfolio management", "Asset acquisition"],
      approach: "Strategic and growth-oriented. We don't just find properties; we secure your financial future."
    },
    {
      id: "mgmt",
      title: "Property Management",
      subtitle: "End-to-end management services for maintenance and asset optimization.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073",
      description: "Your assets deserve professional care. We handle the day-to-day operations so you don't have to, ensuring your property remains in peak condition.",
      features: ["Preventive maintenance", "Tenant handling", "Rent collection & legal", "Asset value optimization", "Facility hospitality", "Security & safety oversight"],
      approach: "Asset care like it's our own. We prioritize long-term value preservation and zero-stress ownership."
    },
    {
      id: "archi",
      title: "Architecture & Design",
      subtitle: "Innovative architectural solutions tailored to modern lifestyles.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070",
      description: "We blend classical principles with modern innovation to create architectural landmarks that are sustainable, functional, and visually stunning.",
      features: ["Concept development", "3D visualization & BIM", "Sustainable architecture", "Commercial landmarking", "Project feasibility studies"],
      approach: "Visionary design meets practical execution. We build the future, one blueprint at a time."
    }
  ];

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#0f1115', color: '#fff', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ 
        padding: '140px 20px 100px 20px', 
        textAlign: 'center', 
        backgroundImage: `url(${expertiseBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        {/* Top Fade */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, #0f1115, transparent)',
          zIndex: 1
        }}></div>

        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, #0f1115cc, #0f1115ee)',
          zIndex: 0
        }}></div>

        {/* Bottom Smooth Fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(to top, #0f1115, transparent)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 7vw, 5rem)', 
            fontWeight: '900', 
            marginBottom: '25px', 
            fontFamily: '"Outfit", serif',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            Our <span style={{ color: 'var(--primary)' }}>Expertise</span>
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', 
            color: 'var(--text-muted)', 
            maxWidth: '850px', 
            margin: '0 auto',
            lineHeight: '1.7',
            fontWeight: '300'
          }}>
            Redefining the standards of real estate and structural design with a portfolio of diverse, high-impact services.
          </p>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '50px', flexWrap: 'wrap' }}>
             {detailedServices.map(s => (
               <button 
                 key={s.id}
                 onClick={() => document.getElementById(s.id).scrollIntoView({ behavior: 'smooth' })}
                 style={{ padding: '10px 20px', fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', cursor: 'pointer', transition: 'all 0.3s' }}
                 onMouseEnter={(e) => { e.currentTarget.style.color='var(--primary)'; e.currentTarget.style.borderColor='var(--primary)'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}
               >
                 {s.title}
               </button>
             ))}
          </div>
        </div>
      </section>

      {/* Detailed Sections List */}
      <div className="container" style={{ paddingBottom: '100px' }}>
        {detailedServices.map((service, index) => (
          <section 
            id={service.id}
            key={service.id} 
            className="scroll-reveal"
            style={{ 
              padding: '120px 20px', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '80px',
              alignItems: 'center',
              borderBottom: index !== detailedServices.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}
          >
            {/* Image (Alternates sides) */}
            <div style={{ order: index % 2 === 0 ? 0 : 1, position: 'relative' }}>
               <div style={{
                 position: 'absolute',
                 top: '-20px',
                 left: index % 2 === 0 ? '-20px' : 'auto',
                 right: index % 2 === 0 ? 'auto' : '-20px',
                 width: '100%',
                 height: '100%',
                 border: '2px solid var(--primary)',
                 opacity: 0.2,
                 borderRadius: '20px',
                 zIndex: 1
               }}></div>
               <img 
                 src={service.image} 
                 alt={service.title} 
                 style={{ 
                   width: '100%', 
                   borderRadius: '20px', 
                   boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                   position: 'relative',
                   zIndex: 2,
                   aspectRatio: '16 / 10',
                   objectFit: 'cover'
                 }}
               />
            </div>

            {/* Content */}
            <div style={{ order: index % 2 === 0 ? 1 : 0 }}>
              <div style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                Service 0{index + 1}
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '15px' }}>
                {service.title.split(' ')[0]} <span style={{ color: 'var(--primary)' }}>{service.title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '30px', lineHeight: 1.6, fontWeight: '400' }}>
                {service.subtitle}
              </p>
              
              <p style={{ color: 'var(--text-muted)', marginBottom: '40px', lineHeight: '1.8' }}>
                {service.description}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {service.features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                    <CheckCircle2 size={18} color="var(--primary)" />
                    {feat}
                  </div>
                ))}
              </div>

              <div style={{ padding: '30px', background: 'rgba(195,157,99,0.07)', borderRadius: '15px', borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Zap size={18} color="var(--primary)" /> Our Core Approach
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  {service.approach}
                </p>
              </div>
            </div>
          </section>
        ))}

        <section style={{ marginTop: '50px', textAlign: 'center' }}>
          <div className="glass" style={{ padding: '80px 40px', borderRadius: '40px', border: '1px solid rgba(195, 157, 99, 0.3)', background: 'linear-gradient(145deg, #111318 0%, #0a0c10 100%)' }}>
             <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontFamily: '"Outfit", serif' }}>Experience the Difference</h2>
             <p style={{ color: 'var(--text-muted)', marginBottom: '45px', maxWidth: '700px', margin: '0 auto 45px auto', fontSize: '1.2rem' }}>
                Whether you're looking for an iconic skyscraper or a curated interior, our team is ready to deliver.
             </p>
             <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="tel:+919876543210" className="btn btn-primary" style={{ padding: '20px 60px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
                  <Phone size={22} /> Talk to an Expert
                </a>
                <button className="btn btn-outline" style={{ padding: '20px 60px', borderRadius: '50px', fontSize: '1.1rem' }}>
                   View Our Portfolio
                </button>
             </div>
          </div>
        </section>

        <div style={{ marginTop: '100px' }}>
          <FinancingCTA />
        </div>
      </div>

      <style>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease-out;
        }
        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Services;
