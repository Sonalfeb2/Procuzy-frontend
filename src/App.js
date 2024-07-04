import React, { useState } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrapeArticles = async () => {
    setLoading(true);
    setError("");
    setArticles([]);
    try {
      const response = await fetch("http://localhost:3001/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic })
      });

      const result = await response.json();
    

      if (response.ok) {
        setArticles(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch articles");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Medium Article Scraper</h1>
      <input
        type="text"
        value={topic}
        onChange={e => setTopic(e.target.value)}
        placeholder="Enter a topic"
      />
      <button onClick={scrapeArticles} disabled={loading}>
        {loading ? "Scraping..." : "Scrape Articles"}
      </button>
      {error &&
        <p style={{ color: "red" }}>
          {error}
        </p>}
      {articles.length > 0 &&
        <article className="all-browsers">
          <h1>Most Popular Articles</h1>
          {articles.map((article, index) =>
            <article className="browser"  key={index}>
              <h2>
                {article.author}
              </h2>
              <p>
                {article.title}{" "}<a href={article.link} target="_blank">Click here...</a>
              </p>
              <p>
                {article.date}
              </p>
            </article>
          )}
        </article>}
    </div>
  );
}

export default App;
