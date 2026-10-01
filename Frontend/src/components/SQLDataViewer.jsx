import React from 'react';

export default function SQLDataViewer({ title, sql, data, loading }) {
  if (loading) {
    return (
      <div style={styles.loadingBox}>
        <div style={styles.spinner}></div>
        <span style={{ color: '#94a3b8', marginTop: '10px' }}>Processing Logistics Request...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={styles.emptyBox}>
        <span>ℹ No records found or click an operational step to execute query.</span>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div style={styles.wrapper}>
      {title && <div style={styles.title}>{title}</div>}
      
      {sql && (
        <div style={styles.sqlBox}>
          <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>Executed SQL: </span>
          <code>{sql}</code>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} style={styles.th}>
                  {col.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#0f172a' : '#1e293b' }}>
                {columns.map((col) => (
                  <td key={col} style={styles.td}>
                    {row[col] !== null ? String(row[col]) : 'NULL'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#0b1329',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '20px',
    marginTop: '20px'
  },
  title: {
    color: '#f8fafc',
    fontSize: '15px',
    fontWeight: '700',
    marginBottom: '12px'
  },
  sqlBox: {
    backgroundColor: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#e2e8f0',
    fontSize: '13px',
    fontFamily: 'monospace',
    marginBottom: '16px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '13px'
  },
  th: {
    backgroundColor: '#1e293b',
    color: '#38bdf8',
    padding: '12px',
    fontWeight: '700',
    borderBottom: '2px solid #334155'
  },
  td: {
    padding: '12px',
    color: '#e2e8f0',
    borderBottom: '1px solid #1e293b'
  },
  loadingBox: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0b1329',
    borderRadius: '16px',
    marginTop: '20px'
  },
  spinner: {
    width: '28px',
    height: '28px',
    border: '3px solid #1e293b',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  emptyBox: {
    backgroundColor: '#0b1329',
    border: '1px solid #1e293b',
    padding: '24px',
    borderRadius: '16px',
    color: '#64748b',
    fontSize: '14px',
    marginTop: '20px',
    textAlign: 'center'
  }
};