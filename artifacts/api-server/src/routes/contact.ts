import { Router } from "express";
import { logger } from "../lib/logger";

async function sendBrevoEmail(subject: string, htmlContent: string): Promise<void> {
  const apiKey = process.env["BREVO_API_KEY"];
  const toEmail = process.env["SCHOOL_EMAIL"];
  if (!apiKey || !toEmail) throw new Error("BREVO_API_KEY or SCHOOL_EMAIL not set");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "SS Bal Sadan School Website", email: toEmail },
      to: [{ email: toEmail }],
      subject,
      htmlContent,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo error ${res.status}: ${body}`);
  }
}

/** Escape HTML special chars to prevent injection in the email body. */
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SUBJECTS = new Set([
  "Admission Enquiry",
  "Fee Related",
  "Academic Query",
  "General Information",
  "Complaint",
  "Feedback",
  "Other",
]);

const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
  const { name, email, phone, subject, inquiry, message } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    inquiry?: string;
    message?: string;
  };

  // Validate required fields
  if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
    res.status(400).json({ ok: false, error: "Please enter a valid name." });
    return;
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200) {
    res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    return;
  }
  if (!message || typeof message !== "string" || message.trim().length < 5 || message.length > 5000) {
    res.status(400).json({ ok: false, error: "Message must be between 5 and 5000 characters." });
    return;
  }
  if (subject && !ALLOWED_SUBJECTS.has(subject)) {
    res.status(400).json({ ok: false, error: "Invalid subject selected." });
    return;
  }
  if (phone !== undefined && phone !== null && (typeof phone !== "string" || phone.length > 20)) {
    res.status(400).json({ ok: false, error: "Please enter a valid phone number." });
    return;
  }
  // Reject CR/LF in header-bound fields to prevent header injection
  const CRLF_RE = /[\r\n]/;
  if (CRLF_RE.test(name) || CRLF_RE.test(email) || (subject && CRLF_RE.test(subject))) {
    res.status(400).json({ ok: false, error: "Invalid characters in input." });
    return;
  }

  const safeName = esc(name.trim());
  const safeEmail = esc(email.trim());
  const safePhone = phone ? esc(phone.trim()) : "";
  const safeSubject = subject ? esc(subject) : "";
  const safeMessage = esc(message.trim());

  // Always persist the submission first — so no data is ever lost
  const submission = {
    id: Date.now(),
    receivedAt: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() ?? "",
    subject: subject ?? "",
    message: message.trim(),
    emailSent: false,
  };

  try {
    const { readFileSync, writeFileSync, existsSync } = await import("node:fs");
    const dataPath = "/tmp/contact-submissions.json";
    const existing: typeof submission[] = existsSync(dataPath)
      ? (JSON.parse(readFileSync(dataPath, "utf8")) as typeof submission[])
      : [];
    existing.push(submission);
    writeFileSync(dataPath, JSON.stringify(existing, null, 2));
    logger.info({ name: name.trim(), subject }, "Contact submission saved");
  } catch (fsErr) {
    logger.warn({ fsErr }, "Could not persist submission to file");
  }

  // Send via Brevo
  try {
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#111111;padding:24px;text-align:center">
          <h2 style="color:#ffffff;margin:0;font-size:20px">SS Bal Sadan School</h2>
          <p style="color:#9ca3af;margin:4px 0 0;font-size:13px">New Contact Form Submission</p>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;width:130px;font-weight:600">Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111111">${safeName}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;font-weight:600">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111111"><a href="mailto:${safeEmail}" style="color:#2563eb">${safeEmail}</a></td></tr>
            ${safePhone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;font-weight:600">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111111">${safePhone}</td></tr>` : ""}
            ${safeSubject ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;font-weight:600">Subject</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111111">${safeSubject}</td></tr>` : ""}
          </table>
          <div style="margin-top:24px">
            <p style="font-size:13px;color:#6b7280;font-weight:600;margin-bottom:8px">Message</p>
            <div style="background:#f9fafb;border-radius:8px;padding:16px;font-size:14px;color:#374151;white-space:pre-wrap;line-height:1.6">${safeMessage}</div>
          </div>
        </div>
        <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af">
          Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </div>
      </div>`;
    await sendBrevoEmail(`[Contact Form] ${safeSubject || "New Message"} — ${safeName}`, html);
    logger.info({ from: email, subject }, "Contact form email sent via Brevo");
  } catch (err) {
    logger.warn({ err }, "Brevo send failed — submission saved to file");
  }

  res.json({ ok: true, message: "Message received! We will get back to you within 24 hours." });
});

/** Admin endpoint: view saved submissions — development only, never exposed in production */
if (process.env["NODE_ENV"] !== "production") {
  contactRouter.get("/contact/submissions", async (_req, res) => {
    try {
      const { readFileSync, existsSync } = await import("node:fs");
      const dataPath = "/tmp/contact-submissions.json";
      if (!existsSync(dataPath)) {
        res.json({ ok: true, count: 0, submissions: [] });
        return;
      }
      const data = JSON.parse(readFileSync(dataPath, "utf8")) as unknown[];
      res.json({ ok: true, count: data.length, submissions: data });
    } catch (err) {
      res.status(500).json({ ok: false, error: "Could not read submissions." });
    }
  });
}

export default contactRouter;
