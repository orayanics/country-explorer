# Country Explorer

## Setup Instructions

Make sure to install dependencies (whichever package manager you prefer):

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Run Instructions

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Build Instructions

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Tech Stack

The following technologies were used to build this application:

- Nuxt
- Vue 3
- Pinia/Colada
- Tailwind CSS
- TypeScript

## Assumptions

- I assume the REST Countries API is has queries, pagination, and HTTP code documentaion.

## Trade-offs

- Limited API queries since the API does not support pagination, so I implemented client-side pagination.
- HTTP codes are not documented in the API documentation and missing countries return a 404.

## Requirement Feedback

- Does the API support pagination, and if not, how should we handle large datasets?
- How about HTTP codes for error handling, since the API documentation does not provide this information?
- Should the search be case-insensitive and support partial matches?

## Bonus Work

- Added cards and grid layout for responsiveness
- Added debounched search input to reduce API calls while typing to prevent excessive API calls
- Cache API results using Pinia/Colada to reduce redundant API calls when navigating between country details and the main list
- Used /alpha/{code} endpoint to fetch border country details in the detail view instead of fetching all countries and filtering client-side
- Used URL query parameters to manage search and filter state, allowing for better user experience and shareable URLs

## Known Issues

- The API documentation does not provide HTTP status codes for error handling, so error handling is based on assumptions and may not cover all edge cases (only error page is shown)
