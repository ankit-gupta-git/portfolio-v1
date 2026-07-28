const { generateContent } = require('../services/ai.services');

module.exports.getResponse = async (req, res) => {
    try {
        const { prompt, history } = req.body;

        if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
            return res.status(400).json({ error: "Prompt string is required" });
        }

        const response = await generateContent(prompt, history || []);
        res.json({ response });
    } catch (error) {
        console.error('Error in AI controller:', error.message);
        res.status(500).json({ 
            error: error.message || "Hey! I'm having a quick connection issue with Gemini API right now. Please try again in a few seconds!" 
        });
    }
};