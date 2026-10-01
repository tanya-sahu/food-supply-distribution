import React from 'react';

export default function HomePage({ setActiveTab }) {
  const stats = [
    { title: 'Total Warehouses', value: '12 Active Hubs', icon: '🏭', color: '#38bdf8' },
    { title: 'Relief Camps', value: '45 Supported', icon: '🏕️', color: '#34d399' },
    { title: 'In-Transit Shipments', value: '8 Dispatched', icon: '🚚', color: '#fbbf24' },
    { title: 'System Status', value: 'ACID Secured', icon: '⚡', color: '#a78bfa' },
  ];

  const quickActions = [
    {
      id: 'talk',
      title: '💬 Talk to Database',
      desc: 'Ask questions in Natural Language or execute custom SQL queries to extract relief insights.',
      btnText: 'Launch Assistant →',
      badge: 'AI Assistant'
    },
    {
      id: 'distribute',
      title: '🚚 Distribute Food Engine',
      desc: 'Execute MySQL ACID transactions to deduct warehouse stock and dispatch camp shipments safely.',
      btnText: 'Open Engine →',
      badge: 'Live Operations'
    },
    {
      id: 'database',
      title: '📂 View Database & ER Diagram',
      desc: 'Explore relief database tables, active row counts, and system Entity Relationship diagram.',
      btnText: 'View Schema →',
      badge: 'System Architecture'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Welcome Banner */}
      <div style={styles.banner}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#f8fafc' }}>
            Welcome to Disaster Relief Food Supply Hub
          </h1>
          <p style={{ margin: '8px 0 0 0', color: '#94a3b8', fontSize: '14px', maxWidth: '650px' }}>
            Centralized intelligent logistics platform for real-time inventory tracking, automated dispatch operations, and SQL database management.
          </p>
        </div>
        <div style={styles.statusBadge}>
          <span style={{ color: '#34d399' }}>●</span> System Online
        </div>
      </div>

      {/* Metrics Row */}
      <div style={styles.statsGrid}>
        {stats.map((item, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{ fontSize: '28px' }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: item.color, marginTop: '2px' }}>
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Navigation Cards */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#f8fafc', fontSize: '18px' }}>
          🚀 Quick Modules & Tools
        </h3>
        <div style={styles.actionGrid}>
          {quickActions.map((action) => (
            <div key={action.id} style={styles.actionCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={styles.cardBadge}>{action.badge}</span>
              </div>
              <h4 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '16px' }}>
                {action.title}
              </h4>
              <p style={{ margin: '0 0 20px 0', color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
                {action.desc}
              </p>
              <button
                onClick={() => setActiveTab(action.id)}
                style={styles.actionBtn}
              >
                {action.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const styles = {
  banner: {
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '24px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statusBadge: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  statCard: {
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
  },
  actionCard: {
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardBadge: {
    backgroundColor: '#1e293b',
    color: '#38bdf8',
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '12px',
    border: '1px solid #334155'
  },
  actionBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '13px',
    textAlign: 'center',
    transition: 'background-color 0.2s'
  }
};