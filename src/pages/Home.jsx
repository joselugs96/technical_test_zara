import React, { useEffect, useState } from "react";
import PodcastsList from "@/components/PodcastsList";

function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  const CACHE_KEY = "top_podcasts_cache";
  const CACHE_TIME_KEY = "top_podcasts_timestamp";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

        if (cachedData && cachedTime) {
          const age = Date.now() - parseInt(cachedTime, 10);

          if (age < ONE_DAY_MS) {
            setPodcasts(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }
        const response = await fetch(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        const data = await response.json();
        setPodcasts(data.feed.entry);

        localStorage.setItem(CACHE_KEY, JSON.stringify(data.feed.entry));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
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
