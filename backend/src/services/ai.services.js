const { GoogleGenerativeAI } = require("@google/generative-ai");
const NodeCache = require('node-cache');

// Initialize cache with 5 minutes TTL
const cache = new NodeCache({ stdTTL: 300 });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = 'gemini-1.5-flash';

// Debug: Log API key status
console.log('🔑 Gemini API Key Status:', GEMINI_API_KEY ? '✅ Configured' : '❌ Missing');

// Initialize Gemini Client
let model;
try {
  if (GEMINI_API_KEY) {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: {
        parts: [{ text: `You are Ankit Gupta's personal AI assistant. Respond directly and conversationally without any thinking tags, internal reasoning, or markdown formatting.

**IMPORTANT: Never include <think> tags or internal reasoning in your responses. Just provide a natural, conversational response.**

**Response Guidelines:**
- Speak in the first person as if you are Ankit Gupta
- Be direct, friendly, and professional
- Use "I" instead of "Ankit" when referring to yourself
- Be concise but conversational
- Use bullet points for organized information
- Emphasize key points using **bold text**
- End with a thoughtful question or call to action
- Keep paragraphs short and readable
- Never include thinking tags or internal reasoning

**Topics I Can Discuss:**
- My technical skills (MERN stack, Java DSA, AI/ML)
- Hackathon experiences and projects
- Educational background and achievements
- Professional goals and methodologies
- Personal interests and hobbies
- Problem-solving approaches
- Team collaboration experiences

**Example Response Style:**
"Hey! I'd love to share my experience with the MERN stack. I've been working with MongoDB, Express.js, React.js, and Node.js for several projects, including my portfolio and some hackathon projects.

**Key strengths** include building scalable applications and implementing real-time features. I particularly enjoy the flexibility that the MERN stack offers for full-stack development.

What specific aspect of my tech skills would you like to know more about?"` }]
      }
    });
    console.log(`✅ Gemini Model '${MODEL_NAME}' initialized`);
  }
} catch (error) {
  console.error('❌ Failed to initialize Gemini model:', error.message);
}

async function generateContent(prompt) {
  console.log('🚀 Starting AI content generation for prompt:', prompt.substring(0, 50) + '...');
  
  // Check cache first
  const cacheKey = prompt.trim().toLowerCase();
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    console.log('✅ Returning cached response');
    return cachedResponse;
  }

  try {
    if (!model) {
      // Try to re-initialize if key was added later (unlikely but safe)
      if (process.env.GEMINI_API_KEY) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        model = genAI.getGenerativeModel({ model: MODEL_NAME }); // Re-init without system prompt for simplicity if lazy loading, but ideally init top level
      } else {
         throw new Error('GEMINI_API_KEY is not configured');
      }
    }

    console.log('📡 Making request to Gemini API via SDK...');
    
    // Config for generation
    const generationConfig = {
      temperature: 0.7,
      maxOutputTokens: 2048,
    };

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    const aiText = response.text();
    
    console.log('✅ Generated AI text length:', aiText.length);
    
    // Validate the response
    if (!aiText || aiText.trim().length === 0) {
      console.error('❌ Empty response from Gemini API');
      throw new Error('Empty response from Gemini API');
    }
    
    // Cache the response
    cache.set(cacheKey, aiText);
    console.log('💾 Response cached successfully');
    return aiText;

  } catch (error) {
    console.error('❌ Error generating content (Detailed):');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response StatusText:', error.response.statusText);
        // Try to read body if possible (for fetch errors)
        try {
            const body = await error.response.json();
             console.error('Response Body:', JSON.stringify(body, null, 2));
        } catch (e) { /* ignore */ }
    }
    console.error('Full Error JSON:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    // Provide user-friendly error messages based on SDK errors
    if (error.message.includes('API key not valid')) {
       throw new Error('Invalid Gemini API Key. Please check your .env file.');
    } else if (error.message.includes('429')) {
       throw new Error('Rate limit exceeded. Please try again later.');
    } else if (error.message.includes('500') || error.message.includes('503')) {
       throw new Error('Gemini service is valid but temporarily unavailable. Try again.');
    } else if (error.message ===('GEMINI_API_KEY is not configured')) {
       throw new Error('Gemini API key is not configured.');
    }
    
    throw new Error('Failed to generate response. Please try again later.');
  }
}

module.exports = generateContent;

