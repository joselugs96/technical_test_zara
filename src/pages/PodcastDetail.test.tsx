import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PodcastDetail from "./PodcastDetail";
import { vi } from "vitest";
import * as hooks from "@/store/hooks";
import * as podcastService from "@/services/podcastService";

vi.mock("@/components/PodcastSidebar", () => ({
  __esModule: true,
  default: () => <div data-testid="sidebar">Sidebar Mock</div>,
}));

vi.mock("@/components/PodcastEpisodeList", () => ({
  __esModule: true,
  default: () => <div data-testid="episode-list">EpisodeList Mock</div>,
}));

describe("PodcastDetail page", () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(hooks, "useAppDispatch").mockReturnValue(dispatchMock);
  });

  it("muestra el mensaje de carga si no hay datos del podcast", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={["/podcast/123"]}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading details/i)).toBeInTheDocument();
  });

  it("llama a loadPodcastDetail al montarse con el podcastId correcto", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({}); // no importa el contenido
    const loadSpy = vi.spyOn(podcastService, "loadPodcastDetail");

    render(
      <MemoryRouter initialEntries={["/podcast/456"]}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(loadSpy).toHaveBeenCalledTimes(1);
    expect(loadSpy).toHaveBeenCalledWith(dispatchMock, "456");
  });

  it("renderiza el sidebar y la lista de episodios cuando hay datos", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue({
      trackId: "123",
      collectionName: "React Podcast",
    });

    render(
      <MemoryRouter initialEntries={["/podcast/123"]}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("episode-list")).toBeInTheDocument();
  });
});
