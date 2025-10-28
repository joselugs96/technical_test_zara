import { render, screen } from "@/test-utils";
import Header from "./Header";
import { vi } from "vitest";
import * as hooks from "@/store/hooks";

describe("Header component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debería renderizar el título principal y el enlace", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(false);

    render(<Header />);

    const title = screen.getByRole("link", { name: /Podcaster/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("href", "/");
  });

  it("debería mostrar el indicador de carga cuando isLoading es true", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(true);

    render(<Header />);

    const loader = screen.getByRole("status", { name: /loading/i });
    expect(loader).toBeInTheDocument();
  });

  it("no debería mostrar el indicador de carga cuando isLoading es false", () => {
    vi.spyOn(hooks, "useAppSelector").mockReturnValue(false);

    render(<Header />);

    const loader = screen.queryByRole("status", { name: /loading/i });
    expect(loader).not.toBeInTheDocument();
  });
});
