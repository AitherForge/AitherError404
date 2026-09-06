# AitherError404

Aither's branded 404 page with a protected admin entry point.

## Features

- Clean, responsive Aither 404 experience
- GitHub Pages compatible
- Hidden corner-and-logo admin unlock gesture
- Backend-enforced admin authentication
- Responsive Aither Admin dashboard
- Live account, session, application, and telemetry overview
- Activity and account search/filtering
- Manual refresh and optional 15-second auto-refresh
- JSON export of the currently loaded admin data
- Mobile-friendly controls and dark-mode support
- Admin pages marked `noindex`, `nofollow`, and `noarchive`

## Admin flow

The public 404 page contains the hidden unlock gesture. After it is completed, the browser is sent to `/admin/`. The admin page then authenticates against the Aither backend and verifies admin access before opening the dashboard.

The browser-side unlock is only a navigation gate. **It is not the security boundary.** The backend must continue to enforce authentication and authorization for every `/api/admin/*` endpoint.

## Backend

The admin UI currently uses the Aither backend at:

`https://aitherbackend.onrender.com`

Used endpoints:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/admin/overview`
- `GET /api/admin/activity?limit=150`
- `GET /api/admin/users`

## GitHub Pages

This repository is designed to run as a static GitHub Pages site. No private credentials, API keys, passwords, or session tokens should be committed to this repository.

## Admin features

The dashboard includes:

- Account totals
- Verified-account totals
- Active-session totals
- Recent event totals
- Per-app telemetry activity
- Live activity feed
- Account list
- Activity filtering
- Account search
- JSON export
- Manual refresh
- Optional automatic refresh
- Sign out

Sensitive credentials and session tokens are intentionally not displayed by the dashboard.
