import React, { useEffect } from 'react';
import CoastalVillas from '../components/CoastalVillas';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CoastalLuxuryVillas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark min-vh-100">
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <CoastalVillas />
      </div>
      <Footer />
    </div>
  );
}
