import React from 'react';

const FinancingCTA = () => {
  return (
    <section className="financing-cta-container">
      <div className="container">
        <h2 className="cta-heading">Get Approved for your Dream Home</h2>
        <p className="cta-subheading">
          See expert-recommended financing options and customize them to fit your unique investment budget.
        </p>
        <button className="cta-main-btn" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
          Start my application
        </button>
      </div>

      <style>{`
        .financing-cta-container {
          padding: 100px 20px;
          background-color: #ffffff;
          text-align: center;
          color: #000000;
        }
        .cta-heading {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600;
          margin-bottom: 20px;
          color: #111;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .cta-subheading {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #555;
          max-width: 700px;
          margin: 0 auto 50px auto;
          line-height: 1.5;
        }
        .cta-main-btn {
          background-color: #000;
          color: #fff;
          border: none;
          padding: 18px 45px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .cta-main-btn:hover {
          transform: scale(1.05);
          background-color: #222;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        /* Dark mode compatibility override if needed, but the user image is white */
        [data-theme='dark'] .financing-cta-container {
            background-color: #f9f9f9;
        }
      `}</style>
    </section>
  );
};

export default FinancingCTA;
