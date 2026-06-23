# Daily Motivation Dashboard

A simple React app that fetches motivational quotes and lets users like their favorites.

## Demo Features

- Fetches a random quote on first load
- `New Quote` button to fetch another quote
- `Like ❤️` button to toggle liked state
- Shows total liked count
- Shows list of liked quotes
- Saves liked quotes in `localStorage`
- Handles API failure with built-in offline fallback quotes

## Tech Stack

- React (hooks: `useState`, `useEffect`)
- Vite
- Plain JavaScript
- CSS


## APIs Used

- `https://api.quotable.io/random`
- `https://zenquotes.io/api/random`

If both fail, the app shows local fallback quotes.

## Project Structure

```
src/
	App.jsx       # Main logic and UI
	App.css       # Styling
	index.css     # Global reset styles
	main.jsx      # App entry point
```

## How To Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

## Viva Explanation (Quick)

- State:
  - `current` stores current quote + author
  - `loading` controls loading UI/button disabled state
  - `offlineMode` shows fallback indicator
  - `likedQuotes` stores liked quote list
- Effects:
  - First `useEffect`: fetches quote on mount
  - Second `useEffect`: persists `likedQuotes` to `localStorage`
- Logic:
  - Try APIs one by one with timeout
  - Parse response formats
  - If APIs fail, use local fallback quote
  - Like/unlike updates array state safely

## Possible Improvements

- Add category filters (success, discipline, focus)
- Add copy/share quote button
- Add toast notifications
- Add unit tests for fetch and like handlers

## Author

Adhyan
