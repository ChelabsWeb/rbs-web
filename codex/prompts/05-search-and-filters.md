# Prompt — Search & Filters

- Client search bar (debounced) + server filters (studio/status/genre/year)
- Optional Algolia integration; else, in-memory index for POC
- URL state sync (`?q=&studio=&status=&genre=&year=`)

Acceptance: typing updates grid; SSR for first load.
