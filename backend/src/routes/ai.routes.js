const express = require('express');
const aiController = require("../controllers/ai.controller")
const router = express.Router();

// Test endpoint to verify the route is working
router.get("/test", (req, res) => {
    res.json({ 
        message: "AI route is working!",
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
    });
});

router.post("/get-response", aiController.getResponse)

module.exports = router;