const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const dns = require("dns")

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

dotenv.config();

const app = express();
const PORT = 5000;

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Blissbix Backend API",
        status: "success",
        version: "1.0.0"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});