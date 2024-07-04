import React, { useState } from 'react';
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const scrapeArticles = async () => {
    setLoading(true);
    setError('');
    setArticles([]);
    try {
      const response = await fetch('http://localhost:3001/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      const result = await response.json();
      console.log(result)

      if (response.ok) {
        setArticles(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch articles');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Medium Article Scraper</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
      />
      <button onClick={scrapeArticles} disabled={loading}>
        {loading ? 'Scraping...' : 'Scrape Articles'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>{' '}
            by {article.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
