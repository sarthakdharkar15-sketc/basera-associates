import React from 'react';
import { Check, Shield, Zap, Crown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic Premium',
      price: '99',
      period: 'month',
      description: 'Ideal for individual investors looking for early access.',
      features: [
        'Early Access to Pre-Launch Projects',
        'Expert-Curated Investment Options',
        'Real-time Market Insights',
        'Standard Support'
      ],
      icon: <Zap size={24} />,
      color: '#c39d63'
    },
    {
      name: 'Broker Plan',
      price: '299',
      period: 'month',
      description: 'Built for professionals who need elite networking tools.',
      features: [
        'Full Broker Network Access',
        'Lead Management System',
        'Real-time Communication Tools',
        'Priority Listing Support',
        'VVIP Pre-Launch Access'
      ],
      icon: <Crown size={24} />,
      color: '#4f46e5',
      featured: true
    },
    {
      name: 'Yearly Value',
      price: '999',
      period: 'year',
      description: 'Save big with our discounted annual membership.',
      features: [
        'All Basic Premium Features',
        'Exclusive Quarterly Reports',
        'Dedicated Portfolio Manager',
        'No Processing Fees',
        'Save over 15% Annually'
      ],
      icon: <Shield size={24} />,
      color: '#22c55e'
    }
  ];

  return (
    <div className="pricing-page">
      <div className="container">
        <div className="pricing-header">
          <h1 className="pricing-title">Choose Your <span className="gold-text">Membership Plan</span></h1>
          <p className="pricing-subtitle">Select the plan that fits your investment goals and unlock the full potential of Basera Associates.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="featured-badge">MOST POPULAR</div>}
              <div className="plan-icon" style={{ background: plan.color + '20', color: plan.color }}>
                {plan.icon}
              </div>
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="currency">₹</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/{plan.period}</span>
              </div>
              <p className="plan-description">{plan.description}</p>
              
              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <Check size={16} className="check-icon" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`btn pricing-btn ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => navigate(`/payment/membership-${plan.name.toLowerCase().replace(' ', '-')}`)}
              >
                Choose {plan.name} <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .pricing-page {
            padding: 120px 0 80px;
            background: #0f1115;
            min-height: 100vh;
          }

          .pricing-header {
            text-align: center;
            margin-bottom: 60px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }

          .pricing-title {
            font-size: 3.5rem;
            margin-bottom: 20px;
            font-family: 'Outfit', sans-serif;
          }

          .pricing-subtitle {
            font-size: 1.1rem;
            color: var(--text-muted);
          }

          .pricing-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 40px;
          }

          .pricing-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 30px;
            padding: 40px;
            display: flex;
            flex-direction: column;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
          }

          .pricing-card:hover {
            transform: translateY(-10px);
            border-color: rgba(195, 157, 99, 0.3);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          }

          .pricing-card.featured {
            background: rgba(79, 70, 229, 0.05);
            border-color: rgba(79, 70, 229, 0.3);
          }

          .featured-badge {
            position: absolute;
            top: 20px;
            right: -30px;
            background: #4f46e5;
            color: white;
            padding: 4px 40px;
            transform: rotate(45deg);
            font-size: 0.65rem;
            font-weight: 800;
            letter-spacing: 1px;
          }

          .plan-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 25px;
          }

          .plan-name {
            font-size: 1.5rem;
            margin-bottom: 10px;
            font-weight: 700;
          }

          .plan-price {
            margin-bottom: 20px;
            display: flex;
            align-items: baseline;
          }

          .currency {
            font-size: 1.5rem;
            font-weight: 600;
            margin-right: 2px;
          }

          .amount {
            font-size: 3rem;
            font-weight: 800;
            font-family: 'Inter', sans-serif;
          }

          .period {
            font-size: 1rem;
            color: var(--text-muted);
            margin-left: 4px;
          }

          .plan-description {
            font-size: 0.95rem;
            color: var(--text-muted);
            margin-bottom: 30px;
            line-height: 1.5;
            min-height: 45px;
          }

          .plan-features {
            list-style: none;
            padding: 0;
            margin: 0 0 40px 0;
            flex-grow: 1;
          }

          .plan-features li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 15px;
            font-size: 0.9rem;
            color: var(--text-main);
          }

          .check-icon {
            color: var(--success);
            margin-top: 2px;
            flex-shrink: 0;
          }

          .pricing-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 16px;
            border-radius: 14px;
            font-weight: 700;
          }

          @media (max-width: 1100px) {
            .pricing-grid { grid-template-columns: repeat(2, 1fr); }
          }

          @media (max-width: 768px) {
            .pricing-grid { grid-template-columns: 1fr; }
            .pricing-title { font-size: 2.5rem; }
          }
        `}
      </style>
    </div>
  );
};

export default Pricing;
