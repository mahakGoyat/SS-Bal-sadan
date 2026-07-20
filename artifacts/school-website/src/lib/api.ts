/**
 * Base URL for all API requests.
 *
 * - Local dev (Replit): empty string → Vite proxy forwards /api/* to the API server
 * - Production (Vercel): set VITE_API_URL to your Render backend URL
 *   e.g. https://your-backend.onrender.com
 */
export const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
