import React, { useEffect, useState, useRef } from 'react';
import { Building2, Users, MapPin, Star } from 'lucide-react';

const CountUpTarget = ({ end, duration = 2000, prefix = '', suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - percentage, 4);
      setCount(easeProgress * end);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return (
    <span ref={ref}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

export default function QuickStats() {
  const stats = [
    { icon: <Building2 size={36} />, num: 150, suffix: '+', label: 'Properties' },
    { icon: <Users size={36} />, num: 500, suffix: '+', label: 'Happy Clients' },
    { icon: <Users size={36} />, num: 30, suffix: '+', label: 'Active Users' },
    { icon: <MapPin size={36} />, num: 20, suffix: '+', label: 'Locations' },
    { icon: <Star size={36} />, num: 4.8, suffix: '', decimals: 1, label: 'Rating' }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '24px',
          width: '100%'
        }}
      >
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="stat-card"
            style={{
              background: 'linear-gradient(145deg, #181c25 0%, #0a0c10 100%)',
              border: '1px solid rgba(195, 157, 99, 0.15)',
              borderRadius: '24px',
              padding: '35px 20px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.4s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'default'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(195, 157, 99, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(195, 157, 99, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
              e.currentTarget.style.borderColor = 'rgba(195, 157, 99, 0.15)';
            }}
          >
            <div style={{ 
              color: 'var(--primary, #c39d63)', 
              marginBottom: '20px',
              background: 'rgba(195, 157, 99, 0.1)',
              padding: '16px',
              borderRadius: '50%',
              display: 'inline-flex',
              boxShadow: 'inset 0 0 20px rgba(195, 157, 99, 0.05)'
            }}>
              {stat.icon}
            </div>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              color: '#ffffff', 
              marginBottom: '8px', 
              fontFamily: 'Outfit, sans-serif',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              <CountUpTarget end={stat.num} suffix={stat.suffix} decimals={stat.decimals} />
            </div>
            <div style={{ 
              color: 'var(--text-muted, #a0aabf)', 
              fontSize: '1.05rem', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px', 
              fontWeight: '600' 
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
