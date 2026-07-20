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

const admissionRouter = Router();

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const CRLF_RE = /[\r\n]/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PINCODE_RE = /^\d{6}$/;
const ALLOWED_GENDERS = new Set(["Male", "Female", "Other"]);
const ALLOWED_CLASSES = new Set([
  "Nursery", "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12",
]);

admissionRouter.post("/admission", async (req, res) => {
  const {
    studentName, gender, classApplying,
    fatherName, mobile, district, pincode,
  } = req.body as Record<string, unknown>;

  // Validate
  if (!studentName || typeof studentName !== "string" || studentName.trim().length < 3 || studentName.length > 100)
    return void res.status(400).json({ ok: false, error: "Valid student name required (min 3 characters)." });

  if (!gender || typeof gender !== "string" || !ALLOWED_GENDERS.has(gender))
    return void res.status(400).json({ ok: false, error: "Please select a valid gender." });

  if (!classApplying || typeof classApplying !== "string" || !ALLOWED_CLASSES.has(classApplying))
    return void res.status(400).json({ ok: false, error: "Please select a valid class." });

  if (!fatherName || typeof fatherName !== "string" || fatherName.trim().length < 2 || fatherName.length > 100)
    return void res.status(400).json({ ok: false, error: "Father's name is required." });

  if (!mobile || typeof mobile !== "string" || !MOBILE_RE.test(mobile.replace(/\s/g, "")))
    return void res.status(400).json({ ok: false, error: "Valid 10-digit Indian mobile number required." });

  if (!district || typeof district !== "string" || district.trim().length < 2 || district.length > 100)
    return void res.status(400).json({ ok: false, error: "District is required." });

  if (!pincode || typeof pincode !== "string" || !PINCODE_RE.test(pincode))
    return void res.status(400).json({ ok: false, error: "Valid 6-digit pincode is required." });

  // Header injection guard
  if (CRLF_RE.test(studentName))
    return void res.status(400).json({ ok: false, error: "Invalid characters in input." });

  // Escape for HTML email
  const s = {
    studentName: esc(String(studentName).trim()),
    gender: esc(String(gender)),
    classApplying: esc(String(classApplying)),
    fatherName: esc(String(fatherName).trim()),
    mobile: esc(String(mobile).trim()),
    district: esc(String(district).trim()),
    pincode: esc(String(pincode).trim()),
  };

  // Save submission first — no data loss even if email fails
  const submission = {
    id: Date.now(),
    receivedAt: new Date().toISOString(),
    ...s,
    emailSent: false,
  };
  try {
    const { readFileSync, writeFileSync, existsSync } = await import("node:fs");
    const dataPath = "/tmp/admission-submissions.json";
    const existing = existsSync(dataPath)
      ? (JSON.parse(readFileSync(dataPath, "utf8")) as typeof submission[])
      : [];
    existing.push(submission);
    writeFileSync(dataPath, JSON.stringify(existing, null, 2));
  } catch (fsErr) {
    logger.warn({ fsErr }, "Could not persist admission submission to file");
  }

  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;width:160px;font-weight:600;vertical-align:top">${label}</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111111">${value}</td></tr>`
      : "";

  // Send via Brevo
  try {
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
        <div style="background:#111111;padding:24px;text-align:center">
          <h2 style="color:#ffffff;margin:0;font-size:20px">SS Bal Sadan School</h2>
          <p style="color:#9ca3af;margin:4px 0 0;font-size:13px">New Admission Application</p>
        </div>
        <div style="padding:32px">
          <p style="font-size:13px;color:#6b7280;font-weight:600;margin:0 0 12px;text-transform:uppercase;letter-spacing:.05em">Student Details</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${row("Student Name", s.studentName)}
            ${row("Gender", s.gender)}
            ${row("Class Applying For", s.classApplying)}
          </table>
          <p style="font-size:13px;color:#6b7280;font-weight:600;margin:0 0 12px;text-transform:uppercase;letter-spacing:.05em">Parent / Guardian</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${row("Father's Name", s.fatherName)}
            ${row("Mobile Number", s.mobile)}
          </table>
          <p style="font-size:13px;color:#6b7280;font-weight:600;margin:0 0 12px;text-transform:uppercase;letter-spacing:.05em">Location</p>
          <table style="width:100%;border-collapse:collapse">
            ${row("District", s.district)}
            ${row("Pincode", s.pincode)}
          </table>
        </div>
        <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af">
          Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </div>
      </div>`;
    await sendBrevoEmail(`[Admission Form] ${s.studentName} — ${s.classApplying}`, html);
    logger.info({ student: s.studentName, class: s.classApplying }, "Admission form email sent via Brevo");
  } catch (err) {
    logger.warn({ err }, "Brevo send failed — submission saved to file");
  }

  res.json({ ok: true, message: "Application received! We will contact you soon." });
});

export default admissionRouter;
