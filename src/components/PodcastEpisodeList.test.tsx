import { render, screen } from "@/test-utils";
import PodcastEpisodeList from "./PodcastEpisodeList";
import { vi } from "vitest";
import * as hooks from "@/store/hooks";
import * as formatters from "@/utils/formatters";

const MOCK_FORMATTED_DATE = "15/05/2024";
const MOCK_FORMATTED_DURATION = "01:00:00";

describe("PodcastEpisodeList", () => {
  const mockEpisodes = [
    {
      id: "e1",
      title: "Introduction to React",
      pubDate: "2024-10-01T00:00:00Z",
      duration: 3600,
    },
    {
      id: "e2",
      title: "Advanced Hooks",
      pubDate: "2024-10-05T00:00:00Z",
      duration: 4200,
    },
  ];

  const mockPodcastDetail = {
    trackId: "123",
    trackCount: 2,
    episodes: mockEpisodes,
    collectionName: "Mock Podcast",
  };

  beforeEach(() => {
    vi.spyOn(formatters, "formatDate").mockReturnValue(MOCK_FORMATTED_DATE);
    vi.spyOn(formatters, "formatDuration").mockReturnValue(
      MOCK_FORMATTED_DURATION
    );

    vi.spyOn(hooks, "useAppSelector").mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debe mostrar el mensaje de carga si no hay datos del podcast", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(null);

    render(<PodcastEpisodeList />);
    expect(screen.getByText(/Loading episodes…/i)).toBeInTheDocument();
  });

  it("debe mostrar la lista de episodios y usar los datos formateados", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockPodcastDetail);

    render(<PodcastEpisodeList />);

    expect(screen.getByText(/Episodes: 2/i)).toBeInTheDocument();

    expect(screen.getByText("Introduction to React")).toBeInTheDocument();
    expect(screen.getByText("Advanced Hooks")).toBeInTheDocument();

    expect(formatters.formatDate).toHaveBeenCalledWith("2024-10-01T00:00:00Z");
    expect(formatters.formatDuration).toHaveBeenCalledWith(3600);

    expect(screen.getAllByText(MOCK_FORMATTED_DATE)).toHaveLength(2);
    expect(screen.getAllByText(MOCK_FORMATTED_DURATION)).toHaveLength(2);
  });

  it("cada episodio debe contener un link correcto al detalle (sin codificación)", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockPodcastDetail);

    render(<PodcastEpisodeList />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);

    expect(links[0]).toHaveAttribute("href", "/podcast/123/episode/e1");
    expect(links[1]).toHaveAttribute("href", "/podcast/123/episode/e2");
  });

  it("debe manejar y formatear correctamente los campos nulos", () => {
    const mockNoDuration = {
      ...mockPodcastDetail,
      episodes: [{ ...mockEpisodes[0], duration: null }],
      trackCount: 1,
    };

    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockNoDuration);

    render(<PodcastEpisodeList />);

    expect(formatters.formatDuration).toHaveBeenCalledWith(null);
  });
});
