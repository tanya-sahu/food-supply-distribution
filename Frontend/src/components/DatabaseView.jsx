import React, { useState } from 'react';

export default function DatabaseView() {
  const [showModal, setShowModal] = useState(false);

  const tables = [
    { name: "inventory", rows: 20, desc: "Stock tracking per warehouse & item" },
    { name: "products", rows: 20, desc: "Food category, units, threshold" },
    { name: "reliefcamps", rows: 20, desc: "Camp location, urgency & count" },
    { name: "shipments", rows: 20, desc: "Logistics transit & delivery state" },
    { name: "suppliers", rows: 20, desc: "Vendor details & source hubs" },
    { name: "warehouses", rows: 20, desc: "Regional storage facilities" },
  ];

  return (
    <div style={{ backgroundColor: '#131b2e', border: '1px solid #1e293b', borderRadius: '14px', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '18px' }}>📂 Database Schema Explorer</h3>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>Database Name: <strong style={{ color: '#38bdf8' }}>food_supply</strong></p>
        </div>
        
        {/* View ER Diagram Button */}
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          📊 View ER Diagram
        </button>
      </div>

      {/* Tables Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {tables.map((tbl, i) => (
          <div key={i} style={{ backgroundColor: '#0b0f19', border: '1px solid #334155', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: '#38bdf8', fontSize: '15px' }}>📋 {tbl.name}</span>
              <span style={{ fontSize: '11px', backgroundColor: '#1e293b', color: '#94a3b8', padding: '2px 8px', borderRadius: '10px' }}>{tbl.rows} Rows</span>
            </div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>{tbl.desc}</p>
          </div>
        ))}
      </div>

      {/* ER Diagram Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: '#131b2e', border: '1px solid #334155', padding: '24px', borderRadius: '14px', maxWidth: '850px', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#f8fafc' }}>Entity Relationship (ER) Diagram</h3>
              <button onClick={() => setShowModal(false)} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}>✕ Close</button>
            </div>
            <div style={{ textAlign: 'center', backgroundColor: '#0b0f19', padding: '12px', borderRadius: '8px' }}>
              <img src="/er-diagram.png" alt="ER Diagram" style={{ maxWidth: '100%', height: 'auto', borderRadius: '6px' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}