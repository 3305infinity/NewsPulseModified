const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');// otp producer 
const User = require('../models/User');
require('dotenv').config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    }
});
// Store OTPs temporarily (can be replaced with Redis for better security)
const otpStore = {};
router.post('/send-otp', async (req, res) => {
    console.log(" Send OTP API Hit!"); //  Log API call

    const { email } = req.body;
    console.log(" Email received:", email); //  Log email received

    if (!email) {
        console.log("❌ No email provided"); //  Debugging missing email
        return res.status(400).json({ error: 'Email is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    try {
        console.log(`📨 Sending OTP to: ${email}, OTP: ${otp}`); //  Log OTP
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        });

        console.log("✅ OTP Sent Successfully!");
        res.json({ success: true, otp });
console.log("✅ OTP stored:", otpStore);
    } catch (error) {
        console.error("❌ Error sending OTP:", error);
        res.status(500).json({ error: 'Failed to send OTP', details: error.message });
    }
});


// ✅ **Verify OTP & Register User**
router.post('/register', async (req, res) => {
    const { name, email, password, otp } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    console.log("Received OTP:", otp);  //  Debug received OTP
    console.log("Stored OTP:", otpStore[email]); 
    // Check OTP
    if (!otpStore[email] || otpStore[email] !== Number(otp)) {
        return res.status(400).json({ error: 'Invalid OTP' });
    }
    delete otpStore[email]; // Remove OTP after verification
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    try {
        await User.create({ name,email, password: hashedPassword });
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists' });
    }
});
// **Login API**
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

    // res.json({ message: 'Login successful', token });
});

module.exports = router;