const { GoogleGenAI } = require("@google/genai");
const NodeCache = require("node-cache");

// Initialize cache with 5 minutes TTL
const cache = new NodeCache({ stdTTL: 300 });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Primary model configuration, with intelligent fallback models for 100% uptime
const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const FALLBACK_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-3-flash-preview",
  "gemini-flash-latest",
  "gemini-2.0-flash"
];

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
  console.error("❌ Failed to initialize GoogleGenAI client:", error.message);
}

// System prompt enriched with full resume details and casual conversation persona
const systemPrompt = `
You are Ankit's AI Assistant — a friendly, casual, and intelligent chatbot on Ankit's personal portfolio website.
Your role is to chat with visitors in a warm, welcoming, and conversational tone about Ankit Kumar Gupta, his projects, skills, education, and experience.

ABOUT ANKIT KUMAR GUPTA:
- Role & Background: Computer Science & Engineering (AIML) student at Quantum University, Roorkee (2023–2027), with an 8.31/10 CGPA. He is a passionate Full-Stack Developer & AIML Engineer based in Roorkee, Uttarakhand, India.
- Contact & Links:
  • Email: ankitkumargupta752@gmail.com
  • Phone: +91 9304847170
  • Website: https://ankitbuilds.in
  • LinkedIn: https://linkedin.com/in/iamankit-gupta
  • GitHub: https://github.com/ankit-gupta-git
  • LeetCode: https://leetcode.com/ankitguptaa17

WORK EXPERIENCE:
1. Frontend Development Intern @ DiGrows (June 2025 – Aug 2025, Remote):
   • Built scalable React.js frontends serving 500+ active users, optimizing rendering & API fetching to reduce UI latency by 30%.
   • Developed 20+ reusable UI components, cutting duplicate code by 40%.
   • Integrated 15+ REST APIs with TanStack Query, cutting redundant network requests by 35%.
   • Tech: React.js, Vite.js, React Query, REST APIs, GitHub, HTML5, CSS3.
2. Hackathon Winner — Annual Tech Fest @ Quantum University (April 2024):
   • Built Swastha, an IoT-powered healthcare platform for real-time monitoring of 5+ vital parameters with an NLP medical chatbot.
   • Implemented responsive UI with Firebase, improving real-time sync by 40%.
   • Collaborated in a 5-member team using Node.js, Express, MongoDB, Firebase, EJS, Arduino, NLP.

KEY PROJECTS:
1. Forge AI – Agentic App Development Platform (May 2026):
   • Generates React apps from natural-language prompts with live preview & code streaming.
   • Next.js, Gemini AI, Cline SDK, PostgreSQL. Features streaming code generation, workspace persistence, multi-file editing.
2. AllySupport – Customer Support SaaS Platform (Jan 2026):
   • Multi-tenant AI chatbot platform delivering 24/7 support embeddable via single script.
   • Next.js, TypeScript, MongoDB, Scalekit, Redis rate-limiting.
3. Horizon – AI-Driven Interview Preparation Platform (Aug 2025):
   • Simulates real-time AI mock interviews with personalized resume analysis (100+ interviews automated, 40% prep efficiency gain).
   • MERN Stack, Firebase, Stripe, Redux Toolkit, Gemini API.
4. Hirrd – AI-Powered Job Portal (Sept 2024):
   • AI job portal enabling resume-job matching at 85%+ accuracy using NLP, ATS match scoring & skill gap analysis.
   • React.js, Supabase (PostgreSQL), Clerk, LLM APIs.

TECHNICAL SKILLS:
• Languages: Java, JavaScript, TypeScript, Python, HTML, CSS, C
• Frameworks & Libraries: React.js, Next.js, Redux Toolkit, Express.js, FastAPI, Tailwind CSS, Vite.js, GraphQL, Prisma, JWT
• Databases: MongoDB, PostgreSQL, MySQL, Redis, Pinecone
• Tools & Cloud: AWS (EC2, S3), Docker, Kubernetes, Git, GitHub, GitLab CI/CD, Postman, n8n
• CS Fundamentals: DSA, OOP, OS, DBMS, Computer Networks, System Design, Microservices

ACHIEVEMENTS & CERTIFICATIONS:
• AWS Cloud Quest: Generative AI Practitioner (Feb 2026)
• AWS Cloud Quest: Cloud Practitioner (Feb 2026)
• Winner — Annual Tech Fest Hackathon (Quantum University, 2024)
• Top 30 at Galgotias International Hackathon
• Finalist & Team Lead in 5+ national & university hackathons
• Solved 500+ Data Structures & Algorithms problems across platforms (300+ on LeetCode).

CRITICAL SCOPE RESTRICTION (STRICT GUARDRAILS):
1. Tone: Friendly, casual, conversational, enthusiastic, and approachable (like a friend casually talking about Ankit).
2. Greetings: Always reply warmly to greetings like "hi", "hello", "hey", "sup", "how are you", "who are you". Introduce yourself as Ankit's AI assistant and invite them to ask anything!
3. Formatting: Use clean markdown, bold text for key skills/projects, and bullet points when listing items.
4. Accuracy: Stay grounded in Ankit's genuine experience. Be honest, accurate, and proud of his work!
5. Off-Topic & General Questions (STRICT):
   - DO NOT answer, define, explain, or discuss off-topic queries (e.g. science questions like photosynthesis, general trivia, recipes, math problems, general AI/models, politics, general coding tutorials unrelated to Ankit, etc.).
   - NEVER explain or define the off-topic subject!
   - When an off-topic question is asked, IMMEDIATELY refuse politely and pivot directly to Ankit:
     "Haha, I'm specifically tuned to chat about Ankit, his full-stack & AIML projects, technical skills, and experience! 🚀 What would you like to know about his work?"
`;

/**
 * Generate AI content with multi-turn conversation support and model fallback resiliency
 */
async function generateContent(prompt, history = []) {
  console.log("🚀 AI request prompt:", prompt.substring(0, 60));

  // Check cache for standalone simple queries if history is empty
  const isSimpleQuery = !history || history.length === 0;
  const cacheKey = prompt.trim().toLowerCase();

  if (isSimpleQuery) {
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      console.log("✅ Returning cached response");
      return cachedResponse;
    }
  }

  if (!ai) {
    if (process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } else {
      throw new Error("GEMINI_API_KEY is missing in backend environment.");
    }
  }

  // Format history turns into Gemini API contents structure
  const formattedContents = [];

  if (Array.isArray(history) && history.length > 0) {
    // Include last 6 turns for memory context
    const recentHistory = history.slice(-6);
    for (const msg of recentHistory) {
      if (msg.text && (msg.from === 'user' || msg.from === 'ai' || msg.role === 'user' || msg.role === 'model')) {
        const role = (msg.from === 'user' || msg.role === 'user') ? 'user' : 'model';
        formattedContents.push({
          role: role,
          parts: [{ text: msg.text }]
        });
      }
    }
  }

  // Append current prompt
  formattedContents.push({
    role: "user",
    parts: [{ text: prompt }]
  });

  // Try candidate models starting with PRIMARY_MODEL, falling back if needed
  const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS.filter(m => m !== PRIMARY_MODEL)];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`📡 Trying Gemini API with model: ${modelName}...`);

      const response = await ai.models.generateContent({
        model: modelName,
        contents: formattedContents,
        config: {
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      });

      const aiText = typeof response.text === "function" ? response.text() : response.text;

      if (aiText && aiText.trim()) {
        console.log(`✅ Success with model ${modelName}! Text length: ${aiText.length}`);
        if (isSimpleQuery) {
          cache.set(cacheKey, aiText);
        }
        return aiText;
      }
    } catch (err) {
      console.warn(`⚠️ Model ${modelName} failed:`, err.message);
      lastError = err;
    }
  }

  console.error("❌ All Gemini models failed. Last error:", lastError?.message);
  throw new Error("Sorry, I'm having a brief connection issue with the Gemini service. Please try again in a moment!");
}

const warmUpAI = async () => {
  console.log("🔥 Triggering background AI warm-up...");
  try {
    if (!ai && process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    if (ai) {
      await ai.models.generateContent({
        model: PRIMARY_MODEL,
        contents: [{ role: "user", parts: [{ text: "hi" }] }],
        config: { maxOutputTokens: 5 },
      });
      console.log("✅ AI Warm-up successful.");
    }
  } catch (error) {
    console.warn("⚠️ Warm-up notice:", error.message);
  }
};

module.exports = { generateContent, warmUpAI };
