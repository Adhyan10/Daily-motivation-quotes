# Daily Motivation Dashboard - Viva Notes

## 1) Project Summary

This project is a React app that shows motivational quotes, allows users to like/unlike quotes, and stores liked quotes in browser localStorage.

## 2) Key Concepts Used

- `useState` for UI data/state
- `useEffect` for side effects (fetch + localStorage)
- Async API calls with `fetch`
- Array update patterns (`filter`, spread)
- Conditional rendering

## 3) State Variables

- `current`: current quote object `{ quote, author }`
- `loading`: true while fetching quote
- `offlineMode`: true when fallback quote is used
- `likedQuotes`: array of saved liked quotes

## 4) Data Flow

1. Component mounts
2. `fetchQuote()` runs via `useEffect`
3. App tries external APIs with timeout
4. If success -> set current quote from API
5. If fail -> set current quote from fallback array
6. User likes quote -> update `likedQuotes`
7. `likedQuotes` is persisted to localStorage

## 5) Why Fallback Quotes?

Sometimes API can fail due to DNS, network, CORS, or server downtime.
Fallback ensures app still works and user always sees a quote.

## 6) Why localStorage?

To keep liked quotes even after page refresh or browser restart.

## 7) Most Common Viva Questions

### Q: Why did you use `useEffect` with `[]`?

A: To run fetch only once when component first mounts.

### Q: Why keep `liked` as derived value?

A: It is computed from `likedQuotes` and `current`, so no duplicate state is needed.

### Q: How do you prevent duplicate liked quotes?

A: Before adding, code checks if quote already exists in `likedQuotes`.

### Q: Why disable buttons during loading?

A: Prevents duplicate requests/click conflicts and improves UX.

### Q: How do you handle API errors?

A: Try multiple APIs, then fallback to local quotes if all fail.

## 8) 20-Second Pitch

I built a Daily Motivation Dashboard in React using hooks. It fetches random quotes, supports like/unlike, tracks liked count, and persists liked quotes in localStorage. It also has robust error handling: if APIs fail, it switches to built-in fallback quotes so the app still works.
