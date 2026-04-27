const { generateContent } = require('../services/ai.services');

module.exports.getResponse = async (req, res) => {
    try {
        const prompt = req.body.prompt;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await generateContent(prompt);
        res.json({ response });
    } catch (error) {
        console.error('Error in AI controller:', error);
        res.status(500).json({ error: "I'm sorry, I couldn't process that query. Could we focus on topics related to Ankit's professional work, skills, and projects?" });
    }
};