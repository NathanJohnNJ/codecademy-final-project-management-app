# Frontend

## React + Vite

This is a minimal Vite + React frontend that calls the backend at `/api`.

Authentication:

- On register/login the backend returns a JWT token. The frontend stores it in `localStorage` under `token` and sends it in the Authorization header for subsequent requests.

Run:

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`

To change the backend URL in development, set `VITE_API_URL` in `.env`.
