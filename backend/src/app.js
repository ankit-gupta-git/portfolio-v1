const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes')
const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: function (origin, callback) {
        // Allow all requesting origins (reflect origin) so production frontend deployments can always connect
        callback(null, true);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true
}));

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ 
        message: 'Backend is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Warm-up endpoint for cold start optimization
app.get('/api/warmup', (req, res) => {
    // Fire and forget - don't wait for it
    const { warmUpAI } = require('./services/ai.services');
    warmUpAI();
    console.log("Warm-up signal received, triggering AI background init");
    
    res.status(200).json({ message: "Warmed up" });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.use('/ai', aiRoutes)

module.exports = app