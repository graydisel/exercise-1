# VIN Decoder Tool

A modern, responsive React application that decodes Vehicle Identification Numbers (VIN) using the official NHTSA API. Built with a focus on performance, semantic HTML, and clean architecture.

## Key Features

- **VIN Decoding:** Detailed vehicle information lookup with automatic filtering of empty or null values.
- **Smart History:** Remembers the last 3 successful searches, persisted via `localStorage`.
- **Variables Directory:** A comprehensive guide to all available vehicle variables.
- **Dynamic Titles:** Automatically updates browser tab titles based on the current route/variable.
- **Strict Validation:** Custom regex validation following ISO 3779 standards (excludes I, O, and Q characters).

## Tech Stack

- **React 18** with **TypeScript** for type safety.
- **Redux Toolkit:** - `createAsyncThunk` for asynchronous API calls.
  - `createSelector` (Reselect) for optimized, memoized data fetching.
  - Custom Middleware for `localStorage` persistence.
- **React Router 6.4+:** Using `createBrowserRouter` and Data APIs for efficient routing.
- **Vanilla CSS:** Minimalist, framework-free styling with a focus on CSS Grid and Flexbox.

## Architecture & Optimization

### Performance
Used **memoized selectors** to prevent unnecessary re-renders when filtering large datasets from the NHTSA API. This ensures the UI remains snappy even when handling hundreds of variables.

### Resilience
Implemented a centralized **Layout system** that manages document titles and shared UI components, making the app easily scalable. Added an `ErrorBoundary` to gracefully handle API or runtime failures.

### Accessibility & Semantics
Strictly followed HTML5 semantic standards using elements like `<dl>`, `<dt>`, `<dd>` for data pairs and `<main>`, `<nav>`, `<article>` for layout structure.

## Responsiveness
The UI is handcrafted to be fully responsive, supporting resolutions from **420px to 1440px**. 
- Mobile-first approach for search forms.
- Adaptive Grid layout for the Variables directory.

## Getting Started

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/graydisel/exercise-1.git](https://github.com/graydisel/exercise-1.git)

2. **Install dependencies:**

    ```bash 
   npm install

3. **Run the app:**
    ```bash 
   npm run dev

## License

This project was developed as a technical assessment for ABP.

## Link

Follow this link to see this app:

https://vin-decoder-silk.vercel.app/