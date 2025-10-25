import React, { useEffect, useState } from "react";
import PodcastsList from "@/components/PodcastsList";

import { useAppDispatch } from "@/store/hooks";
import { startLoading, stopLoading } from "@/store/loadingSlice";

function Home() {
  const [podcasts, setPodcasts] = useState([]);

  const CACHE_KEY = "top_podcasts_cache";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchPodcasts() {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const now = new Date().getTime();

      if (cachedData) {
        const parsedCache = JSON.parse(cachedData);
        if (now - parsedCache.timestamp < ONE_DAY_MS) {
          setPodcasts(parsedCache.data);
          dispatch(stopLoading());
          return;
        }
      }

      try {
        dispatch(startLoading());

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
        dispatch(stopLoading());
      }
    }

    fetchPodcasts();
  }, []);

  return (
    <div>
      <PodcastsList podcasts={podcasts} />
    </div>
  );
}

export default Home;
