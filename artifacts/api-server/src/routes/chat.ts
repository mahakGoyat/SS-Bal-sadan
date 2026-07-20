import { Router } from "express";
import Groq from "groq-sdk";
import { logger } from "../lib/logger";

const chatRouter = Router();

const SYSTEM_PROMPT = `You are a friendly and helpful assistant for SS Bal Sadan School, located in Siwan village, Kaithal district, Haryana, India.

Key facts about the school:
- Full name: SS Bal Sadan School, Siwan, Kaithal, Haryana
- Established: 2003 by Shri Satpal Singh
- Students: 1,200+  |  Faculty: 45+  |  Campus: 5 acres
- Classes offered: Nursery, LKG, UKG, Class 1 to Class 12
- Medium of instruction: Hindi and English
- Contact email: mahakgoyat01@gmail.com
- Location: Village Siwan, Kaithal District, Haryana

Admissions:
- Open for Nursery to Class 12
- Apply online via the Admissions page on the website
- Required details: student name, DOB, gender, class applying for, parent names, mobile, address

Facilities:
- 20 smart classrooms with digital boards and projectors
- Science and computer labs
- Library
- Sports ground
- Wi-Fi campus

Your role:
- Answer questions about admissions, classes, facilities, fees, timings, and general school information
- Be warm, helpful, and professional
- Keep answers concise (2-4 sentences unless more detail is clearly needed)
- If you don't know something specific (like exact fee structure or exact timings), say so politely and suggest contacting the school directly at mahakgoyat01@gmail.com
- Always respond in the same language the user writes in (Hindi or English)
- Never make up specific numbers (fees, dates, etc.) you're not sure about`;

chatRouter.post("/chat", async (req, res) => {
  const { messages } = req.body as { messages?: unknown };

  if (!Array.isArray(messages) || messages.length === 0) {
    return void res.status(400).json({ ok: false, error: "messages array is required." });
  }

  if (messages.length > 40) {
    return void res.status(400).json({ ok: false, error: "Too many messages in conversation." });
  }

  // Validate each message — only user/assistant roles allowed, content must be string
  for (const msg of messages) {
    if (
      typeof msg !== "object" || msg === null ||
      !("role" in msg) || !("content" in msg) ||
      !["user", "assistant"].includes((msg as { role: string }).role) ||
      typeof (msg as { content: unknown }).content !== "string" ||
      ((msg as { content: string }).content).length > 2000
    ) {
      return void res.status(400).json({ ok: false, error: "Invalid message format." });
    }
  }

  // Security: enforce strict alternating user/assistant pattern.
  // This prevents clients from injecting fabricated assistant turns to steer the model.
  // Messages must start with "user" and alternate. Any out-of-order message is rejected.
  const typedMessages = messages as { role: "user" | "assistant"; content: string }[];
  if (typedMessages[0]?.role !== "user") {
    return void res.status(400).json({ ok: false, error: "First message must be from user." });
  }
  for (let i = 0; i < typedMessages.length; i++) {
    const expected = i % 2 === 0 ? "user" : "assistant";
    if (typedMessages[i].role !== expected) {
      return void res.status(400).json({ ok: false, error: "Messages must alternate user/assistant." });
    }
  }

  const apiKey = process.env["GROQ_API_KEY"];
  if (!apiKey) {
    logger.error("GROQ_API_KEY not set");
    return void res.status(500).json({ ok: false, error: "Chatbot is not configured." });
  }

  try {
    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...(messages as { role: "user" | "assistant"; content: string }[]),
      ],
      max_tokens: 512,
      temperature: 0.6,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    res.json({ ok: true, reply });
  } catch (err) {
    logger.error({ err }, "Groq chat error");
    res.status(500).json({ ok: false, error: "Something went wrong. Please try again." });
  }
});

export default chatRouter;
