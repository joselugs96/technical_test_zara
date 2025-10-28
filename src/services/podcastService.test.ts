/// <reference types="vitest/globals" />
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadTopPodcasts, loadPodcastDetail } from "./podcastService";

import { setPodcastList } from "@/store/podcastListSlice";
import { setSelectedPodcast } from "@/store/podcastSlice";
import { startLoading, stopLoading } from "@/store/loadingSlice";

const dispatchMock = vi.fn();
const mockAppDispatch = dispatchMock as any;

globalThis.fetch = vi.fn();

const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

const mockDOMParser = {
  parseFromString: vi.fn(() => ({
    querySelector: vi.fn((selector: string) => {
      if (selector === "channel") {
        return {
          querySelector: vi.fn((subSelector: string) => {
            if (subSelector === "itunes\\:summary") {
              return { textContent: "Podcast Description" };
            }
            return null;
          }),
        };
      }
      return null;
    }),
    querySelectorAll: vi.fn((selector: string) => {
      if (selector === "item") {
        return [
          {
            querySelector: vi.fn((s: string) => {
              if (s === "guid") return { textContent: "ep1" };
              if (s === "title") return { textContent: "Episode 1" };
              if (s === "pubDate")
                return { textContent: "Mon, 01 Jan 2024 00:00:00 GMT" };
              if (s === "itunes\\:duration") return { textContent: "3600" };
              if (s === "description") return { textContent: "Desc 1" };
              return null;
            }),
            getAttribute: vi.fn(() => "audio.mp3"),
          },
          {
            querySelector: vi.fn((s: string) => {
              if (s === "guid") return { textContent: "ep2" };
              if (s === "title") return { textContent: "Episode 2" };
              return null;
            }),
            getAttribute: vi.fn(() => "audio2.mp3"),
          },
        ] as any;
      }
      return [] as any;
    }),
  })),
};
globalThis.DOMParser = vi.fn(() => mockDOMParser) as any;

describe("Podcast Service (loadTopPodcasts)", () => {
  const MOCK_PODCAST_LIST = [
    {
      id: { attributes: { "im:id": "1" } },
      "im:name": { label: "Podcast Mock 1" },
      "im:image": [
        { label: "img_small.jpg" },
        { label: "img_medium.jpg" },
        { label: "img_large.jpg" },
      ],
      "im:artist": { label: "Artista Mock 1" },
      summary: { label: "Descripción breve" },
      "im:contentType": {},
      "im:price": {},
      rights: {},
      title: {},
      link: {},
    },
  ] as any;
  const CACHE_KEY = "top_podcasts_list";

  beforeEach(() => {
    dispatchMock.mockClear();
    localStorageMock.clear();
    (fetch as any).mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debe cargar datos desde la API si no hay caché", async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ feed: { entry: MOCK_PODCAST_LIST } }),
    });

    await loadTopPodcasts(mockAppDispatch);

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      CACHE_KEY,
      expect.stringContaining(JSON.stringify(MOCK_PODCAST_LIST))
    );

    expect(dispatchMock).toHaveBeenCalledWith(
      setPodcastList(MOCK_PODCAST_LIST)
    );
  });

  it("debe cargar datos desde la caché si son válidos (menos de 24h)", async () => {
    const now = Date.now();
    const validCache = JSON.stringify({
      timestamp: now,
      data: MOCK_PODCAST_LIST,
    });
    localStorageMock.getItem.mockReturnValue(validCache);

    await loadTopPodcasts(mockAppDispatch);

    expect(fetch).not.toHaveBeenCalled();

    expect(dispatchMock).toHaveBeenCalledWith(
      setPodcastList(MOCK_PODCAST_LIST)
    );
  });

  it("debe recargar datos si la caché ha expirado (más de 24h)", async () => {
    const expiredTimestamp = Date.now() - (24 * 60 * 60 * 1000 + 1);
    const expiredCache = JSON.stringify({
      timestamp: expiredTimestamp,
      data: MOCK_PODCAST_LIST,
    });
    localStorageMock.getItem.mockReturnValue(expiredCache);

    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ feed: { entry: MOCK_PODCAST_LIST } }),
    });

    await loadTopPodcasts(mockAppDispatch);

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("Podcast Service (loadPodcastDetail)", () => {
  const PODCAST_ID = "999";
  const CACHE_KEY = `podcast_data_${PODCAST_ID}`;

  const MOCK_ITUNES_INFO = {
    trackId: 999,
    collectionName: "Podcast Title",
    feedUrl: "http://podcast.rss",
    trackCount: 50,
  };

  beforeEach(() => {
    dispatchMock.mockClear();
    localStorageMock.clear();
    (fetch as any).mockClear();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debe cargar datos desde la caché si son válidos y NO hacer llamadas de red", async () => {
    const now = Date.now();

    const validCacheData = {
      ...MOCK_ITUNES_INFO,
      description: "Cached",
      episodes: [],
    };

    const validCache = JSON.stringify({
      timestamp: now,
      data: validCacheData,
    });
    localStorageMock.getItem.mockReturnValue(validCache);

    await loadPodcastDetail(mockAppDispatch, PODCAST_ID);

    expect(fetch).not.toHaveBeenCalled();

    expect(dispatchMock).toHaveBeenCalledWith(
      setSelectedPodcast(validCacheData)
    );

    expect(dispatchMock).not.toHaveBeenCalledWith(startLoading());
    expect(dispatchMock).not.toHaveBeenCalledWith(stopLoading());
  });

  it("debe cargar datos desde la API si no hay caché", async () => {
    localStorageMock.getItem.mockReturnValue(null);

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ results: [MOCK_ITUNES_INFO] }),
    });

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve("mocked xml content"),
    });

    await loadPodcastDetail(mockAppDispatch, PODCAST_ID);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("debe recargar datos si la caché ha expirado (más de 24h)", async () => {
    vi.useFakeTimers();
    const expiredTimestamp = Date.now() - (24 * 60 * 60 * 1000 + 1);
    const expiredCache = JSON.stringify({
      timestamp: expiredTimestamp,
      data: MOCK_ITUNES_INFO,
    });
    localStorageMock.getItem.mockReturnValue(expiredCache);

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ results: [MOCK_ITUNES_INFO] }),
    });
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve("mocked xml content"),
    });

    await loadPodcastDetail(mockAppDispatch, PODCAST_ID);

    expect(fetch).toHaveBeenCalledTimes(2);

    expect(dispatchMock).toHaveBeenCalledWith(startLoading());

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      CACHE_KEY,
      expect.any(String)
    );

    vi.useRealTimers();
  });
});
