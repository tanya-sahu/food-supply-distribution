import React from 'react';

export default function PipelineFlow() {
  const stages = [
    { id: 1, title: '1. Inventory Check', desc: 'Scan Warehouse Stock', icon: '🔍' },
    { id: 2, title: '2. Stock Lock', desc: 'Quantity Reservation', icon: '🔒' },
    { id: 3, title: '3. Dispatch Shipment', desc: 'Status: In Transit', icon: '🚚' },
    { id: 4, title: '4. Camp Handover', desc: 'Status: Delivered', icon: '📦' }
  ];

  return (
    <div style={{
      backgroundColor: '#131b2e',
      border: '1px solid #1e293b',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '24px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
    }}>
      <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px', marginBottom: '16px' }}>
        ⚡ Relief Supply Execution Pipeline
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {stages.map((stage) => (
          <div key={stage.id} style={{
            backgroundColor: '#0b0f19',
            border: '1px solid #334155',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '24px', backgroundColor: '#1e293b', padding: '8px', borderRadius: '8px' }}>
              {stage.icon}
            </span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc' }}>{stage.title}</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stage.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}