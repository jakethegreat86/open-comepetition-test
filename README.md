# Open Competition — Novo Nordisk Foundation (concept)

A static website built from the uploaded **Open Competition / Open calls** design.
It presents the Novo Nordisk Foundation's research funding in open competition: a
marketing-style **home page** and a filterable **Open calls** overview.

> Concept design — not an official Novo Nordisk Foundation product.

## What's included

- **Home** — hero, "What is Open Competition?" comparison table, three focus areas,
  stats band, scope (research areas / grant types / who can apply), flagship
  programmes, a "How to apply" guide with assessment panel, FAQ and a closing CTA.
- **Open calls** — an overview of 18 calls that can be filtered by **status**,
  **research area**, **career level** and **geography**, free-text **searched**, and
  **sorted** by deadline, amount or recency. Live result counts and an empty state
  are included.

## Tech

Plain HTML, CSS and vanilla JavaScript — no build step and no runtime dependencies.

- `index.html` — markup for both views (toggled via `data-page` on `<body>`).
- `css/styles.css` — design tokens (colours, type, spacing) and component styles.
- `js/app.js` — the calls data set plus filtering, sorting, search and hash routing
  (`#/` for home, `#/calls` for the calls overview).

Fonts (Hanken Grotesk, Source Serif 4) are loaded from Google Fonts with system-font
fallbacks.

## Running it

It's a static site, so just open `index.html` in a browser. To serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing the calls

The call listings live in the `CALLS` array in `js/app.js`. Each entry defines its
name, group, description, research areas, career levels, geography, amount, duration,
deadline and status. The filter chips for research area, career level and geography
are generated from the `AREAS`, `LEVELS` and `GEOS` maps in the same file.
