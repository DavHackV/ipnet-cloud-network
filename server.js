const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// STATIC FILES
// ===============================

app.use(express.static(path.join(__dirname, "public")));

// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch(err => {
    console.log("❌ MongoDB Error:", err);
});

// ===============================
// ROUTES
// ===============================

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// ===============================
// DEFAULT ROUTE
// ===============================

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`🚀 Server running on port ${PORT}`);
});