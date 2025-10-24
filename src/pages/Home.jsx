import React, { useEffect, useState } from "react";
import PodcastsList from "@/components/PodcastsList";

function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  const CACHE_KEY = "top_podcasts_cache";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const now = new Date().getTime();

        if (cachedData) {
          const parsedCache = JSON.parse(cachedData);
          if (now - parsedCache.timestamp < ONE_DAY_MS) {
            setPodcasts(parsedCache.data);
            setLoading(false);
            return;
          }
        }
        const response = await fetch(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );

        const data = await response.json();
        setPodcasts(data.feed.entry);

        const newCacheItem = {
          timestamp: now,
          data: data.feed.entry,
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify(newCacheItem));
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPodcasts();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando podcasts...</p>;

  return (
    <div>
      <h1>Top 100 Podcasts</h1>
      <PodcastsList podcasts={podcasts} />
    </div>
  );
}

export default Home;
