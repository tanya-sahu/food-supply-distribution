import React, { useState } from 'react';
import axios from 'axios';
import DatabaseView from './components/DatabaseView';
import TalkToDatabase from './components/TalkToDatabase';
import ResultsTable from './components/ResultsTable';
import PipelineFlow from './components/PipelineFlow';

export default function App() {
  const [activeTab, setActiveTab] = useState('talk'); // 'talk' or 'database'
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (queryText, mode) => {
    setLoading(true);
    setError(null);

    const endpoint = mode === 'manual' ? '/api/direct-query' : '/api/ai-query';
    const payload = mode === 'manual' ? { sql: queryText } : { prompt: queryText };

    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, payload);
      if (res.data.success) {
        setResult(res.data);
      }
    } catch (err) {
      console.error("Execution Error:", err);
      setError(
        err.response?.data?.error || 
        err.message || 
        "Failed to execute request. Ensure Backend server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0b0f19',
      color: '#f8fafc',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: '30px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          backgroundColor: '#131b2e',
          padding: '20px 24px',
          borderRadius: '16px',
          border: '1px solid #1e293b'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '22px', color: '#f8fafc' }}>
                Disaster Relief Food Supply System
              </h2>
              <span style={{
                backgroundColor: '#065f46',
                color: '#34d399',
                fontSize: '11px',
                fontWeight: 'bold',
                padding: '3px 8px',
                borderRadius: '12px',
                border: '1px solid #059669'
              }}>
                ONLINE
              </span>
            </div>
            <p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>
              Operational Supply Logistics & AI Database Assistant
            </p>
          </div>
        </div>

        {/* Real-World Supply Pipeline Visualizer */}
        <PipelineFlow />

        {/* Navigation Tabs (Talk to Database vs Database Overview) */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          borderBottom: '1px solid #1e293b',
          paddingBottom: '12px'
        }}>
          <button
            onClick={() => setActiveTab('talk')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'talk' ? '#3b82f6' : '#131b2e',
              color: '#ffffff',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            💬 Talk to Database
          </button>

          <button
            onClick={() => setActiveTab('database')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'database' ? '#3b82f6' : '#131b2e',
              color: '#ffffff',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            📂 Database Overview & ER Diagram
          </button>
        </div>

        {/* Active Tab View Rendering */}
        {activeTab === 'database' ? (
          <DatabaseView />
        ) : (
          <>
            <TalkToDatabase onSearch={handleSearch} loading={loading} />
            
            {/* Error Message Box */}
            {error && (
              <div style={{
                color: '#f87171',
                marginTop: '16px',
                padding: '16px',
                border: '1px solid #ef4444',
                borderRadius: '10px',
                backgroundColor: '#450a0a',
                fontSize: '14px'
              }}>
                <strong>⚠ Operational Error:</strong> {error}
              </div>
            )}

            {/* Results Table Output */}
            {result && <ResultsTable data={result.data} sql={result.sql} />}
          </>
        )}

      </div>
    </div>
  );
}