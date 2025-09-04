# QCash-Client

Front-end client for QCash — a fintech demo supporting user registration, phone verification (Firebase), wallet management, and an admin panel. Built with React, TypeScript, Vite and Redux Toolkit (RTK Query).

## Contents

- Project overview
- Setup and environment variables
- Development & build commands
- Technology stack
- Notes & troubleshooting

## Project overview

This repository contains the client application for QCash. Key features:

- User registration and login (with phone verification via Firebase)
- Profile completion with image upload
- Wallet and transaction UI (user + admin)
- Admin endpoints for user/wallet/transaction management and analytics
- State management using Redux Toolkit + RTK Query
- API client based on Axios with a reusable RTK Query base query

## Repo structure (important files)

- `src/` — main application source
  - `components/` — UI components and modules
  - `pages/` — route pages (Home, Login, Registration, Verify, Profile, Admin)
  - `redux/` — RTK Query `baseApi`, feature APIs and store slices
  - `lib/axios.ts` — axios instance and interceptors
  - `config/` — firebase and other config helpers

## Technology stack

- React 18 + TypeScript
- Vite
- Redux Toolkit + RTK Query
- Axios
- Firebase Authentication (phone auth + reCAPTCHA)
- Tailwind CSS / shadcn UI components
- Sonner for toast notifications

## Environment & prerequisites

- Node.js (v16+ recommended) or Bun
- A Firebase project with Phone authentication enabled
- Backend API server (the frontend expects an API at `VITE_API_BASE_URL`)

Create a `.env.local` in the project root and add the following variables (replace placeholders):

```env
VITE_API_BASE_URL=http://localhost:9000/api/v1
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

Notes:
- Vite exposes variables starting with `VITE_` to the browser. Do not store server secrets here.
- Add your app domain (e.g. `localhost:5173`) to Firebase Authentication → Authorized domains.

## Install & run (development)

Using npm:

```bash
npm install
npm run dev
```

Or with Bun:

```bash
bun install
bun dev
```

The dev server defaults to `http://localhost:5173`.

## Build & preview

```bash
npm run build
npm run preview
```

## Auth flow & tokens

- After successful login the backend returns `accessToken` and `refreshToken`.
- Store tokens in a secure place (Redux slice + localStorage is common). The frontend must attach `Authorization: Bearer <accessToken>` to protected requests.
- Implement `/auth/me` on the backend and call it on app startup to restore the user session.

Example: attach token in `src/redux/axiosBaseQuery.ts` or `src/lib/axios.ts` request interceptor.

## Enforcing profile completion before transactions

1. Backend: add `isProfileComplete: boolean` to the user model (default `false`). Guard transaction endpoints and return `403` if false.
2. Frontend: after register/login call `/auth/me`. If `isProfileComplete` is false, redirect user to `/complete-profile` and block transaction routes with a route guard.
3. Add a small `RequireProfileComplete` wrapper to protect transaction routes in the router.

## Firebase phone auth common issues

- `auth/argument-error`: likely Recaptcha/constructor parameters or missing DOM container.
- `auth/invalid-app-credential`: check Firebase config (API key, appId) and reCAPTCHA setup; ensure project credentials match.
- `auth/too-many-requests`: SMS rate limit hit; use Firebase test phone numbers or wait.
- `400` on `accounts:sendVerificationCode`: check phone format (E.164, e.g. `+8801XXXXXXXXX`) and recaptcha initialization.

Make sure your Verify page has an element with the recaptcha container id (e.g. `<div id="recaptcha-container" />`) before calling `RecaptchaVerifier`.

## Useful commands

- Install dependencies: `npm install` or `bun install`
- Start dev server: `npm run dev` or `bun dev`
- Build: `npm run build`
- Preview production build: `npm run preview`

## Deployment

Deploy to Vercel, Netlify or any static host that supports Vite. Set production `VITE_API_BASE_URL` and all `VITE_FIREBASE_*` variables in the hosting environment.

## Live URL

If you deploy, add the live URL here. Example:

```
Live: https://your-app.example.com
```

## Additional notes & next steps

- Add a `.env.example` listing the `VITE_` keys (without values) to help collaborators.
- Add an `auth` Redux slice (if not present) that stores tokens and user info and exposes `setCredentials`/`clearCredentials` actions.
- Implement `getMe` and `updateProfile` RTK Query endpoints to keep user data in sync.
- Add client-side route guards to enforce `isProfileComplete` before allowing transactions.
- Add file-size/type validation and URL cleanup for profile image previews to avoid memory leaks.

If you'd like, I can:
- Create a `.env.example` file
- Add a `RequireProfileComplete` route guard component
- Wire token-attaching logic in `src/lib/axios.ts` and `src/redux/axiosBaseQuery.ts`

---

If you want me to add the `.env.example` or implement any of the next steps directly in the repo, tell me which one and I'll make the changes.
