import React, { useState } from 'react';
import { Bell, User, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const PropertyAlert = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: 'All'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/alerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', phone: '', city: 'All' });
                setTimeout(() => setIsSuccess(false), 5000);
            }
        } catch (error) {
            console.error('Error setting alert:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="container mt-0 mb-5 scroll-reveal">
            <div style={{ 
                padding: '50px', 
                borderRadius: '40px', 
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
            }}>
                <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 350px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ 
                                padding: '18px', 
                                background: '#1c1c1c', 
                                borderRadius: '20px',
                                border: '1px solid rgba(195,157,99,0.1)',
                                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
                            }}>
                                <Bell size={36} color="var(--primary)" />
                            </div>
                            <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--primary)', fontWeight: '700', fontFamily: "'Outfit', sans-serif" }}>Property Alerts</h2>
                        </div>
                        <p style={{ fontSize: '1.25rem', color: '#888', lineHeight: '1.8', marginBottom: '40px', maxWidth: '450px' }}>
                            Don't miss out on your dream home. Get notified instantly when a new property matches your preference in your favorite city.
                        </p>
                        
                        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ color: '#22c55e', display: 'flex' }}><CheckCircle size={20} /></div>
                                <span style={{ fontSize: '1rem', color: '#eee', fontWeight: '500' }}>Instant Notifications</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ color: '#22c55e', display: 'flex' }}><CheckCircle size={20} /></div>
                                <span style={{ fontSize: '1rem', color: '#eee', fontWeight: '500' }}>Exclusive Early Access</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: '1 1 450px' }}>
                        {isSuccess ? (
                            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '60px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '30px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                                <div style={{ marginBottom: '25px' }}>
                                    <CheckCircle size={80} color="#22c55e" style={{ display: 'inline-block' }} />
                                </div>
                                <h3 style={{ fontSize: '2rem', color: '#22c55e', marginBottom: '15px', fontWeight: '700' }}>You're all set!</h3>
                                <p style={{ color: '#888', fontSize: '1.1rem' }}>We'll notify you as soon as new properties are live.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="alert-form-modern" style={{ display: 'grid', gap: '25px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '25px' }}>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '0.9rem', color: '#999', fontWeight: '500' }}><User size={16} /> Name</label>
                                        <input 
                                            type="text" 
                                            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', padding: '15px 20px', borderRadius: '12px', color: '#fff', width: '100%', fontSize: '1rem' }}
                                            placeholder="John Doe" 
                                            required 
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '0.9rem', color: '#999', fontWeight: '500' }}><Mail size={16} /> Email</label>
                                        <input 
                                            type="email" 
                                            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', padding: '15px 20px', borderRadius: '12px', color: '#fff', width: '100%', fontSize: '1rem' }}
                                            placeholder="john@example.com" 
                                            required 
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '25px' }}>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '0.9rem', color: '#999', fontWeight: '500' }}><Phone size={16} /> WhatsApp Number</label>
                                        <input 
                                            type="tel" 
                                            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', padding: '15px 20px', borderRadius: '12px', color: '#fff', width: '100%', fontSize: '1rem' }}
                                            placeholder="+91 98765-43210" 
                                            required 
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '0.9rem', color: '#999', fontWeight: '500' }}><MapPin size={16} /> Preferred City</label>
                                        <select 
                                            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', padding: '15px 20px', borderRadius: '12px', color: '#fff', width: '100%', fontSize: '1rem', appearance: 'none' }}
                                            value={formData.city}
                                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                                        >
                                            <option value="All">All Cities</option>
                                            <option value="Indore">Indore</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Pune">Pune</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Gurgaon">Gurgaon</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn-primary-modern" 
                                    style={{ 
                                        padding: '18px', 
                                        fontSize: '1.2rem', 
                                        fontWeight: '700', 
                                        marginTop: '15px', 
                                        background: 'var(--primary)', 
                                        color: '#fff', 
                                        border: 'none', 
                                        borderRadius: '15px', 
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 10px 30px rgba(195, 157, 99, 0.3)'
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Activating...' : 'Activate Property Alerts'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .btn-primary-modern:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(195, 157, 99, 0.4);
                    filter: brightness(1.1);
                }
                .btn-primary-modern:active {
                    transform: translateY(-1px);
                }
                @media (max-width: 768px) {
                    .alert-form-modern > div {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default PropertyAlert;
