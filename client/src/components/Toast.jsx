import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'var(--success)' : 'var(--danger)';
  
  return (
    <div 
      className="glass" 
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderLeft: `5px solid ${bgColor}`,
        animation: 'slideIn 0.3s ease-out forwards',
        minWidth: '300px'
      }}
    >
      {type === 'success' ? (
        <CheckCircle size={20} style={{ color: 'var(--success)' }} />
      ) : (
        <AlertCircle size={20} style={{ color: 'var(--danger)' }} />
      )}
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: '600' }}>{type === 'success' ? 'Success' : 'Error'}</p>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{message}</p>
      </div>
      <X size={16} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={onClose} />
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Toast;
