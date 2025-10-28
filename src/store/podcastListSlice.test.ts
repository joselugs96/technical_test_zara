import reducer, { setPodcastList } from "./podcastListSlice";
import type { PodcastEntry } from "@/types/podcast";

describe("podcastListSlice", () => {
  const initialState: PodcastEntry[] = [];

  it("debe retornar el estado inicial por defecto", () => {
    const result = reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("debe establecer la lista de podcasts correctamente", () => {
    const mockPodcasts: PodcastEntry[] = [
      {
        id: { attributes: { "im:id": "1" } },
        "im:name": { label: "React Podcast" },
        "im:artist": { label: "Dan Abramov" },
      } as unknown as PodcastEntry,
      {
        id: { attributes: { "im:id": "2" } },
        "im:name": { label: "Vue Mastery" },
        "im:artist": { label: "Evan You" },
      } as unknown as PodcastEntry,
    ];

    const result = reducer(initialState, setPodcastList(mockPodcasts));

    expect(result).toHaveLength(2);
    expect(result[0]["im:name"].label).toBe("React Podcast");
    expect(result[1]["im:artist"].label).toBe("Evan You");
  });
});
