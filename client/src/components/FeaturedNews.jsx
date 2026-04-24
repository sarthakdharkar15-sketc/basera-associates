import React, { useState } from 'react';
import { Newspaper, ChevronRight, X, Calendar, Share2, Printer } from 'lucide-react';

const FeaturedNews = () => {
  const [showFullArticle, setShowFullArticle] = useState(false);
  return (
    <section className="featured-news-compact animate-slide-up" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '15px', gap: '15px' }}>
        <h2 style={{ 
          fontFamily: "'Outfit', sans-serif", 
          color: 'var(--text-main)', 
          fontSize: '1.8rem',
          fontWeight: '700',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <Newspaper color="var(--primary)" size={32} /> In Media
        </h2>
      </div>

      <div className="news-card" style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        transition: 'all 0.4s ease',
        border: '1px solid #e1e4e8',
        flex: 1,
        minHeight: '200px'
      }} 
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
      }}
      >
        {/* Left Side: Image */}
        <div className="news-image-container" style={{
          flex: '0 0 50%',
          background: '#f8f9fa',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle decoration to make it feel like a newspaper background */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            opacity: 0.03,
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 10px)'
          }}></div>
          
          <img 
            src="/featured-news.png" 
            alt="Basera Associates Newspaper Article" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: 'rotate(-2deg)',
              boxShadow: '-10px 15px 30px rgba(0,0,0,0.15)',
              borderRadius: '4px',
              transition: 'transform 0.5s ease',
              position: 'relative',
              zIndex: 1,
              backgroundColor: '#fff',
              padding: '10px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-2deg)'}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000";
            }}
          />
        </div>

        {/* Side: Content */}
        <div className="news-content" style={{
          flex: '0 0 50%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: '#333333',
          background: '#ffffff'
        }}>
          <div>
            <span style={{
              display: 'inline-block',
              padding: '6px 14px',
              background: '#f1f3f5',
              color: '#495057',
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '20px',
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}>
              Promotional Article
            </span>
          </div>
          
          <h3 style={{
            fontSize: '1.8rem',
            fontFamily: "'Outfit', sans-serif",
            color: '#212529',
            fontWeight: '700',
            lineHeight: 1.3,
            marginBottom: '20px',
            textShadow: 'none'
          }}>
            Basera Associates: Indore Real Estate Market Mein Ubharta Trusted Naam
          </h3>
          
          <div style={{ marginBottom: '30px' }}>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px' 
            }}>
              {[
                'Premium Quality & Transparency',
                'Indore\'s Emerging Trusted Name',
                'Modern Real Estate Solutions'
              ].map((item, index) => (
                <li key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  color: '#495057',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button 
              onClick={() => setShowFullArticle(true)}
              style={{
                padding: '12px 28px',
                backgroundColor: 'transparent',
                color: 'var(--primary)',
                border: '2px solid var(--primary)',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textShadow: 'none'
              }}
              onMouseEnter={(e) => {
                 e.currentTarget.style.backgroundColor = 'var(--primary)';
                 e.currentTarget.style.color = '#ffffff';
                 e.currentTarget.style.boxShadow = '0 10px 20px rgba(195, 157, 99, 0.4)';
                 const icon = e.currentTarget.querySelector('.arrow-icon');
                 if(icon) icon.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                 e.currentTarget.style.backgroundColor = 'transparent';
                 e.currentTarget.style.color = 'var(--primary)';
                 e.currentTarget.style.boxShadow = 'none';
                 const icon = e.currentTarget.querySelector('.arrow-icon');
                 if(icon) icon.style.transform = 'translateX(0)';
              }}
            >
              About Article <ChevronRight className="arrow-icon" size={18} style={{ transition: 'transform 0.3s ease' }} />
            </button>
          </div>
        </div>
      </div>

      {showFullArticle && (
        <div className="article-modal-overlay" style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.92)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="article-modal-card glass" style={{
            maxWidth: '1200px',
            width: '100%',
            maxHeight: '90vh',
            background: '#ffffff',
            borderRadius: '30px',
            display: 'grid',
            gridTemplateColumns: 'minmax(400px, 1fr) 1.2fr',
            overflow: 'hidden',
            position: 'relative',
            color: '#333'
          }}>
            <button 
              onClick={() => setShowFullArticle(false)}
              style={{ position: 'absolute', top: '25px', right: '25px', background: '#f1f3f5', border: 'none', color: '#333', cursor: 'pointer', padding: '10px', borderRadius: '50%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}
            >
              <X size={24} />
            </button>

            {/* Modal Image Section */}
            <div style={{ background: '#f8f9fa', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #eee' }}>
               <img 
                 src="/featured-news.png" 
                 alt="Full Article" 
                 style={{ width: '100%', height: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.2)', borderRadius: '4px', transform: 'rotate(-1deg)' }} 
               />
            </div>

            {/* Modal Content Section */}
            <div style={{ padding: '80px 60px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', alignItems: 'center' }}>
                <span style={{ padding: '6px 15px', background: '#1e3a8a', color: '#fff', fontSize: '0.75rem', fontWeight: '800', borderRadius: '100px', textTransform: 'uppercase' }}>Indore Times</span>
                <span style={{ fontSize: '0.85rem', color: '#868e96', display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> April 2024</span>
              </div>

              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: '700', fontSize: '2.8rem', lineHeight: '1.2', marginBottom: '30px', color: '#212529' }}>
                Basera Associates: Indore Real Estate Market Mein Ubharta Trusted Naam
              </h2>

              <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#495057', marginBottom: '40px' }}>
                Basera Associates is known for its premium quality, transparency, and strong commitment to customer satisfaction. As a rapidly emerging trusted name in Indore's real estate market, it is dedicated to transforming the local property landscape with visionary projects and reliable service.
                <br /><br />
                इंदौर के रियल एस्टेट बाजार में बसेरा एसोसिएट्स एक उभरता हुआ और विश्वसनीय नाम बन चुका है। प्रीमियम गुणवत्ता, पारदर्शिता और ग्राहक संतुष्टि के प्रति अपनी प्रतिबद्धता के लिए मशहूर, यह कंपनी इंदौर के बढ़ते मार्केट में सबसे भरोसेमंद रियल एस्टेट पार्टनर के रूप में तेज़ी से अपनी पहचान बना रही है।
                <br /><br />
                बसेरा एसोसिएट्स न केवल बेहतर प्रॉपर्टी ऑप्शंस प्रदान करता है, बल्कि निवेश के लिहाज़ से भी बेहतरीन सलाह देता है। आवासीय से लेकर कमर्शियल प्लॉट्स तक, कंपनी की हर पेशकश में विजन और विश्वास का बेजोड़ संगम दिखाई देता है।
                <br /><br />
                कंपनी का उद्देश्य इंदौर की प्रॉपर्टी लैंडस्केप को आधुनिक और स्मार्ट इन्फ्रास्ट्रक्चर के साथ बदलना है। अगर आप इंदौर में अपने सपनों का घर या निवेश का सही मौका तलाश रहे हैं, तो बसेरा एसोसिएट्स आपकी पहली पसंद होनी चाहिए।
              </p>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '30px', display: 'flex', gap: '20px' }}>
                <button className="btn btn-outline" style={{ color: '#495057', borderColor: '#dee2e6', display: 'flex', alignItems: 'center', gap: '8px' }}><Share2 size={18} /> Share</button>
                <button className="btn btn-outline" style={{ color: '#495057', borderColor: '#dee2e6', display: 'flex', alignItems: 'center', gap: '8px' }}><Printer size={18} /> Print</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Responsiveness Override */}
      <style>{`
        .article-modal-overlay { animation: fadeInScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }
        
        @media (max-width: 992px) {
          .article-modal-card {
            grid-template-columns: 1fr !important;
            max-height: 95vh !important;
          }
          .article-modal-card > div:first-child {
            padding: 40px !important;
            display: none !important;
          }
          .article-modal-card > div:last-child {
             padding: 40px 30px !important;
          }
           .article-modal-card h2 {
             font-size: 2rem !important;
           }
        }
      `}</style>
    </section>
  );
};

export default FeaturedNews;
