import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Download, Phone, MapPin, Calendar, Video, Flame, Eye, TrendingUp, Users, Calculator, User, Mail } from 'lucide-react';
import EMICalculator from '../components/EMICalculator';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitData, setVisitData] = useState({ name: '', phone: '', date: '', time: '', message: '' });
  const [isSubmittingVisit, setIsSubmittingVisit] = useState(false);

  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [brochureFormData, setBrochureFormData] = useState({ name: '', email: '', phone: '' });
  const [brochureSubmitted, setBrochureSubmitted] = useState(false);
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 15) + 5);
  const [isPopular, setIsPopular] = useState(Math.random() > 0.5);

  // Helper to format price in Indian units (Lakh/Cr)
  const formatIndianPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(2)} Lakh`;
    return price.toLocaleString('en-IN');
  };

  useEffect(() => {
    // Fetch all and filter (for prototype simplicity)
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p._id === id);
        setProject(found);
      })
      .catch(err => console.error(err));
    // Dynamic update for viewers
    const interval = setInterval(() => {
       setViewers(v => Math.max(3, v + (Math.random() > 0.5 ? 1 : -1)));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [id]);

  const handleInterestSubmit = (e) => {
    e.preventDefault();
    if (offerPrice <= 0 || !name.trim() || !email.trim()) {
      alert("Please provide valid details and offer price.");
      return;
    }
    
    setIsSubmitting(true);
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        projectId: id, 
        name, 
        email, 
        offerPrice
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(data => {
        alert("Your offer has been sent to admin");
        setName('');
        setEmail('');
        setOfferPrice('');
        setIsSubmitting(false);
      })
      .catch(err => {
        console.error(err);
        alert("Feature temporarily unavailable");
        setIsSubmitting(false);
      });
  };

  const handleScheduleVisit = (e) => {
    e.preventDefault();
    setIsSubmittingVisit(true);
    fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: visitData.name,
        userPhone: visitData.phone,
        projectId: id,
        date: visitData.date,
        time: visitData.time,
        message: visitData.message
      })
    })
    .then(res => res.json())
    .then(data => {
      alert('Visit scheduled successfully!');
      setShowVisitModal(false);
      setVisitData({ name: '', phone: '', date: '', time: '', message: '' });
    })
    .catch(err => {
      console.error(err);
      alert('Failed to schedule visit.');
    })
    .finally(() => setIsSubmittingVisit(false));
  };

  const today = new Date().toISOString().split('T')[0];

  if (!project) return <div className="container mt-4">Loading project details...</div>;

  return (
    <div className="container mt-4 mb-4">
      <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back to listings
      </Link>
      
      <div style={{ display: 'flex', gap: 'clamp(20px, 5vw, 40px)', alignItems: 'start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img 
            src={project.images && project.images.length > 0 ? project.images[0] : `https://images.unsplash.com/photo-${['1560518883-ce09059eeffa', '1512917774080-9991f1c4c750', '1600585154340-be6161a56a0c', '1600607687940-c52af04657b3', '1545324418-cc1a3fa10c00'][project.title.length % 5]}?q=80&w=2073`} 
            alt={project.title} 
            style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border)' }} 
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = `https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073`;
            }}
          />
          {project.images && project.images.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', overflowX: 'auto' }}>
              {project.images.slice(1).map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt="Property View" 
                  style={{ height: '80px', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }} 
                  loading="lazy" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=200`;
                  }}
                />
              ))}
            </div>
          )}
          <div className="glass" style={{ padding: '20px', marginTop: '20px' }}>
            <h3 style={{ marginBottom: '15px' }}>Top Amenities</h3>
            <ul style={{ listStyle: 'none' }}>
              {(project.amenities || []).map((amenity, i) => (
                <li key={i} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  <CheckCircle size={18} color="var(--success)" style={{ marginRight: '10px' }} /> {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="badge">{project.type}</div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '10px', color: 'var(--primary)', lineHeight: 1.1 }}>{project.title}</h1>
          <p style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', marginBottom: '20px', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>
            <MapPin size={18} style={{ marginRight: '8px' }} /> {project.location}
          </p>
          
          <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 'bold', marginBottom: '10px' }}>
            ₹ {formatIndianPrice(project.price)}
          </div>
          
          {project.status === 'Available' && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '30px',
              animation: 'pulse-subtle 3s infinite ease-in-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600', background: 'rgba(195,157,99,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                <Eye size={14} />
                <span>{viewers} people viewing this property</span>
              </div>
              {isPopular && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ef4444', fontSize: '0.9rem', fontWeight: '600', background: 'rgba(239,68,68,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                  <Flame size={14} />
                  <span>High Demand</span>
                </div>
              )}
            </div>
          )}

          <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: 'var(--text-main)', opacity: 0.9 }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setShowBrochureModal(true)} 
              className="btn btn-primary btn-animated" 
              style={{ display: 'flex', alignItems: 'center', flex: '1 1 200px', justifyContent: 'center', height: '54px', fontSize: '1rem', borderRadius: '12px' }}
            >
              <Download size={20} style={{ marginRight: '10px' }} /> Request Brochure
            </button>
            <a href={`tel:${project.phone || '+919876543210'}`} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', flex: '1 1 200px', justifyContent: 'center', textDecoration: 'none', borderRadius: '12px', height: '54px' }}>
              <Phone size={18} style={{ marginRight: '8px' }} /> Helpline
            </a>
          </div>

          {/* Book Now & Schedule Visit Button Section */}
          <div style={{ marginBottom: '40px', display: 'flex', gap: '15px', flexDirection: 'column' }}>
             <Link to={`/payment/${project._id}`} className="btn btn-primary" style={{ 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               width: '100%', 
               fontSize: '1.2rem', 
               padding: '15px', 
               fontWeight: 'bold',
               boxShadow: isPopular ? '0 0 15px rgba(195,157,99,0.3)' : 'none',
               animation: isPopular ? 'pulse-button 2s infinite ease-in-out' : 'none'
             }}>
                Book Now (Pay Token Amount)
             </Link>
             {isPopular && (
               <p style={{ margin: '-10px 0 0 0', textAlign: 'center', color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', animation: 'fadeIn 0.5s ease' }}>
                ⚠️ Hurry! Only a few units left at this price
               </p>
             )}
             <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
               <button onClick={() => setShowVisitModal(true)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1 1 200px', fontSize: '1.1rem', padding: '12px', minHeight: '54px' }}>
                  <Calendar size={20} style={{ marginRight: '10px' }} /> Schedule a Visit
               </button>
               <button onClick={() => setShowVirtualTour(true)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1 1 200px', fontSize: '1.1rem', padding: '12px', borderColor: 'var(--success)', color: 'var(--success)', minHeight: '54px' }}>
                  <Video size={20} style={{ marginRight: '10px' }} /> Virtual Tour
               </button>
             </div>
          </div>

          <div className="glass" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>Express Interest</h3>
            <form onSubmit={handleInterestSubmit}>
              <div className="input-group">
                <label>Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="input-group">
                <label>Your Negotiated Price Offer (₹)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="Enter amount"
                  required
                />
              </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>

          <EMICalculator defaultAmount={project.price} />
        </div>
      </div>

      {/* Schedule Visit Modal */}
      {showVisitModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass animate-slide-up" style={{ width: '100%', maxWidth: '500px', padding: '30px', borderRadius: '20px', position: 'relative' }}>
            <button onClick={() => setShowVisitModal(false)} style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Schedule Property Visit</h3>
            <form onSubmit={handleScheduleVisit}>
               <div className="input-group">
                 <label>Name</label>
                 <input type="text" className="form-control" value={visitData.name} onChange={e => setVisitData({...visitData, name: e.target.value})} required />
               </div>
               <div className="input-group">
                 <label>Phone Number</label>
                 <input type="tel" className="form-control" value={visitData.phone} onChange={e => setVisitData({...visitData, phone: e.target.value})} required />
               </div>
               <div style={{ display: 'flex', gap: '15px' }}>
                 <div className="input-group" style={{ flex: 1 }}>
                   <label>Preferred Date</label>
                   <input type="date" className="form-control" min={today} value={visitData.date} onChange={e => setVisitData({...visitData, date: e.target.value})} required />
                 </div>
                 <div className="input-group" style={{ flex: 1 }}>
                   <label>Preferred Time</label>
                   <select className="form-control" value={visitData.time} onChange={e => setVisitData({...visitData, time: e.target.value})} required>
                     <option value="">Select Time</option>
                     <option value="10:00 AM">10:00 AM</option>
                     <option value="12:00 PM">12:00 PM</option>
                     <option value="02:00 PM">02:00 PM</option>
                     <option value="04:00 PM">04:00 PM</option>
                     <option value="06:00 PM">06:00 PM</option>
                   </select>
                 </div>
               </div>
               <div className="input-group">
                 <label>Message (Optional)</label>
                 <textarea className="form-control" rows="3" value={visitData.message} onChange={e => setVisitData({...visitData, message: e.target.value})}></textarea>
               </div>
               <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={isSubmittingVisit}>
                 {isSubmittingVisit ? 'Scheduling...' : 'Confirm Schedule'}
               </button>
            </form>
          </div>
        </div>
      )}

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,17,21,0.95)', zIndex: 2000, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.4s ease' }}>
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <h2 style={{ color: 'var(--primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Video size={24} /> 360° Virtual Tour</h2>
              <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0', fontSize: '0.9rem' }}>Interactive view - Drag to rotate, scroll to zoom.</p>
            </div>
            <button onClick={() => setShowVirtualTour(false)} style={{ background: 'var(--danger)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>Close Tour</button>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <iframe 
               width="100%" 
               height="100%" 
               style={{ border: 'none' }} 
               src="https://pannellum.org/pannellum.htm?autoLoad=true&panorama=https://pannellum.org/images/alma.jpg" 
               allowFullScreen
               title="360 Virtual Tour"
            />
          </div>
        </div>
      )}

      {/* Brochure Request Modal */}
      {showBrochureModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass animate-slide-up" style={{ width: '100%', maxWidth: '550px', padding: '50px 40px 60px', borderRadius: '32px', border: '1px solid rgba(195, 157, 99, 0.3)', position: 'relative' }}>
            <button onClick={() => { setShowBrochureModal(false); setBrochureSubmitted(false); }} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>&times;</button>
            
            {!brochureSubmitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'rgba(195, 157, 99, 0.1)', borderRadius: '15px', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <Download size={30} />
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 10px 0' }}>Request Brochure</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Receive the complete brochure and pricing details for <strong>{project?.title}</strong>.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setBrochureSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', color: 'var(--primary)', zIndex: 2 }} />
                    <input type="text" placeholder="Full Name" required className="form-control" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px' }} onChange={e => setBrochureFormData({...brochureFormData, name: e.target.value})} />
                  </div>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '16px', color: 'var(--primary)', zIndex: 2 }} />
                    <input type="email" placeholder="Email Address" required className="form-control" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px' }} onChange={e => setBrochureFormData({...brochureFormData, email: e.target.value})} />
                  </div>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '16px', color: 'var(--primary)', zIndex: 2 }} />
                    <input type="tel" placeholder="Phone Number" required className="form-control" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px' }} onChange={e => setBrochureFormData({...brochureFormData, phone: e.target.value})} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', border: 'none', justifyContent: 'center', marginTop: '10px', height: '54px' }}>
                    Get Brochure
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '70px', height: '70px', background: 'rgba(52, 199, 89, 0.1)', borderRadius: '50%', color: '#34c759', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', flexShrink: 0 }}>
                   <CheckCircle size={32} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 10px 0' }}>Thank You!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.5', marginBottom: '25px', maxWidth: '400px' }}>
                  Your request has been received. 
                  <span style={{ color: 'var(--primary)', fontWeight: '700', display: 'block', marginTop: '5px' }}>You can download the brochure below.</span>
                </p>
                {project.brochureUrl ? (
                  <a href={project.brochureUrl} download className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#34c759', color: '#fff', border: 'none', height: '54px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '700', boxShadow: '0 10px 30px rgba(52, 199, 89, 0.2)' }}>
                     <Download size={18} /> Download Brochure PDF
                  </a>
                ) : (
                  <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" download className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#34c759', color: '#fff', border: 'none', height: '54px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '700', boxShadow: '0 10px 30px rgba(52, 199, 89, 0.2)' }}>
                     <Download size={18} /> Download Sample Brochure
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
