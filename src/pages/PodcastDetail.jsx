import PodcastSidebar from "@/components/PodcastSidebar";
import PodcastEpisodeList from "@/components/PodcastEpisodeList";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { startLoading, stopLoading } from "@/store/loadingSlice";
import { setSelectedPodcast } from "@/store/podcastSlice";

function PodcastDetail() {
  const location = useLocation();
  const podcastId = location.state?.podcastId;
  const podcastDetail = useSelector((state) => state.podcast);

  const CACHE_EPISODE_KEY = `podcast_data_${podcastId}`;
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const dispatch = useAppDispatch();

  async function fetchPodcastFeedUrl(feedUrl) {
    if (!feedUrl) return [];

    try {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const rssRes = await fetch(`${proxy}${feedUrl}`);
      const rssText = await rssRes.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(rssText, "text/xml");

      const channel = xml.querySelector("channel");
      const mainDescription =
        channel?.querySelector("itunes\\:summary")?.textContent ||
        channel?.querySelector("description")?.textContent ||
        "Descripción no disponible";
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

      return {
        episodes: episodes,
        description: mainDescription,
      };
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
      return { episodes: [], description: "Error de carga" };
    }
  }

  useEffect(
    () => {
      async function fetchPodcastDetail() {
        const cachedData = localStorage.getItem(CACHE_EPISODE_KEY);
        const now = new Date().getTime();

        if (cachedData) {
          const parsedCache = JSON.parse(cachedData);
          if (now - parsedCache.timestamp < ONE_DAY_MS) {
            dispatch(setSelectedPodcast(parsedCache.data));
            return;
          }
        }

        try {
          dispatch(startLoading());

          const podcastDetailRes = await fetch(
            `https://itunes.apple.com/lookup?id=${podcastId}`
          );
          const podcastDetailData = await podcastDetailRes.json();

          if (!podcastDetailData.results?.length) {
            console.warn("No se encontró información para el podcast.");
            dispatch(stopLoading());
            return;
          }

          const podcastInfo = podcastDetailData.results[0];

          const { episodes, description } = await fetchPodcastFeedUrl(
            podcastInfo.feedUrl
          );

          const fullPodcastDetail = { ...podcastInfo, description, episodes };

          dispatch(setSelectedPodcast(fullPodcastDetail));

          const newCacheItem = {
            timestamp: now,
            data: fullPodcastDetail,
          };

          localStorage.setItem(CACHE_EPISODE_KEY, JSON.stringify(newCacheItem));
        } catch (error) {
          console.error("Error fetching podcasts:", error);
        } finally {
          dispatch(stopLoading());
        }
      }

      if (podcastId) fetchPodcastDetail();

      return;
    },
    [podcastId],
    dispatch,
    CACHE_EPISODE_KEY
  );

  if (!podcastDetail) return <p className="p-6">No se encontró el podcast.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50 min-h-screen">
      <aside className="md:col-span-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
        <PodcastSidebar />
      </aside>
      <main className="md:col-span-3">
        <PodcastEpisodeList />
      </main>
    </div>
  );
}

export default PodcastDetail;
