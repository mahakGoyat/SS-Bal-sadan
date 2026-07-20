---
name: Contact form submissions fallback
description: When email fails, contact submissions are saved to /tmp/contact-submissions.json; the view endpoint is gated to NODE_ENV !== production.
---

The contact route in `artifacts/api-server/src/routes/contact.ts` always persists submissions to `/tmp/contact-submissions.json` before attempting email. If email fails, it still returns `ok: true` with a "we'll get back to you" message.

**Why:** /tmp is not durable across container restarts, but it prevents data loss during a single session. The design accepts this trade-off until a database is added.

**How to apply:** The `GET /api/contact/submissions` endpoint is dev-only (wrapped in `if (process.env.NODE_ENV !== 'production')`). In production, this route does not exist. If durable storage is needed, replace /tmp with a proper DB table.
