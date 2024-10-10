// src/App.tsx
import React, { useState } from 'react';
import { scrapeWebsite } from './services/api';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrorCode(null);
    setLoading(true);

    try {
      const scrapedText = await scrapeWebsite(url);
      setResponse(scrapedText);
    } catch (error: any) {
      setError('Failed to scrape the website.');
      setErrorCode(error.code || null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Automated A/B Testing Service</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red' }}>
          {error} {errorCode && `(Error Code: ${errorCode})`}
        </p>
      )}

      {response && (
        <div>
          <h2>Scraped Text:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
