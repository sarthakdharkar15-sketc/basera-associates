import React, { useState, useEffect, useRef } from 'react';

const Compass = () => {
  const [rotation, setRotation] = useState(0);
  const compassRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!compassRef.current) return;

      const rect = compassRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      
      // Add 90 because needle is vertical by default (pointing up = north)
      setRotation(angle + 90);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={compassRef}
      style={{
        position: 'fixed',
        top: '100px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9990,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease',
        cursor: 'crosshair',
        pointerEvents: 'none' // Don't block clicking things behind it
      }}
      className="compass-container"
    >
      {/* Compass Dial Marks */}
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
         {[0, 90, 180, 270].map(deg => (
           <div key={deg} style={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             width: '2px',
             height: '6px',
             background: deg === 0 ? 'var(--primary)' : 'rgba(255, 255, 255, 0.3)',
             transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-24px)`,
             borderRadius: '2px'
           }} />
         ))}
      </div>

      {/* Compass Needle */}
      <div style={{
        width: '2px',
        height: '40px',
        position: 'relative',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* North Pointer (Red) */}
        <div style={{
          width: 0,
          height: 0,
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderBottom: '20px solid var(--primary)',
          filter: 'drop-shadow(0 0 5px rgba(195, 157, 99, 0.5))'
        }} />
        {/* South Pointer (Silver) */}
        <div style={{
          width: 0,
          height: 0,
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '20px solid rgba(255, 255, 255, 0.4)',
        }} />
      </div>

      {/* Center Pivot Point */}
      <div style={{
        position: 'absolute',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 0 10px rgba(255,255,255,0.8)',
        zIndex: 2
      }} />

      {/* Direction Labels (Tiny) */}
      <span style={{ position: 'absolute', top: '4px', fontSize: '8px', color: 'var(--primary)', fontWeight: 'bold' }}>N</span>
      <span style={{ position: 'absolute', bottom: '4px', fontSize: '8px', color: 'rgba(255,255,255,0.5)' }}>S</span>
      <span style={{ position: 'absolute', right: '4px', fontSize: '8px', color: 'rgba(255,255,255,0.5)' }}>E</span>
      <span style={{ position: 'absolute', left: '4px', fontSize: '8px', color: 'rgba(255,255,255,0.5)' }}>W</span>
    </div>
  );
};

export default Compass;
