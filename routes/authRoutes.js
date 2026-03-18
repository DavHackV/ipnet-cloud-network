const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/User");

// ===============================
// EMAIL TRANSPORTER
// ===============================

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ===============================
// SIGNUP
// ===============================

router.post("/signup", async (req,res)=>{

try{

const { firstName, lastName, email, password } = req.body;

// vérifier si utilisateur existe
const existingUser = await User.findOne({email});

if(existingUser){
return res.status(400).json({message:"User already exists"});
}

// hash password
const hashedPassword = await bcrypt.hash(password,10);

// générer code verification
const verificationCode = Math.floor(100000 + Math.random()*900000).toString();

// créer utilisateur
const user = new User({
firstName,
lastName,
email,
password: hashedPassword,
verificationCode,
verified:false
});

await user.save();

// envoyer email
await transporter.sendMail({
from: process.env.EMAIL_USER,
to: email,
subject: "IPNet Email Verification",
text: `Your verification code is: ${verificationCode}`
});

res.json({
message:"Verification code sent"
});

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

});

// ===============================
// VERIFY EMAIL
// ===============================

router.post("/verify", async (req,res)=>{

try{

const { email, code } = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(400).json({message:"User not found"});
}

if(user.verificationCode !== code){
return res.status(400).json({message:"Invalid code"});
}

user.verified = true;
user.verificationCode = null;

await user.save();

res.json({message:"Account verified"});

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

});

// ===============================
// LOGIN
// ===============================

router.post("/login", async (req,res)=>{

try{

const { email, password } = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(400).json({message:"User not found"});
}

if(!user.verified){
return res.status(400).json({message:"Email not verified"});
}

// comparer password
const validPassword = await bcrypt.compare(password,user.password);

if(!validPassword){
return res.status(400).json({message:"Invalid password"});
}

// créer token
const token = jwt.sign(
{ id:user._id },
process.env.JWT_SECRET,
{ expiresIn:"1d" }
);

res.json({
token,
user:{
firstName:user.firstName,
lastName:user.lastName,
email:user.email
}
});

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

});

module.exports = router;