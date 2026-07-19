# Fresh Cart

A concept prototype of a grocery storefront with an embedded assistant that suggests
healthier picks — with a specific, quantitative reason — directly in the cart, and stays
quiet everywhere else.

Concept prototype by Yaron Sole. Not affiliated with Instacart, Inc.

## Run locally

```sh
npm install
npm run dev
```

## Deploy

```sh
./scripts/deploy.sh
```

Builds and pushes `dist/` to the `gh-pages` branch, served at
https://yaronsole.github.io/fresh-cart/

## Notes

- Vite + React + TypeScript + Tailwind, Zustand for state. No backend, no runtime
  network calls; everything ships in the static bundle.
- Catalog, healthier-pick map, and reason copy live in `src/data/catalog.ts`.
- Product photography via [Open Food Facts](https://openfoodfacts.org) (CC BY-SA)
  and other openly licensed sources, bundled locally in `public/products/`.
