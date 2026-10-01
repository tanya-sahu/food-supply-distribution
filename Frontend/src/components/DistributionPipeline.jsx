import React, { useState } from 'react';

export default function DistributionPipeline({ onExecuteTransaction, loading }) {
  const [cityInput, setCityInput] = useState('Lucknow');
  const [qtyInput, setQtyInput] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return alert('Please enter target city name!');
    onExecuteTransaction(cityInput, Number(qtyInput));
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>⚡ RELIEF FOOD SUPPLY DISTRIBUTION ENGINE</h2>
          <p style={styles.sub}>Executes MySQL Transaction (`START TRANSACTION`, `COMMIT`, `ROLLBACK`)</p>
        </div>
        <span style={styles.badge}>ACID TRANSACTION ENGINE</span>
      </div>

      {/* Target City & Quantity Input Form */}
      <form onSubmit={handleSubmit} style={styles.formGrid}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>📍 Target City / Location:</label>
          <input
            type="text"
            placeholder="e.g. Lucknow, Kanpur, Varanasi..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>📦 Supply Quantity (Units/Kg):</label>
          <input
            type="number"
            min="1"
            max="10000"
            value={qtyInput}
            onChange={(e) => setQtyInput(e.target.value)}
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.dispatchBtn,
            backgroundColor: loading ? '#475569' : '#2563eb'
          }}
        >
          {loading ? 'Executing Transaction...' : `🚀 Process Supply to ${cityInput || 'City'}`}
        </button>
      </form>

      {/* Pipeline Stages Visualizer */}
      <div style={styles.flowRow}>
        <div style={styles.flowStep}>1. Stock Check 🔍</div>
        <span style={styles.arrow}>➔</span>
        <div style={styles.flowStep}>2. Stock Lock & Deduct 🔒</div>
        <span style={styles.arrow}>➔</span>
        <div style={styles.flowStep}>3. In Transit Dispatch 🚚</div>
        <span style={styles.arrow}>➔</span>
        <div style={styles.flowStep}>4. Delivered Handover 📦</div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    color: '#f8fafc',
    fontSize: '18px',
    fontWeight: '800',
    margin: 0
  },
  sub: {
    color: '#94a3b8',
    fontSize: '13px',
    margin: '4px 0 0 0'
  },
  badge: {
    backgroundColor: '#1e3a8a',
    color: '#60a5fa',
    border: '1px solid #2563eb',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '20px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1.5fr',
    gap: '16px',
    alignItems: 'end',
    backgroundColor: '#020617',
    padding: '18px',
    borderRadius: '12px',
    border: '1px solid #1e293b'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    color: '#94a3b8',
    fontSize: '12px',
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    color: '#ffffff',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  dispatchBtn: {
    color: '#ffffff',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
    height: '42px',
    transition: 'all 0.2s'
  },
  flowRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: '1px solid #1e293b'
  },
  flowStep: {
    backgroundColor: '#1e293b',
    color: '#38bdf8',
    fontSize: '12px',
    fontWeight: '700',
    padding: '8px 14px',
    borderRadius: '8px'
  },
  arrow: {
    color: '#475569',
    fontWeight: 'bold'
  }
};