import { render, screen } from "@testing-library/react";
import { PosterCard } from "@/components/PosterCard";

describe("PosterCard", () => {
  it("renders provided title", () => {
    render(<PosterCard title="Test Movie" releaseDate="2025" />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });
});
