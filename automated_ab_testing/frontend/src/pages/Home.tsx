// src/pages/Home.tsx
import React, { useState } from 'react';
import { scrapeWebsite } from '../services/api';
import './Home.css';

const Home: React.FC = () => {
    const [url, setUrl] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResponse('');
        setLoading(true);

        try {
            const scrapedText = await scrapeWebsite(url);
            setResponse(scrapedText);
        } catch (error: any) {
            setError(`Failed to scrape the website. Error: ${error.message || error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <header>
                <h1>A/B Testing Automation</h1>
                <p>Optimize your website by receiving automated A/B test suggestions powered by AI.</p>
            </header>
            <form className="url-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your website URL"
                    required
                    className="url-input"
                />
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Processing...' : 'Submit'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {response && (
                <div className="response-container">
                    <h2>Suggestions for your A/B tests:</h2>
                    <pre>{response}</pre>
                </div>
            )}
        </div>
    );
};

export default Home;
