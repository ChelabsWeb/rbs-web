import React from "react";
import { render, screen } from "@testing-library/react";
import PeliculaPage from "../../app/peliculas/[slug]/page";

describe("PeliculaPage accessibility", () => {
  it("renders heading for the movie", () => {
    render(<PeliculaPage params={{ slug: "ejemplo" }} />);
    expect(screen.getByRole("heading", { name: /Pelicula: ejemplo/i })).toBeInTheDocument();
  });
});
