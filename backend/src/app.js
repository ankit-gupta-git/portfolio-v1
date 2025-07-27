const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes')
const app = express();

// Enable CORS for frontend - more flexible for deployment
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'https://portfolio-v1-eta-rosy.vercel.app', 
            'https://portfolio-v1-1-uc52.onrender.com',
            'https://www.ankitdev.xyz',
            'https://ankitdev.xyz',
            'http://localhost:5173',
            'http://localhost:3000'
        ];
        
        // Log all incoming origins for debugging
        console.log('🌐 CORS: Incoming request from origin:', origin);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            console.log('✅ CORS: Origin allowed:', origin);
            callback(null, true);
        } else {
            console.log('❌ CORS: Origin blocked:', origin);
            console.log('📋 CORS: Allowed origins:', allowedOrigins);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json())

// Handle preflight requests
app.options('*', cors());

app.get('/', (req, res) => {
    res.json({ 
        message: 'Backend is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
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