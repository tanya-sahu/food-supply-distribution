import React from 'react';

export default function StatCards() {
  const stats = [
    { title: "Active Warehouses", value: "6 Regional Hubs", color: "#3b82f6", icon: "🏢" },
    { title: "Relief Camps", value: "20 Active Units", color: "#f59e0b", icon: "⛺" },
    { title: "Active Shipments", value: "12 In Transit", color: "#10b981", icon: "🚚" },
    { title: "Emergency Priority", value: "4 Critical Camps", color: "#ef4444", icon: "🚨" },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      {stats.map((item, index) => (
        <div key={index} style={{
          backgroundColor: '#131b2e',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>{item.title}</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: item.color, marginTop: '4px' }}>{item.value}</div>
          </div>
          <span style={{ fontSize: '28px', backgroundColor: '#0b0f19', padding: '10px', borderRadius: '10px' }}>{item.icon}</span>
        </div>
      ))}
    </div>
  );
}