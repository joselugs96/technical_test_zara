import { render, screen } from "@/test-utils";
import PodcastCard from "./PodcastCard";

describe("PodcastCard", () => {
  const mockPodcast = {
    id: { attributes: { "im:id": "123" } },
    "im:name": { label: "The React Podcast" },
    "im:artist": { label: "Dan Abramov" },
    "im:image": [
      { label: "small.jpg" },
      { label: "medium.jpg" },
      { label: "large.jpg" },
    ],
  };

  it("renderiza correctamente el nombre, autor e imagen", () => {
    render(<PodcastCard podcast={mockPodcast as any} />);

    expect(screen.getByText("The React Podcast")).toBeInTheDocument();
    expect(screen.getByText(/Author:\s*Dan Abramov/i)).toBeInTheDocument();

    const img = screen.getByAltText("The React Podcast");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "large.jpg");
  });

  it("el enlace apunta a /podcast/123", () => {
    render(<PodcastCard podcast={mockPodcast as any} />);

    const link = screen.getByRole("link", { name: /The React Podcast/i });
    expect(link).toHaveAttribute("href", "/podcast/123");
  });
});
