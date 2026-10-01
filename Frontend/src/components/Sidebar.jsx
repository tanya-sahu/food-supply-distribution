import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'home', label: '🏠 Home Dashboard', desc: 'Overview & System Metrics' },
    { id: 'talk', label: '💬 Talk to Database', desc: 'AI & SQL Query Assistant' },
    { id: 'distribute', label: '🚚 Distribute Food', desc: 'ACID Transaction Engine' },
    { id: 'database', label: '📂 View Database', desc: 'Schema & ER Diagram' },
  ];

  return (
    <aside style={styles.sidebar}>
      {/* Project Branding */}
      <div style={styles.brandContainer}>
        <div style={styles.logoBadge}>🛡️</div>
        <div>
          <h1 style={styles.projectTitle}>Relief Grid</h1>
          <span style={styles.projectSubtitle}>Disaster Logistics AI</span>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* Navigation Tabs */}
      <nav style={styles.navGroup}>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...styles.navItem,
                backgroundColor: isActive ? '#1e293b' : 'transparent',
                borderLeft: isActive ? '4px solid #38bdf8' : '4px solid transparent',
                color: isActive ? '#f8fafc' : '#94a3b8',
              }}
            >
              <div style={styles.itemLabel}>{item.label}</div>
              <div style={styles.itemDesc}>{item.desc}</div>
            </button>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div style={styles.systemStatus}>
        <span style={styles.statusDot}>●</span> System Operational
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '260px',
    backgroundColor: '#0f172a',
    borderRight: '1px solid #1e293b',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    padding: '20px 16px',
    boxSizing: 'border-box'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '10px'
  },
  logoBadge: {
    fontSize: '24px',
    background: '#1e293b',
    padding: '8px',
    borderRadius: '10px',
    border: '1px solid #334155'
  },
  projectTitle: {
    margin: 0,
    fontSize: '18px',
    color: '#f8fafc',
    fontWeight: 'bold'
  },
  projectSubtitle: {
    fontSize: '11px',
    color: '#38bdf8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  divider: {
    borderColor: '#1e293b',
    margin: '16px 0',
    borderWidth: '0.5px'
  },
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '12px 14px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease'
  },
  itemLabel: {
    fontSize: '14px',
    fontWeight: '600'
  },
  itemDesc: {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '2px'
  },
  systemStatus: {
    backgroundColor: '#1e293b',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#34d399',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  statusDot: {
    fontSize: '10px'
  }
};