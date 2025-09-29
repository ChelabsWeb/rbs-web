# Prompt — CMS Integration (Headless WP)

Implement a data layer:
- `getMovies({ studio?, status?, q?, genre?, year?, page? })`
- `getMovieBySlug(slug)`
- `getStudios()`
- `getUpcoming({ from=TodayURU })`

Use `.env`:


-Add caching with `fetch(..., { next: { revalidate: 1800 } })`.
