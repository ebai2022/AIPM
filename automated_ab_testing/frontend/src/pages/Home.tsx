// src/pages/Home.tsx
import React, { useState } from 'react';
import { scrapeWebsite } from '../services/api';
import { FaGlobe, FaSpinner } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    homeContainer: {
        textAlign: 'center',
        padding: theme.spacing(4),
        marginTop: 110,
        minHeight: '120vh', // Ensure the whole page is always filled
        display: 'static',
        flexDirection: 'column',
        justifyContent: 'space-between', // Space between form and footer
    },
    formContainer: {
        marginTop: theme.spacing(4),
        width: '100%',
        maxWidth: 600, // Limit form width
        margin: 'auto', // Center form horizontally
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    inputIcon: {
        marginRight: theme.spacing(1),
    },
    urlInput: {
        flex: 1,
        padding: theme.spacing(1),
        borderRadius: 4,
        border: '1px solid #ccc',
        fontSize: '1.2em', // Make the text input larger for better visibility
    },
    submitBtn: {
        padding: theme.spacing(1, 2),
        borderRadius: 4,
        backgroundColor: '#3f51b5',
        color: '#fff',
        cursor: 'pointer',
        '&:disabled': {
            backgroundColor: '#ccc',
        },
    },
    spinner: {
        animation: '$spin 1s linear infinite',
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
    errorMessage: {
        color: 'red',
    },
    responseContainer: {
        marginTop: theme.spacing(4),
        textAlign: 'left',
        maxWidth: 1000, // Limit the width of the response box
        margin: 'auto', // Center response box horizontally
        padding: theme.spacing(2),
        backgroundColor: '#f9f9f9', // Light background for better readability
        borderRadius: 8,
        border: '1px solid #ccc',
        whiteSpace: 'pre-wrap', // Preserve formatting of the response text
    },
}));

const Home: React.FC = () => {
    const classes = useStyles();
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
        <div className={classes.homeContainer}>
            <Navbar />
            <header>
                <h1>A/B Testing Automation</h1>
                <p>Optimize your website with AI-powered A/B test suggestions.</p>
            </header>

            <div className={classes.formContainer}>
                <form className="url-form" onSubmit={handleSubmit}>
                    <div className={classes.inputGroup}>
                        <FaGlobe className={classes.inputIcon} />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter your website URL"
                            required
                            className={classes.urlInput}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submitBtn}
                        disabled={loading}
                        startIcon={loading ? <FaSpinner className={classes.spinner} /> : null}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </Button>
                </form>

                {error && <p className={classes.errorMessage}>{error}</p>}
            </div>

            {response && (
                <div className={classes.responseContainer}>
                    <h2>Suggestions for your A/B tests:</h2>
                    <pre>{response}</pre>
                </div>
            )}

            <footer>
                <p>Powered by AI to optimize your website’s performance.</p>
            </footer>
        </div>
    );
};

export default Home;
