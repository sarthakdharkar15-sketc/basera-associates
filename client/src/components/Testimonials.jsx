import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    initials: 'RS',
    name: 'Rahul Sharma',
    location: 'Indore',
    review: "Basera Associates made my home-buying journey extremely smooth. Their team understood my requirements perfectly and helped me find a great flat within my budget. Highly recommended!",
    rating: 5
  },
  {
    initials: 'PV',
    name: 'Priya Verma',
    location: 'Bhopal',
    review: "I was looking for a plot investment in Indore and Basera Associates guided me at every step. Their transparency and professionalism really impressed me.",
    rating: 5
  },
  {
    initials: 'AP',
    name: 'Amit Patel',
    location: 'Indore',
    review: "Excellent service and great property options. The team is very responsive and helped me close the deal quickly without any hassle.",
    rating: 5
  },
  {
    initials: 'NJ',
    name: 'Neha Jain',
    location: 'Ujjain',
    review: "Very trustworthy company! They provided genuine property options and assisted me throughout the process. I am very happy with my purchase.",
    rating: 5
  },
  {
    initials: 'SG',
    name: 'Sandeep Gupta',
    location: 'Indore',
    review: "Professional team with deep knowledge of the real estate market. Basera Associates helped me get the best deal for my commercial property.",
    rating: 5
  }
];

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    // Auto-slide every 5 seconds
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 5) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth > 768 ? 400 : clientWidth, behavior: 'smooth' });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollAction = (direction) => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      const scrollAmount = clientWidth > 768 ? 400 : clientWidth;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="testimonials-section container mt-5 mb-5 animate-slide-up" style={{ padding: '60px 0', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '15px' }}>
          What Our Clients Say
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Real experiences from our satisfied customers who found their perfect spaces with us.
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Navigation Buttons */}
        {canScrollLeft && (
          <button 
            onClick={() => scrollAction('left')}
            style={{
              position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
              background: '#111318', border: '1px solid rgba(195, 157, 99, 0.4)', borderRadius: '50%',
              width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--primary)', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#111318'; e.currentTarget.style.color = 'var(--primary)'; }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {canScrollRight && (
          <button 
            onClick={() => scrollAction('right')}
            style={{
              position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
              background: '#111318', border: '1px solid rgba(195, 157, 99, 0.4)', borderRadius: '50%',
              width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--primary)', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#111318'; e.currentTarget.style.color = 'var(--primary)'; }}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none',  // IE/Edge
            gap: '30px',
            padding: '20px 5px',
            scrollBehavior: 'smooth'
          }}
          className="hide-scrollbar"
        >
          {testimonials.map((test, idx) => (
            <div 
              key={idx}
              style={{
                flex: '0 0 auto',
                width: 'min(100%, 380px)',
                scrollSnapAlign: 'start',
                background: 'linear-gradient(145deg, #181c25 0%, #0a0c10 100%)',
                border: '1px solid rgba(195, 157, 99, 0.15)',
                borderRadius: '24px',
                padding: '35px 30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                transition: 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = 'rgba(195, 157, 99, 0.5)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(195, 157, 99, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(195, 157, 99, 0.15)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
              }}
            >
              <Quote size={40} style={{ position: 'absolute', top: '25px', right: '25px', color: 'rgba(195, 157, 99, 0.1)' }} />
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{
                  width: '65px', height: '65px', borderRadius: '50%',
                  background: 'rgba(195, 157, 99, 0.15)', border: '2px solid rgba(195, 157, 99, 0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary)',
                  marginRight: '20px', fontFamily: 'Outfit, sans-serif'
                }}>
                  {test.initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '5px', fontFamily: 'Outfit, sans-serif' }}>
                    {test.name}
                  </h3>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{test.location}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>

              <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.7', flexGrow: 1, fontStyle: 'italic' }}>
                "{test.review}"
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
