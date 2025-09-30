import { render, screen } from "@testing-library/react";
import { PosterCard } from "@/components/PosterCard";

describe("PosterCard", () => {
  it("renders provided title and release date", () => {
    render(<PosterCard title="Test Movie" releaseDate="Mayo 2025" />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText(/Estreno: Mayo 2025/)).toBeInTheDocument();
  });

  it("wraps the card with a link when href is provided", () => {
    render(<PosterCard title="Linked Movie" href="/peliculas/test" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/peliculas/test");
  });
});
