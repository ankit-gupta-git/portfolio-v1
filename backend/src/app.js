const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes')
const app = express();

// Enable CORS for frontend
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/ai', aiRoutes)

module.exports = app