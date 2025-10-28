import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { vi } from "vitest";
import * as hooks from "@/store/hooks";
import * as podcastSlice from "@/store/podcastSlice";
import * as podcastService from "@/services/podcastService";

vi.mock("@/components/PodcastsList", () => ({
  __esModule: true,
  default: () => <div data-testid="podcasts-list">Mock PodcastsList</div>,
}));

describe("Home page", () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(hooks, "useAppDispatch").mockReturnValue(dispatchMock);
  });

  it("renderiza la lista de podcasts", () => {
    render(<Home />);
    expect(screen.getByTestId("podcasts-list")).toBeInTheDocument();
  });

  it("despacha clearSelectedPodcast y llama a loadTopPodcasts al montar", () => {
    const clearSpy = vi.spyOn(podcastSlice, "clearSelectedPodcast");
    const loadSpy = vi.spyOn(podcastService, "loadTopPodcasts");

    render(<Home />);

    expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(clearSpy.mock.results[0].value);

    expect(loadSpy).toHaveBeenCalledTimes(1);
    expect(loadSpy).toHaveBeenCalledWith(dispatchMock);
  });
});
