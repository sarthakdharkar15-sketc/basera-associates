import React from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0f1115',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
          color: '#fff',
          fontFamily: 'Outfit, sans-serif'
        }}>
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '40px',
            borderRadius: '24px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <div style={{
              background: '#ef4444',
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 25px auto',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)'
            }}>
              <AlertTriangle size={32} color="#fff" />
            </div>
            
            <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>Oops! Something went wrong</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '30px' }}>
              We encountered an unexpected error. This usually happens due to a temporary connection issue or a configuration mismatch.
            </p>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                onClick={() => window.location.reload()}
                className="btn btn-primary"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '12px 25px',
                  borderRadius: '12px'
                }}
              >
                <RefreshCcw size={18} /> Try Again
              </button>
              <button 
                onClick={this.handleReset}
                className="btn btn-outline"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '12px 25px',
                  borderRadius: '12px'
                }}
              >
                <Home size={18} /> Go Home
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <pre style={{
                marginTop: '30px',
                padding: '15px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                textAlign: 'left',
                overflowX: 'auto',
                color: '#ff7b7b'
              }}>
                {this.state.error && this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
