import { useState } from 'react';
import './App.css';

// AI Models Configuration
const AI_MODELS = [
  { name: 'Groq', badge: 'Llama 3.3 70B', icon: '⚡', color: 'groq', key: 'groq' },
  { name: 'Gemini', badge: 'Google', icon: '✨', color: 'gemini', key: 'gemini' }
];

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return alert('Please enter a question');

    setLoading(true);
    setResponses({});

    try {
      const response = await fetch('http://localhost:3001/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) throw new Error('Failed to get responses');
      setResponses(await response.json());
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get AI responses. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setResponses({});
  };

  return (
    <div className="app">
      <header className="header">
        <h1> United Chats of America 🇺🇸 </h1>
        <p>Compare responses from different AI models</p>
      </header>

      <div className="container">
        <form onSubmit={handleSubmit} className="input-section">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your question here"
            rows="4"
            disabled={loading}
            className="prompt-input"
          />
          <div className="button-group">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? '🔄 Loading...' : '✨ Compare AI Responses'}
            </button>
            <button type="button" onClick={handleClear} disabled={loading} className="clear-btn">
              🗑️ Clear
            </button>
          </div>
        </form>

        <div className="responses-section">
          {AI_MODELS.map(model => (
            <ResponseCard
              key={model.key}
              {...model}
              data={responses[model.key]}
              loading={loading}
            />
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>CS5610 - Final Project</p>
      </footer>
    </div>
  );
}

export default App;




const ResponseCard = ({ name, badge, icon, color, data, loading }) => (
  <div className="response-card">
    <div className={`card-header ${color}-header`}>
      <h2>{icon} {name}</h2>
      <span className="badge">{badge}</span>
    </div>
    <div className="card-body">
      {loading && !data && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Getting response from {name}...</p>
        </div>
      )}
      {data && (
        <div className="response-content">
          {data.error ? (
            <div className="error-message">
              <p>⚠️ {data.response}</p>
              <small>{data.error}</small>
            </div>
          ) : (
            <>
              <p>{data.response}</p>
              {data.timestamp && (
                <div className="timestamp">
                  {new Date(data.timestamp).toLocaleString()}
                </div>
              )}
            </>
          )}
        </div>
      )}
      {!loading && !data && (
        <div className="empty-state">
          <p>No response yet. Enter a question and click "Compare AI Responses"</p>
        </div>
      )}
    </div>
  </div>
);