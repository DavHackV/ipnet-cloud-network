// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // <-- IMPORTANT

dotenv.config();

const app = express(); // <-- créer app avant de l'utiliser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Routes API pour auth
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Route contact
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log("New Contact Message");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    res.send("Message received successfully!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));