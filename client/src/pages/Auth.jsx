import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import Captcha from '../components/Captcha';


function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, signup, user, googleLogin } = useContext(AuthContext);


  useEffect(() => {
    // If user is already logged in, redirect
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      setError('Please complete the security verification.');
      return;
    }

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await signup({ name, email, password });
      }

      if (result.success) {
        setSuccess(isLogin ? "Welcome back! Redirecting..." : "Account created! Welcome to Basera.");
        setTimeout(() => {
          // Redirect happened via useEffect but as backup:
          navigate('/');
        }, 1500);
      } else {
        setError(result.error);
        setIsVerified(false); // Reset captcha on error for security
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await googleLogin(credentialResponse.credential);
      if (result.success) {
        setSuccess("Signed in with Google! Redirecting...");
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Google authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };


  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setIsVerified(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="auth-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'radial-gradient(circle at top right, rgba(195, 157, 99, 0.15) 0%, transparent 40%), radial-gradient(circle at bottom left, rgba(41, 128, 185, 0.1) 0%, transparent 40%)'
    }}>
      <div className="glass-premium animate-slide-up" style={{ 
        width: '100%', 
        maxWidth: '1000px', 
        display: 'flex', 
        overflow: 'hidden',
        minHeight: 'clamp(500px, 80vh, 700px)'
      }}>
        
        {/* Left Side - Visual Context */}
        <div className="auth-visual" style={{ 
          flex: 1, 
          background: "linear-gradient(rgba(15, 17, 21, 0.6), rgba(15, 17, 21, 0.8)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: '#fff'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(195, 157, 99, 0.2)', borderRadius: '100px', marginBottom: '15px', border: '1px solid rgba(195, 157, 99, 0.3)' }}>
              <Shield size={14} color="var(--primary)" />
              <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Secure Platform</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', lineHeight: '1.1', marginBottom: '15px' }}>
              {isLogin ? 'Home starts here.' : 'Built for the modern homeowner.'}
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', maxWidth: '400px' }}>
              {isLogin 
                ? 'Join thousands of premium investors and homeowners in finding their perfect sanctuary.' 
                : 'Create an account to unlock exclusive coastal villas, real-time alerts, and premium investment options.'}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '30px', marginTop: '40px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '30px' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>5000+</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.6 }}>Active Users</p>
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>1200+</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.6 }}>Premium Assets</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-container" style={{ 
          flex: 1, 
          padding: '60px', 
          background: 'rgba(26, 29, 36, 0.4)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '8px' }}>
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {isLogin ? 'Please enter your details to sign in' : 'Create your secure account today'}
            </p>
          </div>

          {error && (
            <div className="animate-fade-in" style={{ 
              background: 'rgba(231, 76, 60, 0.1)', 
              border: '1px solid rgba(231, 76, 60, 0.2)', 
              color: 'var(--danger)', 
              padding: '12px 16px', 
              borderRadius: '12px', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.9rem'
            }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div className="animate-fade-in" style={{ 
              background: 'rgba(46, 204, 113, 0.1)', 
              border: '1px solid rgba(46, 204, 113, 0.2)', 
              color: 'var(--success)', 
              padding: '12px 16px', 
              borderRadius: '12px', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.9rem'
            }}>
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            {!isLogin && (
              <div className="input-field" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.7 }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                    style={{ paddingLeft: '45px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}
                  />
                </div>
              </div>
            )}

            <div className="input-field" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.7 }} />
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="name@email.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  style={{ paddingLeft: '45px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}
                />
              </div>
            </div>

            <div className="input-field" style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Password</label>
                {isLogin && <span style={{ fontSize: '0.8rem', color: 'var(--primary)', cursor: 'pointer' }}>Forgot?</span>}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.7 }} />
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required 
                  style={{ paddingLeft: '45px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}
                />
              </div>
            </div>

            <Captcha onVerify={setIsVerified} />

            <button 
              type="submit" 
              className={`btn btn-primary btn-animated ${isLoading ? 'loading' : ''}`} 
              disabled={isLoading}
              style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              {isLoading ? 'Processing...' : isLogin ? 'Login Now' : 'Create Account'}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div style={{ margin: '25px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Login Failed')}
              useOneTap
              theme="filled_black"
              shape="pill"
              width="100%"
            />
          </div>


          <p style={{ textAlign: 'center', marginTop: '30px', color: 'var(--text-muted)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} 
              onClick={toggleAuthMode}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </p>

          <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.6 }}>
            {isLogin ? 'Admin Hint: admin@basera.com' : 'Join our high-trust network'}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .auth-visual { display: none !important; }
          .auth-form-container { padding: 40px 30px !important; }
        }
        
        .btn-animated.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .input-field input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(195, 157, 99, 0.1);
        }
      `}</style>
    </div>
  );
}

export default Auth;
