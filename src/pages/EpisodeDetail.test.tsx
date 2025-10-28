import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EpisodeDetail from "./EpisodeDetail";
import { vi } from "vitest";
import * as hooks from "@/store/hooks";

vi.mock("@/components/PodcastSidebar", () => ({
  __esModule: true,
  default: () => <div data-testid="sidebar">Sidebar Mock</div>,
}));

describe("EpisodeDetail", () => {
  const mockPodcastDetail = {
    episodes: [
      {
        id: "ep1",
        title: "First Episode",
        description: "This is the first episode",
        audio: "https://example.com/audio.mp3",
      },
      {
        id: "ep2",
        title: "Second Episode",
        description: "No audio here",
        audio: "",
      },
    ],
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("muestra mensaje de carga cuando no hay datos", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={["/podcast/1/episode/ep1"]}>
        <Routes>
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetail />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading episode details/i)).toBeInTheDocument();
  });

  it("renderiza el episodio correctamente cuando hay datos", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockPodcastDetail);

    render(
      <MemoryRouter initialEntries={["/podcast/1/episode/ep1"]}>
        <Routes>
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetail />}
          />
        </Routes>
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", { name: /first episode/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByText(/this is the first episode/i)).toBeInTheDocument();

    const audio = document.querySelector("audio");
    expect(audio).toBeTruthy();
    const source = audio?.querySelector("source");
    expect(source).toHaveAttribute("src", "https://example.com/audio.mp3");

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("muestra el mensaje de audio no disponible si no hay audio", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockPodcastDetail);

    render(
      <MemoryRouter initialEntries={["/podcast/1/episode/ep2"]}>
        <Routes>
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetail />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/second episode/i)).toBeInTheDocument();
    expect(screen.getByText(/audio not available/i)).toBeInTheDocument();
  });
});
