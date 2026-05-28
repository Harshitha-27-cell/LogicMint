import exp from "express";
import OpenAI from "openai";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getAiApiKey } from "../utils/getApiKey.js";

const aiApp = exp.Router();

/** Build OpenRouter client when API key is configured */
function createAiClient() {
  const apiKey = getAiApiKey();
  if (!apiKey) return null;

  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey
  });
}

/**
 * POST /ai-api/chat
 * Dynamic AI replies for any user question (coding, DSA, platform help).
 */
aiApp.post("/chat", verifyToken, async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message?.trim()) {
      return res.status(400).send({ message: "Message required" });
    }

    const client = createAiClient();

    if (!client) {
      return res.status(503).send({
        reply:
          "AI is not configured. Add OPENROUTER_API_KEY or OPENAI_API_KEY to Backend/.env and restart the server.",
        source: "error"
      });
    }

    const messages = [
      {
        role: "system",
        content: `You are LogicMint AI — a friendly expert assistant for a competitive coding platform (like CodeChef).
Help with: DSA, algorithms, debugging, language syntax (C, C++, Java, Python, JavaScript), practice problems, contests, compiler usage, leaderboard, and platform navigation.
Give clear, accurate, concise answers. Use examples when helpful. If unsure, say so honestly.`
      },
      ...history.slice(-8).map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content
      })),
      { role: "user", content: message.trim() }
    ];

    const response = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages,
      max_tokens: 800,
      temperature: 0.7
    });

    const reply =
      response.choices?.[0]?.message?.content?.trim() ||
      "I could not generate a response. Please try again.";

    res.send({ reply, source: "openrouter" });
  } catch (err) {
    console.error("AI chat error:", err?.message || err);
    res.status(500).send({
      reply: `AI error: ${err?.message || "Unable to reach model"}. Check OPENROUTER_API_KEY in .env.`,
      source: "error"
    });
  }
});

export { aiApp };
