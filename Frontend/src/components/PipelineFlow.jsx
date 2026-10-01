import React, { useState } from 'react';

export default function PipelineFlow({ onPipelineStepClick }) {
  const [activeStep, setActiveStep] = useState(null);

  const pipelineSteps = [
    {
      id: 'inventory',
      stepNumber: '1',
      title: 'Inventory Check',
      desc: 'Scan Warehouse Stock',
      icon: '🔍',
      query: 'SELECT w.warehouse_name, p.name AS product_name, i.quantity, p.min_threshold FROM inventory i JOIN warehouses w ON i.warehouse_id = w.warehouse_id JOIN products p ON i.product_id = p.product_id ORDER BY i.quantity ASC;',
      prompt: 'Show current stock levels across all warehouses with product details'
    },
    {
      id: 'stock_lock',
      stepNumber: '2',
      title: 'Stock Lock',
      desc: 'Quantity Reservation',
      icon: '🔒',
      query: "SELECT i.inventory_id, w.warehouse_name, p.name AS product, i.quantity FROM inventory i JOIN warehouses w ON i.warehouse_id = w.warehouse_id JOIN products p ON i.product_id = p.product_id WHERE i.quantity > 50;",
      prompt: 'Show reserved stock items available for immediate allocation'
    },
    {
      id: 'dispatch',
      stepNumber: '3',
      title: 'Dispatch Shipment',
      desc: 'Status: In Transit',
      icon: '🚚',
      query: "SELECT s.shipment_id, w.warehouse_name AS origin, c.camp_name AS destination, p.name AS item, s.quantity, s.status FROM shipments s JOIN warehouses w ON s.warehouse_id = w.warehouse_id JOIN reliefcamps c ON s.camp_id = c.camp_id JOIN products p ON s.product_id = p.product_id WHERE s.status = 'In Transit';",
      prompt: 'List all active shipments currently in transit to relief camps'
    },
    {
      id: 'handover',
      stepNumber: '4',
      title: 'Camp Handover',
      desc: 'Status: Delivered',
      icon: '📦',
      query: "SELECT s.shipment_id, c.camp_name, c.urgency_level, p.name AS item_delivered, s.quantity, s.dispatch_date FROM shipments s JOIN reliefcamps c ON s.camp_id = c.camp_id JOIN products p ON s.product_id = p.product_id WHERE s.status = 'Delivered';",
      prompt: 'Show completed food deliveries and relief camp handovers'
    }
  ];

  const handleStepClick = (step) => {
    setActiveStep(step.id);
    if (onPipelineStepClick) {
      // Direct SQL Execution trigger for pipeline step
      onPipelineStepClick(step.query, 'manual');
    }
  };

  return (
    <div style={{
      backgroundColor: '#131b2e',
      border: '1px solid #1e293b',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '24px'
    }}>
      <div style={{
        color: '#94a3b8',
        fontSize: '12px',
        fontWeight: 'bold',
        letterSpacing: '0.05em',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        ⚡ RELIEF SUPPLY EXECUTION PIPELINE
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px'
      }}>
        {pipelineSteps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              onClick={() => handleStepClick(step)}
              style={{
                backgroundColor: isActive ? '#1e3a8a' : '#0b0f19',
                border: isActive ? '2px solid #3b82f6' : '1px solid #1e293b',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.2s ease-in-out',
                boxShadow: isActive ? '0 0 15px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              <div style={{
                backgroundColor: isActive ? '#3b82f6' : '#1e293b',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {step.icon}
              </div>

              <div>
                <div style={{
                  color: '#f8fafc',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  marginBottom: '2px'
                }}>
                  {step.stepNumber}. {step.title}
                </div>
                <div style={{
                  color: isActive ? '#93c5fd' : '#64748b',
                  fontSize: '12px'
                }}>
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}