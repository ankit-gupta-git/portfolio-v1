const { GoogleGenAI } = require("@google/genai");
const NodeCache = require("node-cache");

// Initialize cache with 5 minutes TTL
const cache = new NodeCache({ stdTTL: 300 });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Model EXACTLY as per docs
const MODEL = "gemini-3-flash-preview";

// Debug: Log API key status
console.log(
  "🔑 Gemini API Key Status:",
  GEMINI_API_KEY ? "✅ Configured" : "❌ Missing"
);

let ai;
try {
  if (GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    console.log("✅ GoogleGenAI client initialized");
  }
} catch (error) {
  console.error(
    "❌ Failed to initialize GoogleGenAI client:",
    error.message
  );
}

// System prompt (docs-style)
const systemPrompt = `
You are Ankit Gupta's personal AI assistant.
Respond directly and conversationally.
Never include <think> tags or internal reasoning.
Be concise and professional.
`;

async function generateContent(prompt) {
  console.log(
    "🚀 Starting AI content generation for prompt:",
    prompt.substring(0, 50) + "..."
  );

  // Check cache first
  const cacheKey = prompt.trim().toLowerCase();
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    console.log("✅ Returning cached response");
    return cachedResponse;
  }

  try {
    if (!ai) {
      if (process.env.GEMINI_API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      } else {
        throw new Error("GEMINI_API_KEY is not configured");
      }
    }

    console.log("📡 Making request to Gemini API...");
    console.log("Using model:", MODEL);

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const aiText =
      typeof response.text === "function"
        ? response.text()
        : response.text;

    console.log("✅ Generated AI text length:", aiText?.length || 0);

    if (!aiText || !aiText.trim()) {
      throw new Error("Empty response from Gemini API");
    }

    // Cache response
    cache.set(cacheKey, aiText);
    console.log("💾 Response cached successfully");

    return aiText;
  } catch (error) {
    console.error("❌ Error generating content:");
    console.error(error.message);
    throw new Error("Failed to generate response. Please try again later.");
  }
}

module.exports = generateContent;
