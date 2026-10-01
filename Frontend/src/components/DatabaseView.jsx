import React, { useState } from 'react';
import ERDiagramModal from './ERDiagramModal';

export default function DatabaseView() {
  const [showModal, setShowModal] = useState(false);

  const tables = [
    { name: 'inventory', rows: 20, desc: 'Stock tracking per warehouse & item' },
    { name: 'products', rows: 20, desc: 'Food category, units, threshold' },
    { name: 'reliefcamps', rows: 20, desc: 'Camp location, urgency & count' },
    { name: 'shipments', rows: 20, desc: 'Logistics transit & delivery state' },
    { name: 'suppliers', rows: 20, desc: 'Vendor details & source hubs' },
    { name: 'warehouses', rows: 20, desc: 'Regional storage facilities' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      
      {/* Header & ER Diagram Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '20px' }}>📂 Database Schema Explorer</h2>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>
            Database Name: <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>food_supply</span>
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: '#059669',
            color: '#ffffff',
            padding: '10px 18px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📊 View ER Diagram
        </button>
      </div>

      {/* Single Clean Modal Component Call */}
      <ERDiagramModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      {/* Tables Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {tables.map((tbl, i) => (
          <div 
            key={i} 
            style={{ 
              backgroundColor: '#0b0f19', 
              border: '1px solid #334155', 
              borderRadius: '10px', 
              padding: '16px' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ margin: 0, color: '#f8fafc', fontSize: '16px' }}>📄 {tbl.name}</h4>
              <span style={{ backgroundColor: '#1e293b', color: '#94a3b8', fontSize: '11px', padding: '2px 8px', borderRadius: '10px' }}>
                {tbl.rows} Rows
              </span>
            </div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>
              {tbl.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}