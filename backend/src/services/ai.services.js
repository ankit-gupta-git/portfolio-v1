const axios = require('axios');
const NodeCache = require('node-cache');

// Initialize cache with 5 minutes TTL
const cache = new NodeCache({ stdTTL: 300 });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-1.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// Debug: Log API key status (without exposing the key)
console.log('🔑 Gemini API Key Status:', GEMINI_API_KEY ? '✅ Configured' : '❌ Missing');

const systemPrompt = `You are Ankit Gupta's personal AI assistant. Respond directly and conversationally without any thinking tags, internal reasoning, or markdown formatting.

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

What specific aspect of my tech skills would you like to know more about?"

Just provide a natural, conversational response without any thinking tags or internal reasoning.`;

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
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY is not configured');
      throw new Error('GEMINI_API_KEY is not configured');
    }

    console.log('📡 Making request to Gemini API...');
    
    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    };

    console.log('📤 Request URL:', API_URL.replace(GEMINI_API_KEY, 'HIDDEN_KEY'));
    console.log('📤 Request Model:', MODEL);
    
    // Note: API key is in the URL, so no auth header needed for this endpoint style
    const response = await axios.post(
      API_URL,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    );
    
    console.log('📥 Response Status:', response.status);
    
    // Check if response has the expected structure
    // Gemini response structure: candidates[0].content.parts[0].text
    if (!response.data.candidates || !response.data.candidates[0] ||
        !response.data.candidates[0].content || 
        !response.data.candidates[0].content.parts || 
        !response.data.candidates[0].content.parts[0].text) {
          
      console.error('❌ Unexpected response structure:', JSON.stringify(response.data, null, 2));
      throw new Error('Invalid response structure from Gemini API');
    }
    
    const aiText = response.data.candidates[0].content.parts[0].text;
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
    console.error('❌ Error generating content:');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    
    if (error.response) {
       console.error('Error response status:', error.response.status);
       console.error('Error response data:', JSON.stringify(error.response.data, null, 2));
    }
    
    // Provide more specific error messages
    if (error?.response?.status === 400) {
      throw new Error('Invalid request to Gemini API. Please check your request format.');
    } else if (error?.response?.status === 401 || error?.response?.status === 403) {
      throw new Error('Unauthorized access to Gemini API. Please check your API key.');
    } else if (error?.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else if (error?.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else if (error?.message === 'GEMINI_API_KEY is not configured') {
      throw new Error('Gemini API key is not configured. Please check your environment variables.');
    }
    
    throw new Error('Failed to generate response. Please try again later.');
  }
}

module.exports = generateContent;