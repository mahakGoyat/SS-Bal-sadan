---
name: Gmail SMTP blocked on Replit
description: Gmail SMTP (ports 465 and 587) auth fails from Replit because Replit runs on GCP and Google blocks SMTP from its own cloud IP range as anti-spam.
---

Gmail SMTP authentication consistently fails with 535 "Username and Password not accepted" from Replit, even with valid App Passwords and 2FA enabled on the account.

**Why:** Replit runs on GCP (IP range 34.x.x.x). Google blocks SMTP auth from GCP IPs to prevent spam. The TLS handshake succeeds but AUTH always fails. This is a network/policy block, not a credentials problem.

**How to apply:** Whenever a school-website or similar project needs to send email from the API server, do NOT use Gmail SMTP. Use an HTTP-based email service instead (Resend, SendGrid, etc.) — these are not affected by SMTP IP blocks. If the user insists on Gmail, they would need to set up Gmail API with OAuth2 (complex, requires refresh token flow).
