const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes')
const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'https://ankitbuilds.vercel.app',
            'http://localhost:5173',
            'http://localhost:3000'
        ];
        
        // Add FRONTEND_URL if it exists and is valid (strip trailing slash)
        if (process.env.FRONTEND_URL && process.env.FRONTEND_URL.startsWith('http')) {
            const cleanUrl = process.env.FRONTEND_URL.replace(/\/$/, '');
            allowedOrigins.push(cleanUrl);
        }
        
        // Allow local development origins and Vercel domains
        const isLocal = origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:');
        const isVercel = origin.endsWith('.vercel.app');
        
        if (allowedOrigins.includes(origin) || isLocal || isVercel) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
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