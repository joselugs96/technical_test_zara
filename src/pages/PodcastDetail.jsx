import PodcastDetailCard from "@/components/PodcastDetailCard";
import PodcastEpisodeList from "@/components/PodcastEpisodeList";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function PodcastDetail() {
  const location = useLocation();
  const podcastId = location.state?.podcastId;
  const [podcastDetail, setPodcastDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const CACHE_EPISODE_KEY = `podcast_data_${podcastId}`;
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  async function fetchPodcastEpisodes(feedUrl) {
    if (!feedUrl) return [];

    try {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const rssRes = await fetch(`${proxy}${feedUrl}`);
      const rssText = await rssRes.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(rssText, "text/xml");
      const items = xml.querySelectorAll("item");

      const episodes = Array.from(items).map((item) => ({
        id: item.querySelector("guid")?.textContent,
        title: item.querySelector("title")?.textContent ?? "Sin título",
        audio: item.querySelector("enclosure")?.getAttribute("url") ?? null,
        pubDate: item.querySelector("pubDate")?.textContent ?? "",
        duration:
          item.querySelector("itunes\\:duration")?.textContent ||
          item.querySelector("duration")?.textContent ||
          null,
        description:
          item.querySelector("description")?.textContent ?? "Sin descripción",
      }));

      return episodes;
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchPodcastDetail() {
      const cachedData = localStorage.getItem(CACHE_EPISODE_KEY);
      const now = new Date().getTime();

      if (cachedData) {
        const parsedCache = JSON.parse(cachedData);
        if (now - parsedCache.timestamp < ONE_DAY_MS) {
          setPodcastDetail(parsedCache.data);
          setLoading(false);
          return;
        }
      }

      try {
        const podcastDetailRes = await fetch(
          `https://itunes.apple.com/lookup?id=${podcastId}`
        );
        const podcastDetailData = await podcastDetailRes.json();

        if (!podcastDetailData.results?.length) {
          console.warn("No se encontró información para el podcast.");
          setLoading(false);
          return;
        }

        const podcastInfo = podcastDetailData.results[0];
        const episodes = await fetchPodcastEpisodes(podcastInfo.feedUrl);

        const fullPodcastDetail = { ...podcastInfo, episodes };

        setPodcastDetail(fullPodcastDetail);

        const newCacheItem = {
          timestamp: now,
          data: fullPodcastDetail,
        };

        localStorage.setItem(CACHE_EPISODE_KEY, JSON.stringify(newCacheItem));
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    }

    if (podcastId) fetchPodcastDetail();
  }, [podcastId]);

  if (loading) return <p className="p-6">Cargando detalles del podcast...</p>;
  if (!podcastDetail) return <p className="p-6">No se encontró el podcast.</p>;

  const {
    artworkUrl600,
    collectionName,
    artistName,
    primaryGenreName,
    trackCount,
  } = podcastDetail;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50 min-h-screen">
      <aside className="md:col-span-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
        <PodcastDetailCard
          image={artworkUrl600}
          name={collectionName}
          author={artistName}
          genre={primaryGenreName}
        />
      </aside>
      <main className="md:col-span-3">
        <PodcastEpisodeList
          episodes={podcastDetail.episodes}
          trackCount={trackCount}
        />
      </main>
    </div>
  );
}

export default PodcastDetail;
