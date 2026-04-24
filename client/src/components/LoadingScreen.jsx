import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Start fade out after 1.5s
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1500);

    // Completely unmount after 2.2s (allowing 0.7s for fade out transition)
    const removeTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto'; // Unlock scroll
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!loading) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'var(--bg-dark)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
        pointerEvents: fading ? 'none' : 'auto'
      }}
    >
      {/* Decorative pulse ring */}
      <div className="absolute-pulse" style={{ position: 'relative' }}>
        <div 
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120px', height: '120px',
            border: '2px solid rgba(195, 157, 99, 0.3)',
            borderRadius: '50%',
            animation: 'pulseRing 1.5s infinite linear'
          }}
        />
        
        {/* Central Logo */}
        <div 
          style={{
            background: 'var(--primary)',
            width: '80px', height: '80px',
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(195, 157, 99, 0.5)',
            transform: 'rotate(45deg)',
            animation: 'floatBounce 2s infinite ease-in-out'
          }}
        >
          <div style={{ transform: 'rotate(-45deg)', color: '#111318' }}>
            <Home size={40} />
          </div>
        </div>
      </div>
      
      <h1 
        style={{ 
          color: 'var(--primary)', 
          marginTop: '60px', 
          fontFamily: 'Outfit, sans-serif', 
          letterSpacing: '2px', 
          fontSize: '1.8rem',
          animation: 'fadeInOut 2s infinite ease-in-out'
        }}
      >
        BASERA ASSOCIATES
      </h1>

      <style>
        {`
          @keyframes pulseRing {
            0% { width: 80px; height: 80px; opacity: 1; }
            100% { width: 220px; height: 220px; opacity: 0; }
          }
          @keyframes floatBounce {
            0%, 100% { transform: translateY(0) rotate(45deg); }
            50% { transform: translateY(-15px) rotate(45deg); box-shadow: 0 15px 40px rgba(195, 157, 99, 0.6); }
          }
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
