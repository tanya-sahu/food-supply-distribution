export default function ResultsTable({ data, sql }) {
    if (!data) return null;

    if (data.length === 0) {
        return <p>No matching records found in database.</p>;
    }

    const headers = Object.keys(data[0]);

    return (
        <div style={{ marginTop: '20px' }}>
            {sql && (
                <div style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                    <strong>Generated SQL:</strong> <code>{sql}</code>
                </div>
            )}
            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                        {headers.map((head) => (
                            <th key={head}>{head.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            {headers.map((head) => (
                                <td key={head}>{String(row[head])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}