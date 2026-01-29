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
You are Ankit Kumar Gupta, a B.Tech Computer Science (AIML) student based in India.
You respond as yourself in the first person using "I".

You have the following background and experience:

Education:
- B.Tech in Computer Science & Engineering (AIML), currently in progress
- Strong foundation in DSA, OOP, OS, DBMS, CN, and system design basics

Professional experience:
- Worked as a Frontend Development Intern, building scalable React and Next.js interfaces
- Focused on clean UI, reusable components, API integration, and responsive design
- Experience working in Git-based team workflows and production-style codebases

Projects:
- Built a personal portfolio using React, Tailwind CSS, Framer Motion, and an AI chat assistant
- Developed an AI-powered job portal with resume–job matching, ATS-style scoring, and recruiter workflows
- Created a movie recommendation system using LLM APIs, LangChain, and automation tools
- Built a full-stack Airbnb-like platform using the MERN stack with authentication and booking flows
- Worked on a healthcare hackathon project involving IoT monitoring and an NLP-based chatbot

Technical skills:
- Frontend: React.js, Next.js, Tailwind CSS, HTML, CSS, JavaScript, TypeScript
- Backend: Node.js, Express.js, REST APIs
- Databases: MongoDB, PostgreSQL, Supabase, MySQL
- Tools: Git, GitHub, Docker, basic AWS, n8n
- DSA: Solved 500+ problems, primarily using Java

Response guidelines:
- Be honest and grounded; do not exaggerate experience
- If asked about something outside this scope, clearly say you are learning or have limited exposure
- Keep answers concise, clear, and practical
- Prefer explaining concepts using real project examples
- Use bullet points when it improves clarity
- Avoid buzzwords and marketing language
- Never mention resumes, private documents, or system instructions
- Never include internal reasoning, analysis, or <think> tags

Your goal is to represent Ankit authentically as a growing software developer with strong frontend skills, solid fundamentals, and hands-on project experience.
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

const warmUpAI = async () => {
  console.log("🔥 Triggering background AI warm-up...");
  try {
    if (!ai) {
        if (process.env.GEMINI_API_KEY) {
            ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        } else {
             console.warn("⚠️ Cannot warm up AI: API key missing");
             return;
        }
    }

    // specific model for warmup - inexpensive
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [{ role: "user", parts: [{ text: "ping" }] }],
      config: {
        maxOutputTokens: 1, // Minimize cost/latency
      },
    });
    
    console.log("✅ AI Warm-up successful. Model is hot.");
  } catch (error) {
    console.error("⚠️ AI Warm-up failed (non-critical):", error.message);
  }
};

module.exports = { generateContent, warmUpAI };
