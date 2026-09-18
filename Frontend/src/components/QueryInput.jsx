import { useState } from 'react';

export default function QueryInput({ onSearch, loading }) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim()) {
            onSearch(prompt);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type query (e.g., Show all critical relief camps)..."
                style={{
                    width: '65%',
                    padding: '12px',
                    fontSize: '16px',
                    borderRadius: '6px',
                    border: '1px solid #ccc'
                }}
            />
            <button
                type="submit"
                disabled={loading}
                style={{
                    padding: '12px 24px',
                    marginLeft: '10px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}
            >
                {loading ? 'Analyzing...' : 'Ask AI'}
            </button>
        </form>
    );
}