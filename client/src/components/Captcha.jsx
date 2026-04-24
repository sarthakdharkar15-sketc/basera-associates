import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

const Captcha = ({ onVerify }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  const handleStart = (e) => {
    if (isVerified) return;
    setIsDragging(true);
  };

  const handleMove = (e) => {
    if (!isDragging || isVerified) return;
    
    const container = containerRef.current;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const rect = container.getBoundingClientRect();
    let offset = clientX - rect.left - 25; // 25 is half of slider width (50px)

    const maxOffset = rect.width - 50 - 6; // container width - slider width - padding
    
    if (offset < 0) offset = 0;
    if (offset > maxOffset) offset = maxOffset;

    setPosition(offset);

    if (offset >= maxOffset) {
      setIsVerified(true);
      setIsDragging(false);
      onVerify(true);
    }
  };

  const handleEnd = () => {
    if (isVerified) return;
    setIsDragging(false);
    if (!isVerified) {
      setPosition(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);
    } else {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div className="captcha-wrapper" style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        Security Verification
      </label>
      <div 
        ref={containerRef}
        className="captcha-container"
        style={{
          width: '100%',
          height: '50px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '25px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: '0 3px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          userSelect: 'none'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${position + 25}px`,
            background: isVerified ? 'rgba(46, 204, 113, 0.2)' : 'rgba(195, 157, 99, 0.1)',
            transition: isDragging ? 'none' : 'width 0.3s ease',
            zIndex: 1
          }}
        />
        
        <div 
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: isVerified ? 'var(--success)' : 'var(--text-muted)',
            fontWeight: '600',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          {isVerified ? 'Verification Complete' : 'Slide to verify you are human'}
        </div>

        <div
          ref={sliderRef}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          style={{
            width: '44px',
            height: '44px',
            background: isVerified ? 'var(--success)' : 'var(--primary)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isVerified ? 'default' : 'grab',
            transform: `translateX(${position}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease',
            zIndex: 3,
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            color: '#fff'
          }}
        >
          {isVerified ? <ShieldCheck size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>
    </div>
  );
};

export default Captcha;
