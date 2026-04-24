import React, { useState, useRef, useEffect } from 'react';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  
  // Real estate transformation placeholders (can be replaced with genuine Basera projects)
  const imageBefore = "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2069&auto=format&fit=crop"; // E.g., an empty plot or older space
  const imageAfter = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"; // E.g., the finished premium villa

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="before-after-section animate-slide-up" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'left', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '4px' }}>
            Transforming Spaces
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0' }}>
             concepts into luxurious realities.
          </p>
        </div>

        <div 
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            margin: '0',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            border: '1px solid rgba(195, 157, 99, 0.3)',
            cursor: 'ew-resize',
            minHeight: '200px'
          }}
        >
          {/* Base Image (Before) */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <img 
              src={imageBefore} 
              alt="Property Before" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              draggable={false} 
            />
            {/* Label Base */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', backdropFilter: 'blur(5px)' }}>
              Before
            </div>
          </div>

          {/* Overlay Image (After) */}
          <div style={{ 
            position: 'absolute', 
            top: 0, left: 0, width: '100%', height: '100%',
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            transition: 'clip-path 0.1s ease-out'
          }}>
            <img 
              src={imageAfter} 
              alt="Property After" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              draggable={false} 
            />
            {/* Label Overlay */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--primary)', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              After
            </div>
          </div>

          {/* Slider Line & Handle */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: `${sliderPosition}%`,
            width: '4px',
            background: 'var(--primary)',
            boxShadow: '0 0 10px rgba(195, 157, 99, 0.8)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40px', height: '40px',
              background: '#fff',
              border: '3px solid var(--primary)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0,0,0,0.5)'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)' }}>
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
          </div>

          {/* Invisible Range Input Overlay */}
          <input 
            type="range" 
            min="0" max="100" 
            value={sliderPosition} 
            onChange={handleSliderChange}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              opacity: 0,
              cursor: 'ew-resize',
              margin: 0
            }}
            aria-label="Drag to compare before and after"
          />
        </div>
      </div>
    </div>
  );
}
