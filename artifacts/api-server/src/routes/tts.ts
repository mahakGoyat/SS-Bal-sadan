import { Router } from "express";
import { logger } from "../lib/logger";

const ttsRouter = Router();

const CARTESIA_VOICE_ID = "faf0731e-dfb9-4cfc-8119-259a79b27e12";

ttsRouter.post("/tts", async (req, res) => {
  const { text } = req.body as { text?: unknown };

  if (typeof text !== "string" || text.trim().length === 0) {
    return void res.status(400).json({ ok: false, error: "text is required." });
  }

  if (text.length > 2000) {
    return void res.status(400).json({ ok: false, error: "text is too long." });
  }

  const apiKey = process.env["CARTESIA_API_KEY"];
  if (!apiKey) {
    logger.error("CARTESIA_API_KEY not set");
    return void res.status(500).json({ ok: false, error: "Voice reply is not configured." });
  }

  try {
    const cartesiaRes = await fetch("https://api.cartesia.ai/tts/bytes", {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "Cartesia-Version": "2024-11-13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_id: "sonic-2",
        transcript: text,
        voice: {
          mode: "id",
          id: CARTESIA_VOICE_ID,
        },
        output_format: {
          container: "mp3",
          bit_rate: 128000,
          sample_rate: 44100,
        },
        language: "en",
      }),
    });

    if (!cartesiaRes.ok) {
      const errBody = await cartesiaRes.text();
      logger.error({ status: cartesiaRes.status, errBody }, "Cartesia TTS error");
      return void res.status(502).json({ ok: false, error: "Voice service failed. Please try again." });
    }

    const audioBuffer = Buffer.from(await cartesiaRes.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", audioBuffer.length.toString());
    res.send(audioBuffer);
  } catch (err) {
    logger.error({ err }, "TTS request error");
    res.status(500).json({ ok: false, error: "Something went wrong generating voice reply." });
  }
});

export default ttsRouter;
