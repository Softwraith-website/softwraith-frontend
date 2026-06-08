# Softwraith Frontend

React/Vite client for the Softwraith website, LMS dashboard, and admin panel.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Environment

Create `.env` from `.env.example`.

```text
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=
```

## Active App Structure

- `src/pages`: route-level public, auth, dashboard, and admin screens
- `src/components/layout`: public layout navigation and footer
- `src/components/sections`: home page sections
- `src/context/AuthContext.jsx`: client auth state
- `src/utils/api.js`: Axios API client with bearer token injection
