import React, { useState } from 'react';
import { QrCode, X } from 'lucide-react';

const FloatingQRCode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUrl = window.location.href;

  return (
    <div className="qr-code-container" style={{
      position: 'fixed',
      bottom: '30px',
      left: '30px',
      zIndex: 9998,
    }}>
      {isOpen ? (
        <div className="glass-premium animate-slide-up" style={{
          padding: '20px',
          textAlign: 'center',
          border: '1px solid rgba(195, 157, 99, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        }}>
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
          
          <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--primary)', letterSpacing: '1px' }}>SCAN TO SHARE</h4>
          
          <div style={{
            background: '#fff',
            padding: '10px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`} 
              alt="QR Code"
              style={{ width: '150px', height: '150px' }}
            />
          </div>
          
          <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', maxWidth: '150px' }}>
            Scan this code to quickly share this page with friends.
          </p>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="glass btn-icon"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(195, 157, 99, 0.15)',
            border: '1px solid rgba(195, 157, 99, 0.3)',
            color: 'var(--primary)',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            transition: 'all 0.3s var(--apple-spring)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
            e.currentTarget.style.background = 'var(--primary)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.background = 'rgba(195, 157, 99, 0.15)';
            e.currentTarget.style.color = 'var(--primary)';
          }}
        >
          <QrCode size={24} />
        </button>
      )}
    </div>
  );
};

export default FloatingQRCode;
