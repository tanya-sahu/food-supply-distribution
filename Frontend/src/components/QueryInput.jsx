import { useState } from 'react';

export default function QueryInput({ onSearch, loading }) {
  const [mode, setMode] = useState('english'); // 'english' or 'sql'
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input, mode);
    }
  };

  const sampleQueries = {
    english: [
      "Show all warehouses in Lucknow",
      "List critical relief camps needing food supplies",
      "Show active food distribution centers"
    ],
    sql: [
      "SELECT * FROM Warehouses WHERE LOWER(location) LIKE '%lucknow%';",
      "SELECT * FROM Warehouses;",
      "SHOW TABLES;"
    ]
  };

  return (
    <div style={{
      backgroundColor: '#131b2e',
      border: '1px solid #1e293b',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      marginBottom: '24px'
    }}>
      {/* Mode Switcher Header Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '16px'
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={() => { setMode('english'); setInput(''); }}
            style={{
              padding: '10px 20px',
              backgroundColor: mode === 'english' ? '#3b82f6' : 'transparent',
              color: mode === 'english' ? '#ffffff' : '#94a3b8',
              border: mode === 'english' ? 'none' : '1px solid #334155',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🤖</span> English AI Mode
          </button>
          
          <button
            type="button"
            onClick={() => { setMode('sql'); setInput(''); }}
            style={{
              padding: '10px 20px',
              backgroundColor: mode === 'sql' ? '#06b6d4' : 'transparent',
              color: mode === 'sql' ? '#ffffff' : '#94a3b8',
              border: mode === 'sql' ? 'none' : '1px solid #334155',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>💻</span> Direct SQL Query
          </button>
        </div>

        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
          Active Mode: <strong style={{ color: mode === 'english' ? '#60a5fa' : '#22d3ee' }}>
            {mode === 'english' ? 'Natural Language (Gemini AI)' : 'Direct MySQL Execution'}
          </strong>
        </span>
      </div>

      {/* Input Form Area */}
      <form onSubmit={handleSubmit}>
        {mode === 'english' ? (
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in English (e.g. Show all warehouses in Lucknow)..."
              style={{
                flex: 1,
                padding: '14px 18px',
                fontSize: '15px',
                borderRadius: '10px',
                border: '1px solid #334155',
                backgroundColor: '#0b0f19',
                color: '#f8fafc',
                outline: 'none',
                transition: 'border 0.2s ease'
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 28px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
                transition: 'transform 0.1s ease'
              }}
            >
              {loading ? 'Analyzing Query...' : '✨ Ask AI'}
            </button>
          </div>
        ) : (
          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type SQL Statement (e.g. SELECT * FROM Warehouses;)..."
              rows={3}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14px',
                fontFamily: "'Fira Code', monospace",
                borderRadius: '10px',
                border: '1px solid #334155',
                backgroundColor: '#0b0f19',
                color: '#38bdf8',
                marginBottom: '14px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#06b6d4',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)'
                }}
              >
                {loading ? 'Executing Query...' : '▶ Run SQL Query'}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Quick Suggestion Chips */}
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12px', color: '#64748b' }}>Quick Try:</span>
        {sampleQueries[mode].map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setInput(q)}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              backgroundColor: '#1e293b',
              color: '#94a3b8',
              border: '1px solid #334155',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}