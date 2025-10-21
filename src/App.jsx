
import './App.css'
import React, { useEffect, useState } from 'react';
import PodcastsList from './components/PodcastsList';

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const response = await fetch(
          'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        );
        const data = await response.json();
        setPodcasts(data.feed.entry);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPodcasts();
  }, []);

  if (loading) return <p>Cargando podcasts...</p>;

  return (
    <div>
      <h1>Top 100 Podcasts</h1>
      <PodcastsList podcasts={podcasts} />
    </div>
  )
}

export default App
