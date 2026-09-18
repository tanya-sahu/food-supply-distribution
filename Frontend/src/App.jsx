import { useState } from 'react';
import axios from 'axios';
import QueryInput from './components/QueryInput';
import ResultsTable from './components/ResultsTable';

export default function App() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (prompt) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('http://localhost:5000/api/ai-query', { prompt });
            if (res.data.success) {
                setResult(res.data);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to process AI query');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Disaster Relief Food Supply & Distribution System</h2>
            <p>Query MySQL database in plain English using Gemini AI.</p>
            
            <QueryInput onSearch={handleSearch} loading={loading} />
            
            {error && <div style={{ color: 'red', marginTop: '10px' }}>Error: {error}</div>}
            
            {result && <ResultsTable data={result.data} sql={result.sql} />}
        </div>
    );
}