import React, { useState } from 'react';

export default function TalkToDatabase({ onSearch, loading }) {
  const [subMode, setSubMode] = useState('ai'); // 'ai' or 'manual'
  const [queryText, setQueryText] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!queryText.trim()) return;
    onSearch(queryText, subMode);
  };

  return (
    <div style={{ backgroundColor: '#131b2e', border: '1px solid #1e293b', borderRadius: '14px', padding: '24px' }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#f8fafc', fontSize: '18px' }}>💬 Talk to Database</h3>

      {/* Sub Mode Selection Toggle Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => { setSubMode('ai'); setQueryText(''); }}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: subMode === 'ai' ? '2px solid #3b82f6' : '1px solid #334155',
            backgroundColor: subMode === 'ai' ? '#1e3a8a' : '#0b0f19',
            color: '#f8fafc',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          🤖 Option 1: AI English Mode (Gemini NLP)
        </button>

        <button
          onClick={() => { setSubMode('manual'); setQueryText(''); }}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: subMode === 'manual' ? '2px solid #3b82f6' : '1px solid #334155',
            backgroundColor: subMode === 'manual' ? '#1e3a8a' : '#0b0f19',
            color: '#f8fafc',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          💻 Option 2: Manual Direct SQL Query
        </button>
      </div>

      {/* Query Input Box */}
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder={
            subMode === 'ai'
              ? "Ask in plain English (e.g., Show active shipments to Critical camps)..."
              : "Write SQL Query (e.g., SELECT * FROM warehouses WHERE location = 'Lucknow')..."
          }
          style={{
            flex: 1,
            padding: '14px',
            backgroundColor: '#0b0f19',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: '#f8fafc',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '14px 28px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Executing...' : subMode === 'ai' ? '✨ Ask AI' : '▶ Execute SQL'}
        </button>
      </form>
    </div>
  );
}