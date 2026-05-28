/**
 * Resolves OpenRouter/OpenAI API key from environment.
 * Handles common .env mistakes (duplicate key prefix).
 */
export function getAiApiKey() {
  let key =
    process.env.OPENROUTER_API_KEY ||
    process.env.OPENAI_API_KEY ||
    "";

  if (typeof key === "string" && key.includes("OPENROUTER_API_KEY=")) {
    key = key.split("OPENROUTER_API_KEY=").pop();
  }
  if (typeof key === "string" && key.includes("OPENAI_API_KEY=")) {
    key = key.split("OPENAI_API_KEY=").pop();
  }

  return (key || "").trim();
}
