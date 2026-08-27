# MERN Auth Frontend

A React interface for a full authentication system — signup with OTP verification, login, a protected dashboard, and a self-service password reset flow. Built to pair with a Node/Express/MongoDB backend.

**Live app:** https://mern-auth-frontend-chi.vercel.app/
**Backend repo:** [MERN-Auth-Backend](#)

## What This Covers

- A signup flow that only allows access to the OTP verification screen after a signup request has actually been made, tracked through a locally persisted email reference rather than relying on the URL alone.
- Route protection for both the OTP step and the dashboard: visiting either directly without completing the prior step redirects back to where the flow should have started.
- A three-step forgot-password flow (email, OTP, new password) handled within a single component, with each step gated behind the previous one being completed on the backend.
- Session handling via a JWT stored on login, attached to authenticated requests, and cleared on logout.
- Loading and error states across every request — no screen is left in an ambiguous state while waiting on the network.

## Tech Stack

- React (Vite)
- React Router
- Fetch API for backend communication

## Running Locally

```bash
git clone <this-repo-url>
cd mern-auth-frontend
npm install
```

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

This project expects the [backend](#) to be running and reachable at the URL configured above.

## Project Structure

```
src/
 ├── pages/          Signup, OTP verification, Login, Dashboard, Forgot Password
 ├── components/     Shared UI components
 └── App.jsx         Route definitions and protected route logic
```

## Author

Ayaan Waheed — [GitHub](https://github.com/awanayaan97-maker)
