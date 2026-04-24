import React, { useState, useEffect } from 'react';
import { Users, BarChart3, Building, Activity } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(analyticsData => {
        setData(analyticsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch analytics:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', color: 'var(--primary)' }}>
        <Activity size={40} style={{ animation: 'pulseRing 1.5s infinite linear' }} />
        <span style={{ marginLeft: '15px', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>Loading Analytics...</span>
      </div>
    );
  }

  if (!data) return <div style={{ color: 'var(--danger)' }}>Failed to load analytics data.</div>;

  // Find max users to scale the line chart
  const userGrowthData = Array.isArray(data?.userGrowthChart) ? data.userGrowthChart : [];
  const maxUsers = userGrowthData.length > 0 ? Math.max(...userGrowthData.map(m => m.users || 0)) : 100;
  
  // Find max leads to scale the bar chart
  const topPropertiesData = Array.isArray(data?.topProperties) ? data.topProperties : [];
  const maxLeads = topPropertiesData.length > 0 ? Math.max(...topPropertiesData.map(p => p.leads || 0)) : 10;

  return (
    <div className="analytics-dashboard animate-slide-up">
      <h3 style={{ marginBottom: '30px', fontSize: '1.8rem', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
        Performance Analytics
      </h3>
      
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', marginBottom: '40px' }}>
        
        {/* Total Users */}
        <div className="glass hover-glow" style={{ padding: '30px', borderRadius: '20px', borderLeft: '4px solid var(--primary)', transition: 'all 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1rem', fontWeight: 500 }}>Total Users</p>
              <h2 style={{ fontSize: '3rem', color: '#fff', margin: '5px 0', fontFamily: 'Outfit, sans-serif' }}>
                {data.totalUsers}
              </h2>
            </div>
            <div style={{ background: 'rgba(195,157,99,0.1)', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}>
              <Users size={28} />
            </div>
          </div>
          <p style={{ color: 'var(--success)', margin: 0, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Activity size={14} /> +12% from last month
          </p>
        </div>

        {/* Total Leads (Inquiries) */}
        <div className="glass hover-glow" style={{ padding: '30px', borderRadius: '20px', borderLeft: '4px solid #2ecc71', transition: 'all 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1rem', fontWeight: 500 }}>Total Leads</p>
              <h2 style={{ fontSize: '3rem', color: '#fff', margin: '5px 0', fontFamily: 'Outfit, sans-serif' }}>
                {data.totalInquiries}
              </h2>
            </div>
            <div style={{ background: 'rgba(46,204,113,0.1)', padding: '12px', borderRadius: '12px', color: '#2ecc71' }}>
               <BarChart3 size={28} />
            </div>
          </div>
          <p style={{ color: 'var(--success)', margin: 0, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Activity size={14} /> Tracking robustly
          </p>
        </div>

        {/* Active Projects */}
        <div className="glass hover-glow" style={{ padding: '30px', borderRadius: '20px', borderLeft: '4px solid #3498db', transition: 'all 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1rem', fontWeight: 500 }}>Active Projects</p>
              <h2 style={{ fontSize: '3rem', color: '#fff', margin: '5px 0', fontFamily: 'Outfit, sans-serif' }}>
                {data.totalProjects}
              </h2>
            </div>
            <div style={{ background: 'rgba(52,152,219,0.1)', padding: '12px', borderRadius: '12px', color: '#3498db' }}>
               <Building size={28} />
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
            Live in inventory
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        
        {/* Custom Bar Chart for Top Properties */}
        <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
           <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '25px', fontFamily: 'Outfit, sans-serif' }}>Leads per Property (Top 5)</h4>
           {data.topProperties.length > 0 ? (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {data.topProperties.map((prop, idx) => (
                 <div key={idx}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                     <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{prop.title}</span>
                     <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{prop.leads}</span>
                   </div>
                   <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                     <div style={{ 
                       width: `${(prop.leads / Math.max(maxLeads, 1)) * 100}%`, 
                       height: '100%', 
                       background: 'var(--primary)', 
                       borderRadius: '4px',
                       transition: 'width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                     }}></div>
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             <p style={{ color: 'var(--text-muted)' }}>No lead data mathematically compiled yet.</p>
           )}
        </div>

        {/* Custom Line/Growth Chart Representation */}
        <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
           <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '25px', fontFamily: 'Outfit, sans-serif' }}>User Growth Trend</h4>
           <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '10px', marginTop: '20px' }}>
             {data.userGrowthChart.map((point, idx) => {
               const heightPercent = maxUsers > 0 ? (point.users / maxUsers) * 100 : 0;
               return (
                 <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '5px', opacity: 0.8 }}>{point.users}</div>
                    <div style={{ 
                       width: '100%', 
                       height: `${heightPercent}%`, 
                       background: 'linear-gradient(to top, rgba(195,157,99,0.1), rgba(195,157,99,0.8))',
                       borderRadius: '4px 4px 0 0',
                       minHeight: '4px',
                       transition: 'height 1s ease-out'
                    }}></div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '10px' }}>{point.month}</div>
                 </div>
               );
             })}
           </div>
        </div>

      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .analytics-dashboard > div {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}
