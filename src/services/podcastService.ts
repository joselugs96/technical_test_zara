import { startLoading, stopLoading } from "@/store/loadingSlice";
import { setPodcastList } from "@/store/podcastListSlice";
import { setSelectedPodcast } from "@/store/podcastSlice";
import type { AppDispatch } from "@/store/store";
import { PodcastDetail, Episode } from "@/types/podcast";

const TOP_PODCASTS_URL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
const DETAIL_URL = "https://itunes.apple.com/lookup?id=";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

async function fetchPodcastFeedUrl(
  feedUrl?: string
): Promise<{ episodes: Episode[]; description: string }> {
  if (!feedUrl) {
    return { episodes: [], description: "Descripción no disponible" };
  }

  try {
    const rssRes = await fetch(`${CORS_PROXY}${feedUrl}`);
    const rssText = await rssRes.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(rssText, "text/xml");

    const channel = xml.querySelector("channel");
    const mainDescription =
      channel?.querySelector("itunes\\:summary")?.textContent ||
      channel?.querySelector("description")?.textContent ||
      "Descripción no disponible";

    const items = xml.querySelectorAll("item");

    const episodes: Episode[] = Array.from(items).map((item) => ({
      id: item.querySelector("guid")?.textContent ?? "",
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

    return { episodes, description: mainDescription };
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return { episodes: [], description: "Error de carga" };
  }
}

export async function loadTopPodcasts(dispatch: AppDispatch): Promise<void> {
  const CACHE_KEY = "top_podcasts_list";
  const now = Date.now();

  try {
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      if (now - parsed.timestamp < ONE_DAY_MS) {
        dispatch(setPodcastList(parsed.data));
        return;
      }
    }

    const response = await fetch(TOP_PODCASTS_URL);
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);

    const data = await response.json();
    const podcasts = data.feed.entry || [];

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: now, data: podcasts })
    );

    dispatch(setPodcastList(podcasts));
    return;
  } catch (error) {
    console.error("loadTopPodcasts Error:", error);
    throw error;
  }
}

export async function loadPodcastDetail(
  dispatch: AppDispatch,
  podcastId: string
): Promise<void> {
  const CACHE_KEY = `podcast_data_${podcastId}`;
  const now = Date.now();

  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const parsedCache = JSON.parse(cachedData);
    if (now - parsedCache.timestamp < ONE_DAY_MS) {
      dispatch(setSelectedPodcast(parsedCache.data));
      return;
    }
  }

  try {
    dispatch(startLoading());

    const podcastDetailRes = await fetch(`${DETAIL_URL}${podcastId}`);
    const podcastDetailData = await podcastDetailRes.json();

    if (!podcastDetailData.results?.length) {
      console.warn("No podcast information was found");
      return;
    }

    const podcastInfo: PodcastDetail = podcastDetailData.results[0];
    const { episodes, description } = await fetchPodcastFeedUrl(
      podcastInfo.feedUrl
    );

    const fullPodcastDetail: PodcastDetail = {
      ...podcastInfo,
      description,
      episodes,
    };

    dispatch(setSelectedPodcast(fullPodcastDetail));

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: now, data: fullPodcastDetail })
    );
    return;
  } catch (error) {
    console.error("Error retrieving podcast details", error);
  } finally {
    dispatch(stopLoading());
  }
}
