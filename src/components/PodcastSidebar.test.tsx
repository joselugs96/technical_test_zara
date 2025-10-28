import { render, screen } from "@/test-utils";
import PodcastSidebar from "./PodcastSidebar";
import { vi } from "vitest";
import * as hooks from "@/store/hooks";

describe("PodcastSidebar", () => {
  const mockPodcast = {
    artworkUrl600: "https://example.com/artwork.jpg",
    collectionName: "The React Show",
    artistName: "Dan Abramov",
    description: "<p>A podcast about React and web development.</p>",
    trackId: 42,
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("muestra mensaje de carga cuando no hay podcastDetail", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(null);

    render(<PodcastSidebar />);

    expect(
      screen.getByText(/Loading sidebar information/i)
    ).toBeInTheDocument();
  });

  it("renderiza correctamente los datos del podcast", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockPodcast);

    render(<PodcastSidebar />);

    const image = screen.getByAltText("The React Show");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockPodcast.artworkUrl600);

    expect(screen.getByText("The React Show")).toBeInTheDocument();
    expect(screen.getByText(/by Dan Abramov/i)).toBeInTheDocument();

    expect(screen.getByText(/A podcast about React/i)).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/podcast/42");
    });
  });

  it("los links apuntan a la página de detalle del podcast", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(mockPodcast);

    render(<PodcastSidebar />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);

    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/podcast/42");
    });
  });
});
