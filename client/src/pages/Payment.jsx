import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle, AlertTriangle, Zap, Crown, Shield } from 'lucide-react';

const MEMBERSHIP_PLANS = {
  'membership-basic-premium': { 
    name: 'Basic Premium', 
    price: 99, 
    period: 'month',
    icon: <Zap size={40} color="#c39d63" />,
    description: 'Perfect for exploring the high-growth property market.'
  },
  'membership-broker-plan': { 
    name: 'Broker Plan', 
    price: 299, 
    period: 'month',
    icon: <Crown size={40} color="#4f46e5" />,
    description: 'Elite tools for professional brokers and real estate agents.'
  },
  'membership-yearly-value': { 
    name: 'Yearly Value', 
    price: 999, 
    period: 'year',
    icon: <Shield size={40} color="#22c55e" />,
    description: 'Unbeatable value for serious long-term investors.'
  }
};

function Payment() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [membership, setMembership] = useState(null);
  
  // User Form State
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  
  // Loading & Flow State
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failed', or null
  
  const RAZORPAY_KEY = 'rzp_test_dummykey';
  const TOKEN_AMOUNT = 50000; // Fixed token amount 50,000 INR for projects

  useEffect(() => {
    if (id.startsWith('membership-')) {
      setMembership(MEMBERSHIP_PLANS[id]);
      setLoading(false);
    } else {
      fetch('/api/projects')
        .then(res => res.json())
        .then(data => {
          const found = data.find(p => p._id === id);
          setProject(found);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
      
    // Load Razorpay Script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [id]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) {
      alert("Please fill in all your details to proceed.");
      return;
    }
    
    setIsProcessing(true);
    setPaymentStatus(null);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const payload = {
        userName,
        userEmail,
        userPhone,
        amount: membership ? membership.price : TOKEN_AMOUNT
      };

      if (membership) {
        payload.membershipPlan = membership.name;
      } else {
        payload.projectId = project._id;
      }

      const verifyRes = await fetch('/api/payment/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if(verifyRes.ok) {
         setPaymentStatus('success');
      } else {
         setPaymentStatus('failed');
      }
    } catch(e) {
      setPaymentStatus('failed');
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="container mt-4" style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading payment gateway...</div>;
  if (!project && !membership) return <div className="container mt-4" style={{ textAlign: 'center', padding: '100px' }}><h3 style={{color:'var(--danger)'}}>Order Reference Not Found</h3><Link to="/" style={{color: 'var(--primary)'}}>Return Home</Link></div>;

  const currentAmount = membership ? membership.price : TOKEN_AMOUNT;
  const currentTitle = membership ? membership.name : project.title;

  return (
    <div className="container mt-4 mb-4" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '100px' }}>
       
       <div style={{ width: '100%', maxWidth: '900px' }}>
         <Link to={membership ? "/pricing" : `/project/${id}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '30px', fontWeight: '600' }}>
            <ArrowLeft size={18} style={{ marginRight: '8px' }} /> {membership ? 'Back to Plans' : 'Back to Property'}
         </Link>
         
         {paymentStatus === 'success' ? (
           <div className="glass animate-fade-in" style={{ padding: '60px 40px', textAlign: 'center', borderRadius: '30px', borderTop: '6px solid var(--success)', background: 'rgba(34, 197, 94, 0.05)' }}>
              <div style={{ marginBottom: '30px' }}>
                <CheckCircle size={80} style={{ color: 'var(--success)', display: 'inline-block' }} />
              </div>
              <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '2.5rem', fontWeight: '800' }}>Payment Successful!</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px', lineHeight: '1.6' }}>
                {membership ? (
                  <>You are now subscribed to the <strong>{membership.name}</strong> plan.<br />Welcome to the elite club of Basera Associates.</>
                ) : (
                  <>Thank you for booking <strong>{project.title}</strong>.<br />Our team has been notified and will contact you shortly to process your file.</>
                )}
              </p>
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '15px 40px', borderRadius: '12px', fontWeight: '700' }}>Go to Dashboard</Link>
           </div>
         ) : (
           <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '40px' }}>
              
              {/* Order Details Card */}
              <div className="glass" style={{ padding: '40px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <h3 style={{ marginBottom: '30px', color: 'var(--primary)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px', fontWeight: '800' }}>Order Summary</h3>
                 
                 <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'center' }}>
                    {membership ? (
                      <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {membership.icon}
                      </div>
                    ) : (
                      <img src={project.images[0]} alt={project.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '20px' }} />
                    )}
                    <div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', fontWeight: '700' }}>{currentTitle}</h4>
                      <div className="badge" style={{ background: membership ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: membership ? '#000' : '#fff' }}>
                        {membership ? 'MEMBERSHIP PLAN' : project.type}
                      </div>
                    </div>
                 </div>
                 
                 {membership && (
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '30px', fontStyle: 'italic' }}>
                     {membership.description}
                   </p>
                 )}

                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    <span>{membership ? 'Plan Duration:' : 'Property Value:'}</span>
                    <span style={{ color: '#fff', fontWeight: '600' }}>{membership ? (membership.period === 'year' ? '1 Year' : '1 Month') : `₹ ${project.price.toLocaleString()}`}</span>
                 </div>

                 <div style={{ padding: '25px', background: 'rgba(195, 157, 99, 0.05)', borderRadius: '20px', border: '1px solid rgba(195,157,199,0.1)', marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'rgba(255,255,255,0.7)' }}>Total Payable:</span>
                      <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>₹ {currentAmount.toLocaleString()}</span>
                    </div>
                 </div>
                 
                 <div style={{ padding: '20px', background: 'rgba(52,152,219,0.05)', borderRadius: '20px', color: '#3498db', fontSize: '0.9rem', display: 'flex', gap: '12px', marginTop: '30px', border: '1px solid rgba(52,152,219,0.1)' }}>
                    <AlertTriangle size={20} style={{ flexShrink: 0 }} />
                    <p style={{ margin: 0, lineHeight: '1.5' }}>
                      {membership 
                        ? "Access to premium features will be granted immediately after successful transaction."
                        : "This token amount secures your property and is fully deductible from the final price."}
                    </p>
                 </div>
              </div>

              {/* Payment Form */}
              <div className="glass hover-glow" style={{ padding: '40px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <h3 style={{ marginBottom: '30px', fontWeight: '800' }}>Billing Details</h3>
                 
                 {paymentStatus === 'failed' && (
                    <div style={{ color: 'var(--danger)', padding: '15px', background: 'rgba(231,76,60,0.1)', borderRadius: '12px', marginBottom: '30px', textAlign: 'center', fontWeight: '600', border: '1px solid rgba(231,76,60,0.2)' }}>
                       Transaction failed. Please try again or use another method.
                    </div>
                 )}
                 
                 <form onSubmit={handlePayment} style={{ display: 'grid', gap: '25px' }}>
                    <div className="input-group">
                      <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>FULL NAME</label>
                      <input type="text" className="form-control" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '15px', borderRadius: '12px', width: '100%' }} value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter your full name" required />
                    </div>
                    <div className="input-group">
                      <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>EMAIL ADDRESS</label>
                      <input type="email" className="form-control" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '15px', borderRadius: '12px', width: '100%' }} value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Email for activation" required />
                    </div>
                    <div className="input-group">
                      <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>PHONE NUMBER</label>
                      <input type="tel" className="form-control" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '15px', borderRadius: '12px', width: '100%' }} value={userPhone} onChange={e => setUserPhone(e.target.value)} placeholder="+91 00000 00000" required />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', padding: '18px', borderRadius: '15px', fontSize: '1.2rem', fontWeight: '800' }} disabled={isProcessing}>
                       {isProcessing ? (
                         <>Processing...</>
                       ) : (
                         <><CreditCard size={22} /> Proceed to Pay ₹ {currentAmount.toLocaleString()}</>
                       )}
                    </button>
                    <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                       <Shield size={14} /> Secured by Razorpay Gateway
                    </p>
                 </form>
              </div>

           </div>
         )}
       </div>
    </div>
  );
}

export default Payment;
