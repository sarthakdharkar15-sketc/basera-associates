import React, { useEffect } from 'react';
import CoastalVillas from '../components/CoastalVillas';

export default function CoastalLuxuryVillas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark min-vh-100">
      <div style={{ paddingTop: '80px' }}>
        <CoastalVillas />
      </div>
    </div>
  );
}
