// // const express = require('express');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const nodemailer = require('nodemailer');// otp producer 
// // const User = require('../models/User');
// // require('dotenv').config();
// // const router = express.Router();
// // const JWT_SECRET = process.env.JWT_SECRET;
// // // Nodemailer setup
// // const transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     auth: {
// //         user: process.env.EMAIL,
// //         pass: process.env.EMAIL_PASS,
// //     }
// // });
// // // Store OTPs temporarily (can be replaced with Redis for better security)
// // const otpStore = {};
// // router.post('/send-otp', async (req, res) => {
// //     console.log(" Send OTP API Hit!"); //  Log API call

// //     const { email } = req.body;
// //     console.log(" Email received:", email); //  Log email received

// //     if (!email) {
// //         console.log("❌ No email provided"); //  Debugging missing email
// //         return res.status(400).json({ error: 'Email is required' });
// //     }

// //     const otp = Math.floor(100000 + Math.random() * 900000);
// //     otpStore[email] = otp;

// //     try {
// //         console.log(`📨 Sending OTP to: ${email}, OTP: ${otp}`); //  Log OTP
// //         await transporter.sendMail({
// //             from: process.env.EMAIL,
// //             to: email,
// //             subject: 'Your OTP Code',
// //             text: `Your OTP code is: ${otp}`,
// //         });

// //         console.log("✅ OTP Sent Successfully!");
// //         res.json({ success: true, otp });
// // console.log("✅ OTP stored:", otpStore);
// //     } catch (error) {
// //         console.error("❌ Error sending OTP:", error);
// //         res.status(500).json({ error: 'Failed to send OTP', details: error.message });
// //     }
// // });


// // // ✅ **Verify OTP & Register User**
// // router.post('/register', async (req, res) => {
// //     const { name, email, password, otp } = req.body
// //     if (!name || !email || !password) {
// //         return res.status(400).json({ error: "All fields are required" });
// //     }
    
// //     console.log("Received OTP:", otp);  //  Debug received OTP
// //     console.log("Stored OTP:", otpStore[email]); 
// //     // Check OTP
// //     if (!otpStore[email] || otpStore[email] !== Number(otp)) {
// //         return res.status(400).json({ error: 'Invalid OTP' });
// //     }
// //     delete otpStore[email]; // Remove OTP after verification
// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Save user
// //     try {
// //         await User.create({ name,email, password: hashedPassword });
// //         res.json({ message: 'User registered successfully' });
// //     } catch (err) {
// //         res.status(400).json({ error: 'Email already exists' });
// //     }
// // });
// // // **Login API**
// // router.post('/login', async (req, res) => {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(400).json({ error: 'Invalid credentials' });

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

// //     // Generate JWT token
// //     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

// //     res.json({ token });

// //     // res.json({ message: 'Login successful', token });
// // });

// // module.exports = router;


// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const User = require('../models/User');
// require('dotenv').config();

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS,
//     }
// });

// // Store OTPs temporarily
// const otpStore = {};

// // Send OTP
// // router.post('/send-otp', async (req, res) => {
// //     console.log("Send OTP API Hit!");
// //     const { email } = req.body;
// //     console.log("Email received:", email);

// //     if (!email) {
// //         console.log("❌ No email provided");
// //         return res.status(400).json({ error: 'Email is required' });
// //     }

// //     // Check if user already exists
// //     try {
// //         const existingUser = await User.findOne({ email });
// //         if (existingUser) {
// //             return res.status(400).json({ error: 'Email already registered' });
// //         }
// //     } catch (err) {
// //         console.error("Database error:", err);
// //         return res.status(500).json({ error: 'Server error' });
// //     }

// //     // Generate and store OTP as string to avoid type issues
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     otpStore[email] = otp;

// //     try {
// //         console.log(`📨 Sending OTP to: ${email}, OTP: ${otp}`);
// //         await transporter.sendMail({
// //             from: process.env.EMAIL,
// //             to: email,
// //             subject: 'Your OTP Code',
// //             text: `Your OTP code is: ${otp}`,
// //             html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
// //         });

// //         console.log("✅ OTP Sent Successfully!");
// //         res.json({ success: true, message: 'OTP sent successfully' });
// //     } catch (error) {
// //         console.error("❌ Error sending OTP:", error);
// //         res.status(500).json({ error: 'Failed to send OTP', details: error.message });
// //     }
// // });

// router.post('/send-otp', async (req, res) => {
//     console.log("Send OTP API Hit!");
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ 
//             success: false,
//             error: 'Email is required' 
//         });
//     }

//     try {
//         // Check if user exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ 
//                 success: false,
//                 error: 'Email already registered' 
//             });
//         }

//         // Generate OTP (6 digits)
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         otpStore[email] = otp;

//         // Send email
//         await transporter.sendMail({
//             from: process.env.EMAIL,
//             to: email,
//             subject: 'Your OTP Code',
//             text: `Your OTP code is: ${otp}`,
//             html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
//         });

//         console.log(`OTP sent to ${email}: ${otp}`);
        
//         // Return both success status and OTP (for development)
//         res.json({ 
//             success: true,
//             message: 'OTP sent successfully',
//             otp: otp // Include this for frontend verification
//         });

//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         res.status(500).json({ 
//             success: false,
//             error: 'Failed to send OTP',
//             details: error.message 
//         });
//     }
// });





// // Verify OTP & Register User
// router.post('/register', async (req, res) => {
//     const { name, email, password, otp } = req.body;
    
//     // Input validation
//     if (!name || !email || !password || !otp) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     console.log("Registration attempt for:", email);
//     console.log("Received OTP:", otp);
//     console.log("Stored OTP:", otpStore[email]);

//     // Check if OTP exists and matches (as strings)
//     if (!otpStore[email] || otpStore[email] !== otp.toString().trim()) {
//         console.log("OTP mismatch:", {
//             received: otp,
//             stored: otpStore[email],
//             typeReceived: typeof otp,
//             typeStored: typeof otpStore[email]
//         });
//         return res.status(400).json({ error: 'Invalid or expired OTP' });
//     }

//     // Delete OTP after verification
//     delete otpStore[email];

//     try {
//         // Check if user already exists (double-check)
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already registered' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create user
//         const user = await User.create({ 
//             name, 
//             email, 
//             password: hashedPassword 
//         });

//         // Generate JWT token for immediate login
//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

//         res.json({ 
//             success: true, 
//             message: 'User registered successfully',
//             token 
//         });
//     } catch (err) {
//         console.error("Registration error:", err);
//         res.status(500).json({ error: 'Registration failed', details: err.message });
//     }
// });

// // Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ error: 'Server error during login' });
//     }
// });

// module.exports = router;








const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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

// Store OTPs temporarily
const otpStore = {};

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false,
      error: 'Email is required' 
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: 'Email already registered' 
      });
    }

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`
    });

    res.json({ 
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to send OTP'
    });
  }
});

// Register User
router.post('/register', async (req, res) => {
  const { name, email, password, otp } = req.body;
  
  if (!name || !email || !password || !otp) {
    return res.status(400).json({ 
      success: false,
      error: "All fields are required" 
    });
  }

  // Check if OTP exists and matches
  if (!otpStore[email] || otpStore[email] !== otp.toString().trim()) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid or expired OTP' 
    });
  }

  // Delete OTP after verification
  delete otpStore[email];

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword 
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ 
      success: true, 
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ 
      success: false,
      error: 'Registration failed' 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ 
      success: true, 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      success: false,
      error: 'Server error during login' 
    });
  }
});

module.exports = router;