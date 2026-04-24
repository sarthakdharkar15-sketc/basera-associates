import React, { useState, useEffect } from 'react';
import { Calculator, IndianRupee, Percent, Clock } from 'lucide-react';

const EMICalculator = ({ defaultAmount = 5000000 }) => {
    const [loanAmount, setLoanAmount] = useState(defaultAmount);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(240); // 20 years in months
    const [emi, setEmi] = useState(0);

    const calculateEMI = () => {
        const principal = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate);
        const months = parseInt(tenure);

        if (principal > 0 && annualRate > 0 && months > 0) {
            const monthlyRate = annualRate / (12 * 100);
            const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
            setEmi(Math.round(emiValue));
        } else {
            setEmi(0);
        }
    };

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, tenure]);

    return (
        <div className="emi-calculator glass scroll-reveal" style={{ padding: '30px', borderRadius: '20px', marginTop: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                <Calculator size={28} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Home Loan EMI Calculator</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', marginBottom: '30px' }}>
                <div className="input-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <IndianRupee size={14} /> Loan Amount (₹)
                    </label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={loanAmount} 
                        onChange={(e) => setLoanAmount(e.target.value)}
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                    />
                </div>

                <div className="input-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <Percent size={14} /> Interest Rate (% P.A.)
                    </label>
                    <input 
                        type="number" 
                        step="0.1"
                        className="form-control" 
                        value={interestRate} 
                        onChange={(e) => setInterestRate(e.target.value)}
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                    />
                </div>

                <div className="input-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <Clock size={14} /> Tenure (Months)
                    </label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={tenure} 
                        onChange={(e) => setTenure(e.target.value)}
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                    />
                </div>
            </div>

            <div style={{ 
                background: 'rgba(195, 157, 99, 0.1)', 
                padding: '25px', 
                borderRadius: '15px', 
                textAlign: 'center',
                border: '1px solid rgba(195, 157, 99, 0.2)'
            }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '1rem', color: 'var(--text-muted)' }}>Your Estimated Monthly EMI</p>
                <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--primary)' }}>
                    ₹ {emi.toLocaleString()}
                </h2>
                <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', opacity: 0.7 }}>
                    Total Repayment: ₹ {(emi * tenure).toLocaleString()}
                </p>
            </div>

            <button 
                onClick={calculateEMI}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '20px', padding: '12px' }}
            >
                Calculate EMI
            </button>
        </div>
    );
};

export default EMICalculator;
