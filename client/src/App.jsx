import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import LoadingScreen from './components/LoadingScreen';
import WhatsAppButton from './components/WhatsAppButton';
import Compass from './components/Compass';
import FloatingQRCode from './components/FloatingQRCode';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Auth = lazy(() => import('./pages/Auth'));
const About = lazy(() => import('./pages/About'));
const ExtraOrdinaryMoment = lazy(() => import('./pages/ExtraOrdinaryMoment'));
const Payment = lazy(() => import('./pages/Payment'));
const Services = lazy(() => import('./pages/Services'));
const ReraCompliance = lazy(() => import('./pages/ReraCompliance'));
const VastuCompliance = lazy(() => import('./pages/VastuCompliance'));
const BrokerNetwork = lazy(() => import('./pages/BrokerNetwork'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Invest = lazy(() => import('./pages/Invest'));
const CoastalLuxuryVillas = lazy(() => import('./pages/CoastalLuxuryVillas'));
const AltamountCrown = lazy(() => import('./pages/AltamountCrown'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const MumbaiExpansionPage = lazy(() => import('./pages/MumbaiExpansionPage'));
const JagdishBhawan = lazy(() => import('./pages/JagdishBhawan'));
const Portfolio = lazy(() => import('./pages/Portfolio'));


function App() {
  
  // Global intersection observer for seamless scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Re-bind observer periodically to catch lazily loaded or routed elements
    const bindObserver = () => {
      const elements = document.querySelectorAll('.scroll-reveal:not(.visible)');
      elements.forEach((el) => observer.observe(el));
    };

    bindObserver();
    
    // Bind upon clicks or mutations as generic hook (since React router changes views without full reload)
    const mutationObserver = new MutationObserver(bindObserver);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId="731871261313-v9o89v15vj2sjr8f68f68f68f68f68f68f68f6.apps.googleusercontent.com">
      <AuthProvider>
        <ScrollToTop />
        <LoadingScreen />
        <div className="app-container">
          <Navbar />
          <Suspense fallback={<div className="loading-placeholder" style={{ minHeight: '100vh', background: '#0f1115' }}></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<div className="app-content"><About /></div>} />
              <Route path="/services" element={<div className="app-content"><Services /></div>} />
              <Route path="/extra-ordinary" element={<div className="app-content"><ExtraOrdinaryMoment /></div>} />
              <Route path="/project/:id" element={<div className="app-content"><ProjectDetails /></div>} />
              <Route path="/admin" element={<div className="app-content"><AdminDashboard /></div>} />
              <Route path="/auth" element={<div className="app-content"><Auth /></div>} />
              <Route path="/payment/:id" element={<div className="app-content"><Payment /></div>} />
              <Route path="/rera-compliance" element={<div className="app-content"><ReraCompliance /></div>} />
              <Route path="/vastu-homes" element={<div className="app-content"><VastuCompliance /></div>} />
              <Route path="/broker-network" element={<div className="app-content"><BrokerNetwork /></div>} />
              <Route path="/pricing" element={<div className="app-content"><Pricing /></div>} />
              <Route path="/invest" element={<div className="app-content"><Invest /></div>} />
              <Route path="/coastal-villas" element={<div className="app-content"><CoastalLuxuryVillas /></div>} />
              <Route path="/altamount-crown" element={<div className="app-content"><AltamountCrown /></div>} />
              <Route path="/dashboard" element={<div className="app-content"><UserDashboard /></div>} />
              <Route path="/mumbai-expansion" element={<MumbaiExpansionPage />} />
              <Route path="/jagdish-bhawan" element={<div className="app-content"><JagdishBhawan /></div>} />
              <Route path="/portfolio" element={<div className="app-content"><Portfolio /></div>} />
            </Routes>
          </Suspense>
          <Chatbot />
          <WhatsAppButton />
          <FloatingQRCode />
          <Compass />
          <Footer />
        </div>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
