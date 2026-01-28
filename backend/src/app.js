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
            'http://localhost:5173'
        ];
        
        // Add FRONTEND_URL if it exists and is valid
        if (process.env.FRONTEND_URL && process.env.FRONTEND_URL.startsWith('http')) {
            allowedOrigins.push(process.env.FRONTEND_URL);
        }
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
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