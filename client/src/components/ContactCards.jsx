import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactCards = () => {
  const cards = [
    {
      icon: <Phone size={24} />,
      title: "Phone Numbers",
      items: [
        { main: "+91 79098 82908", sub: "Main Office" },
        { main: "+91 98932 50908", sub: "Primary Contact" },
        { main: "+91 98938 12223", sub: "Business inquiries" },
        { main: "+91 99771 12223", sub: "Support" },
        { main: "+91 98270 32070", sub: "Office" },
        { main: "+91 99934 10114", sub: "Direct Line" }
      ]
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      items: [
        { main: "basearassociate@gmail.com", sub: "Quick response" },
        { main: "project@baaseraassociate.in", sub: "Project inquiries" }
      ]
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      items: [
        { main: "Surya Nikunj Complex, 109, Rajwada", sub: "Indore, Madhya Pradesh 452007" },
        { main: "8/B, Manas Mayfair", sub: "Opposite Nath Mandir, Nath Mandir Road, South Tukoganj, Indore - 452001" }
      ]
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      items: [
        { main: "11:00 AM - 8:00 PM", sub: "Business hours" }
      ]
    }
  ];

  return (
    <div style={{ padding: 'clamp(40px, 8vh, 80px) 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 6vh, 60px)' }} className="animate-slide-up">
        <span style={{
          color: 'var(--primary)',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
          fontWeight: '600',
          display: 'block',
          marginBottom: '10px'
        }}>
          Contact Information
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: '800', margin: 0, color: 'var(--text-main)', lineHeight: '1.1' }}>Multiple Ways</h2>
        <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: '800', margin: 0, color: 'var(--primary)', lineHeight: '1.1' }}>to Reach Us</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {cards.map((card, index) => (
          <div
            key={index}
            className="glass animate-slide-up"
            style={{
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              animationDelay: `${index * 0.1}s`,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div style={{
              backgroundColor: 'rgba(195, 157, 99, 0.1)',
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              {card.icon}
            </div>

            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '4px 0' }}>{card.title}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {card.items.map((item, i) => (
                <div key={i}>
                  <div style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: '500', marginBottom: '4px' }}>{item.main}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCards;
