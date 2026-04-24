import React from 'react';

function StatusBadge() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
      <div 
        className="status-badge"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'linear-gradient(to right, #0a2e1d, #124d31)', // Dark green gradient
          color: '#2ecc71', // Light green text
          padding: '8px 24px',
          borderRadius: '50px', // Pill shape
          boxShadow: '0 4px 15px rgba(46, 204, 113, 0.2)', // Soft glow
          fontWeight: 600,
          fontSize: '0.9rem',
          letterSpacing: '0.5px'
        }}
      >
        <div style={{ 
          width: '8px', 
          height: '8px', 
          backgroundColor: '#2ecc71', 
          borderRadius: '50%', 
          marginRight: '12px',
          boxShadow: '0 0 8px #2ecc71'
        }}></div>
        
        Available for new projects
        
        <div style={{ 
          width: '8px', 
          height: '8px', 
          backgroundColor: '#2ecc71', 
          borderRadius: '50%', 
          marginLeft: '12px',
          boxShadow: '0 0 8px #2ecc71'
        }}></div>
      </div>

      <style>
        {`
          .status-badge {
            animation: pulse-glow 2s infinite;
          }
          @keyframes pulse-glow {
            0% { box-shadow: 0 4px 15px rgba(46, 204, 113, 0.2); }
            50% { box-shadow: 0 4px 25px rgba(46, 204, 113, 0.4); }
            100% { box-shadow: 0 4px 15px rgba(46, 204, 113, 0.2); }
          }
        `}
      </style>
    </div>
  );
}

export default StatusBadge;
