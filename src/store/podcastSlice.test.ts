import reducer, {
  setSelectedPodcast,
  clearSelectedPodcast,
} from "./podcastSlice";
import type { PodcastDetail } from "@/types/podcast";

describe("podcastSlice", () => {
  const initialState = { selectedPodcast: null };

  it("debe retornar el estado inicial por defecto", () => {
    const result = reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("debe establecer el podcast seleccionado con setSelectedPodcast", () => {
    const mockPodcast: PodcastDetail = {
      trackId: 123,
      collectionName: "React Podcast",
      artistName: "Dan Abramov",
      description: "Podcast sobre React y JavaScript",
      artworkUrl600: "https://example.com/artwork.jpg",
      episodes: [],
    } as unknown as PodcastDetail;

    const result = reducer(initialState, setSelectedPodcast(mockPodcast));

    expect(result.selectedPodcast).toEqual(mockPodcast);
    expect(result.selectedPodcast?.collectionName).toBe("React Podcast");
    expect(result.selectedPodcast?.artistName).toBe("Dan Abramov");
  });

  it("debe limpiar el podcast seleccionado con clearSelectedPodcast", () => {
    const previousState = {
      selectedPodcast: { trackId: 999, collectionName: "Old Podcast" },
    } as unknown as { selectedPodcast: PodcastDetail };

    const result = reducer(previousState, clearSelectedPodcast());

    expect(result.selectedPodcast).toBeNull();
  });
});
