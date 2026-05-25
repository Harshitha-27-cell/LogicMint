import exp from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const aiApp = exp.Router();

const PLATFORM_FAQ = [
  {
    keywords: ["practice", "problem", "solve"],
    answer:
      "Go to Practice, pick a language course, open a problem, write code in the editor, and click Run or Submit. Submissions are judged via Judge0 against visible and hidden test cases."
  },
  {
    keywords: ["contest", "compete"],
    answer:
      "Visit Contest from the navbar to see live contests. Click Enter Contest to solve problems within the time limit. Admins create contests from Conduct Contest."
  },
  {
    keywords: ["compiler", "run code"],
    answer:
      "Use the Compiler page to write code in C, C++, Java, Python, or JavaScript and run it instantly without a specific problem."
  },
  {
    keywords: ["leaderboard", "rank"],
    answer:
      "The Leaderboard page shows global rankings based on solved problems. Contest leaderboards appear inside each contest room."
  },
  {
    keywords: ["login", "register", "password"],
    answer:
      "Register at Signup, login at Login. Use Forgot Password if you need to reset. Tokens refresh automatically while you stay logged in."
  }
];

function findFaqAnswer(message) {
  const lower = message.toLowerCase();
  for (const faq of PLATFORM_FAQ) {
    if (faq.keywords.some((k) => lower.includes(k))) return faq.answer;
  }
  return null;
}

/** POST /ai-api/chat — platform assistant */
aiApp.post("/chat", verifyToken, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).send({ message: "Message required" });
    }

    const faq = findFaqAnswer(message);
    if (faq) {
      return res.send({ reply: faq, source: "platform" });
    }

    if (process.env.OPENAI_API_KEY) {
      const axios = (await import("axios")).default;
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are LogicMint assistant for a competitive coding platform. Help with DSA, platform usage, and coding doubts. Be concise."
            },
            { role: "user", content: message }
          ],
          max_tokens: 500
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
      const reply =
        response.data.choices?.[0]?.message?.content ||
        "I could not generate a response.";
      return res.send({ reply, source: "openai" });
    }

    res.send({
      reply:
        "I'm your LogicMint assistant! Ask about practice problems, contests, compiler, leaderboard, or coding concepts. For advanced AI replies, set OPENAI_API_KEY on the server.",
      source: "fallback"
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      reply: "Sorry, I had trouble answering. Try rephrasing your question."
    });
  }
});

export { aiApp };
