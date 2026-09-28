import { useState } from "react";
import axios from "axios";
import QueryInput from "./components/QueryInput";
import ResultsTable from "./components/ResultsTable";
import ERDiagramModal from "./components/ERDiagramModal";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showERDiagram, setShowERDiagram] = useState(false);

  const handleSearch = async (queryText, mode) => {
    setLoading(true);
    setError(null);

    const endpoint = mode === 'sql' ? '/api/direct-query' : '/api/ai-query';
    const payload = mode === 'sql' ? { sql: queryText } : { prompt: queryText };

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

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Disaster Relief Food Supply System</h2>
          <p style={{ margin: "5px 0 0 0", color: "#888" }}>
            Talk to Database via English (AI) or Direct SQL Query.
          </p>
        </div>

        <button
          onClick={() => setShowERDiagram(true)}
          style={{
            padding: "10px 18px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          📊 View ER Diagram
        </button>
      </div>

      <QueryInput onSearch={handleSearch} loading={loading} />

      {error && (
        <div style={{ color: "#ff6b6b", marginTop: "10px", padding: "12px", border: "1px solid #ff6b6b", borderRadius: "6px", backgroundColor: "#2b0000" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && <ResultsTable data={result.data} sql={result.sql} />}

      <ERDiagramModal
        isOpen={showERDiagram}
        onClose={() => setShowERDiagram(false)}
      />
    </div>
  );
}