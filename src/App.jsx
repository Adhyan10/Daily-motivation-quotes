import { useEffect, useState } from 'react';
import './App.css';

const API_URLS = ['https://api.quotable.io/random', 'https://zenquotes.io/api/random'];

const FALLBACK_QUOTES = [
  { quote: 'Small progress is still progress.', author: 'Anonymous' },
  { quote: 'Discipline is choosing what you want most over what you want now.', author: 'Abraham Lincoln' },
  { quote: 'You do not have to be extreme, just consistent.', author: 'Unknown' },
  { quote: 'Your future is created by what you do today.', author: 'Robert Kiyosaki' },
  { quote: 'Start where you are. Use what you have. Do what you can.', author: 'Arthur Ashe' },
  { quote: 'Success is the sum of small efforts repeated day in and day out.', author: 'Robert Collier' },
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const parseQuote = (data) =>
  data?.content && data?.author
    ? { quote: data.content, author: data.author }
    : data?.[0]?.q && data?.[0]?.a
      ? { quote: data[0].q, author: data[0].a }
      : null;

const readLikes = () => {
  try {
    return JSON.parse(localStorage.getItem('likedQuotes') || '[]');
  } catch {
    return [];
  }
};

function App() {
  const [current, setCurrent] = useState({ quote: '', author: '' });
  const [loading, setLoading] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [likedQuotes, setLikedQuotes] = useState(readLikes);

  const liked = likedQuotes.some((q) => q.quote === current.quote);

  const fetchQuote = async () => {
    setLoading(true);
    let next = null;

    for (const url of API_URLS) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (res.ok) next = parseQuote(await res.json());
      } catch {}

      clearTimeout(timeoutId);
      if (next) break;
    }

    if (!next) {
      next = randomItem(FALLBACK_QUOTES);
      setOfflineMode(true);
    } else {
      setOfflineMode(false);
    }

    setCurrent(next);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    localStorage.setItem('likedQuotes', JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  const handleLike = () => {
    if (!current.quote) return;

    setLikedQuotes((prev) => {
      if (liked) return prev.filter((q) => q.quote !== current.quote);
      if (prev.some((q) => q.quote === current.quote)) return prev;
      return [...prev, current];
    });
  };

  return (
    <div className="App">
      <main className="dashboard">
        <h1>Daily Motivation</h1>
        <p className="tagline">Simple quotes for a better day.</p>

        <section className="quote-card">
          {loading ? (
            <p className="loading-text">Loading a fresh quote...</p>
          ) : (
            <>
              <blockquote>"{current.quote}"</blockquote>
              <p className="author">- {current.author}</p>
              {offlineMode && (
                <p className="offline-note">Offline mode: showing built-in quotes.</p>
              )}
            </>
          )}
        </section>

        <div className="action-row">
          <button className="btn btn-primary" onClick={fetchQuote} disabled={loading}>
            New Quote
          </button>
          <button
            className={`btn btn-like ${liked ? 'is-liked' : ''}`}
            onClick={handleLike}
            disabled={loading}
          >
            {liked ? 'Unlike 💔' : 'Like ❤️'}
          </button>
        </div>

        <p className="like-count">Total liked: {likedQuotes.length}</p>

        {likedQuotes.length > 0 && (
          <section className="liked-list">
            <h2>Liked Quotes</h2>
            <ul>
              {likedQuotes.map((item, index) => (
                <li key={`${item.quote}-${index}`}>
                  "{item.quote}" <br />- {item.author}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App
