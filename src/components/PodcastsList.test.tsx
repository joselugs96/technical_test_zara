import { render, screen, fireEvent } from "@/test-utils";
import PodcastsList from "./PodcastsList";
import { vi } from "vitest";
import * as hooks from "@/store/hooks";

vi.mock("./PodcastCard", () => ({
  __esModule: true,
  default: ({ podcast }: any) => (
    <div data-testid="podcast-card">{podcast["im:name"].label}</div>
  ),
}));

describe("PodcastsList", () => {
  const mockPodcasts = [
    {
      id: { attributes: { "im:id": "1" } },
      "im:name": { label: "React Podcast" },
      "im:artist": { label: "Dan Abramov" },
    },
    {
      id: { attributes: { "im:id": "2" } },
      "im:name": { label: "Vue Mastery" },
      "im:artist": { label: "Evan You" },
    },
    {
      id: { attributes: { "im:id": "3" } },
      "im:name": { label: "Angular World" },
      "im:artist": { label: "Misko Hevery" },
    },
  ];

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("carga los datos correctamente desde el store", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockPodcasts);

    render(<PodcastsList />);

    expect(screen.getByText("3")).toBeInTheDocument();

    const cards = screen.getAllByTestId("podcast-card");
    expect(cards).toHaveLength(3);
    expect(cards[0]).toHaveTextContent("React Podcast");
    expect(cards[1]).toHaveTextContent("Vue Mastery");
    expect(cards[2]).toHaveTextContent("Angular World");
  });

  it("muestra todos los podcasts al inicio", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockPodcasts);

    render(<PodcastsList />);

    expect(screen.getByText("3")).toBeInTheDocument();

    const cards = screen.getAllByTestId("podcast-card");
    expect(cards).toHaveLength(3);
  });

  it("filtra podcasts según el texto de búsqueda", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockPodcasts);

    render(<PodcastsList />);

    const input = screen.getByRole("textbox", {
      name: /filter podcasts by name or author/i,
    });

    fireEvent.change(input, { target: { value: "vue" } });

    expect(screen.getByText("Vue Mastery")).toBeInTheDocument();
    expect(screen.queryByText("React Podcast")).not.toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // contador
  });

  it("no muestra resultados cuando no hay coincidencias", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockPodcasts);

    render(<PodcastsList />);

    const input = screen.getByRole("textbox", {
      name: /filter podcasts by name or author/i,
    });

    fireEvent.change(input, { target: { value: "svelte" } });

    expect(screen.queryAllByTestId("podcast-card")).toHaveLength(0);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
