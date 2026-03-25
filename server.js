require("dotenv").config();   // 👈 TOP (important)

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");  // 👈 paste near other requires

const app = express();

app.use(cors());
app.use(express.json());

// ✅ 👇 PASTE YOUR MYSQL CODE HERE
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

// ✅ connect to database
db.connect(err => {
    if (err) {
        console.error("DB connection failed:", err);
    } else {
        console.log("Connected to Railway MySQL 🚀");
    }
});

// test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// contact API
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "DB error ❌" });
        }

        res.json({ message: "Saved to Railway DB ✅" });
    });
});

// start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

