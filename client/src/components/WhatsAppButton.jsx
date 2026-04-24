import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    const phoneNumber = "917909882908";
    const message = encodeURIComponent("Hello, I am interested in your properties. Please share more details.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float animate-bounce-slow"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '60px',
                height: '60px',
                backgroundColor: '#25d366',
                color: '#fff',
                borderRadius: '50px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                zIndex: '1000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
            }}
        >
            <MessageCircle size={32} />
        </a>
    );
};

export default WhatsAppButton;
