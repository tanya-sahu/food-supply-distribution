import React, { useState } from 'react';
import axios from 'axios';

// Sidebar Navigation
import Sidebar from './components/Sidebar';

// Pages / Views
import HomePage from './components/HomePage';
import DatabaseView from './components/DatabaseView';
import TalkToDatabase from './components/TalkToDatabase';
import ResultsTable from './components/ResultsTable';
import PipelineFlow from './components/PipelineFlow';
import DistributionPipeline from './components/DistributionPipeline';
import SQLDataViewer from './components/SQLDataViewer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // Default: Home Dashboard
  
  // Talk to Database State
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Distribute Food State
  const [pipelineData, setPipelineData] = useState(null);
  const [pipelineLoading, setPipelineLoading] = useState(false);

  // 1. Talk To Database Handler
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
        "Failed to execute request. Ensure Backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. Food Distribution ACID Transaction Handler
  const handlePipelineAction = async (targetCity, requestedQty) => {
    setPipelineLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:5000/api/pipeline/execute-distribution', {
        targetLocation: targetCity,
        requestedQty: Number(requestedQty)
      });

      if (res.data.success) {
        setPipelineData({
          title: `✅ Supply Execution Result for "${targetCity}"`,
          sql: res.data.sql,
          data: res.data.data
        });
      }
    } catch (err) {
      console.error("Pipeline Error:", err);
      setError(
        err.response?.data?.error || 
        err.message || 
        "Transaction Failed & Rolled Back."
      );
    } finally {
      setPipelineLoading(false);
    }
  };

  return (
    <div style={styles.appContainer}>
      
      {/* Left Sidebar Menu */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content View Container */}
      <main style={styles.mainContent}>
        
        {/* Top Header Bar */}
        <header style={styles.pageHeader}>
          <div>
            <h2 style={styles.pageTitle}>
              {activeTab === 'home' && '🏠 Relief Grid Operations Center'}
              {activeTab === 'talk' && '💬 Talk to Database'}
              {activeTab === 'distribute' && '🚚 Food Distribution Control Center'}
              {activeTab === 'database' && '📂 Database Schema & Overview'}
            </h2>
            <p style={styles.pageSubtitle}>
              {activeTab === 'home' && 'Real-time overview and direct access to disaster relief modules.'}
              {activeTab === 'talk' && 'Query your relational MySQL database using Natural Language or direct SQL.'}
              {activeTab === 'distribute' && 'Execute real-time ACID transactions for stock allocation and dispatch.'}
              {activeTab === 'database' && 'Explore database tables, row metrics, and system ER Diagrams.'}
            </p>
          </div>
        </header>

        {/* Global Error Banner */}
        {error && (
          <div style={styles.errorBox}>
            <strong>⚠ Operational Error:</strong> {error}
          </div>
        )}

        {/* PAGE 0: HOME PAGE */}
        {activeTab === 'home' && (
          <HomePage setActiveTab={setActiveTab} />
        )}

        {/* PAGE 1: TALK TO DATABASE */}
        {activeTab === 'talk' && (
          <section style={styles.pageSection}>
            <TalkToDatabase onSearch={handleSearch} loading={loading} />
            {result && <ResultsTable data={result.data} sql={result.sql} />}
          </section>
        )}

        {/* PAGE 2: DISTRIBUTE FOOD */}
        {activeTab === 'distribute' && (
          <section style={styles.pageSection}>
            <PipelineFlow />
            <DistributionPipeline
              onExecuteTransaction={handlePipelineAction}
              loading={pipelineLoading}
            />
            <SQLDataViewer
              title={pipelineData?.title || 'Execution Transaction Logs'}
              sql={pipelineData?.sql}
              data={pipelineData?.data}
              loading={pipelineLoading}
            />
          </section>
        )}

        {/* PAGE 3: VIEW DATABASE */}
        {activeTab === 'database' && (
          <section style={styles.pageSection}>
            <DatabaseView />
          </section>
        )}

      </main>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0b0f19',
    color: '#f8fafc',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  mainContent: {
    marginLeft: '260px',
    flex: 1,
    padding: '30px 40px',
    boxSizing: 'border-box'
  },
  pageHeader: {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #1e293b'
  },
  pageTitle: {
    margin: 0,
    fontSize: '24px',
    color: '#f8fafc',
    fontWeight: 'bold'
  },
  pageSubtitle: {
    margin: '6px 0 0 0',
    color: '#94a3b8',
    fontSize: '14px'
  },
  pageSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  errorBox: {
    color: '#f87171',
    marginBottom: '20px',
    padding: '16px',
    border: '1px solid #ef4444',
    borderRadius: '10px',
    backgroundColor: '#450a0a',
    fontSize: '14px'
  }
};