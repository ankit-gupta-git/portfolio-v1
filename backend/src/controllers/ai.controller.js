const aiService = require('../services/ai.services');

module.exports.getResponse = async (req, res) => {
    try {
        console.log('📨 AI Controller: Received request');
        console.log('📨 AI Controller: Request headers:', req.headers);
        console.log('📨 AI Controller: Request body:', req.body);
        
        const prompt = req.body.prompt;

        if (!prompt) {
            console.log('❌ AI Controller: No prompt provided');
            return res.status(400).json({ error: "Prompt is required" });
        }

        console.log('🚀 AI Controller: Calling AI service with prompt:', prompt.substring(0, 50) + '...');
        const response = await aiService(prompt);
        
        console.log('✅ AI Controller: Successfully generated response');
        res.json({ response });
    } catch (error) {
        console.error('❌ Error in AI controller:', error);
        console.error('❌ Error stack:', error.stack);
        res.status(500).json({ 
            error: "Failed to generate response",
            details: error.message 
        });
    }
};