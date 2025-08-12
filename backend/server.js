// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { encode, decode, resetTokenizer } = require("./tokenizer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Encode text
app.post("/encode", (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text is required" });

        const tokenIds = encode(text);
        res.json({ tokens: tokenIds });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Decode token IDs
app.post("/decode", (req, res) => {
    try {
        const { tokens } = req.body;
        if (!Array.isArray(tokens)) {
            return res.status(400).json({ error: "Tokens array is required" });
        }

        const decodedText = decode(tokens);
        res.json({ text: decodedText });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reset tokenizer
app.post("/reset", (req, res) => {
    resetTokenizer();
    res.json({ message: "Tokenizer reset successfully" });
});

// Catch-all for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found", path: req.path, method: req.method });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
