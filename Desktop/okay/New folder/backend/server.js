// // const express = require('express');
// // const app = express()
// // const port=process.env.PORT || 5000;
// // const db=require('./db')
// // require('dotenv').config();
// // const bodyParser = require('body-parser');
// // const nodemailer = require('nodemailer');
// // const transporter = nodemailer.createTransport({
// //   host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
// //   port: process.env.SMTP_PORT || 2525,
// //   auth: {
// //     user: process.env.SMTP_USER,
// //     pass: process.env.SMTP_PASS,
// //   },
// // });
// // // const platformRoutes = require('./routes/platform');
// // // // app.use('/platforms', platformRoutes);
// // // app.use('/api/user', platformRoutes);


// // // In your server.js or app.js
// // const platformRoutes = require('./routes/platform');

// // // Mount platform routes
// // app.use('/api/platform', platformRoutes);
// // app.post('/api/send-reminder', async (req, res) => {
// //   const { email, contestName, platform, startTime, contestUrl } = req.body;

// //   try {
// //     await transporter.sendMail({
// //       from: `nishthap1410@gmail.com`,
// //       to: email,
// //       subject: `🔔 Reminder: ${contestName} on ${platform}`,
// //       html: `
// //         <h2>${contestName} starts soon!</h2>
// //         <p><strong>Platform:</strong> ${platform}</p>
// //         <p><strong>Start Time:</strong> ${new Date(startTime).toLocaleString()}</p>
// //         <a href="${contestUrl}" target="_blank">Join Contest Now</a>
// //       `,
// //     });

// //     res.json({ success: true });
// //   } catch (error) {
// //     console.error("Email error:", error);
// //     res.status(500).json({ error: "Failed to send reminder" });
// //   }
// // });
// // const cors = require('cors');
// // app.use(cors({
// //     origin: 'http://localhost:3000', // Your frontend URL
// //     credentials: true
// // }));
// // app.use(express.json())
// // app.use(bodyParser.json());
// // app.use(express.urlencoded({ extended: true }));
// // const authRoutes = require('./routes/auth');
// // app.use('/api/auth', authRoutes);
// // const contestRoutes = require("./routes/contests");
// // app.use("/api", contestRoutes);
// // app.get('/', (req, res) => {
// //   res.send('Hello World!')
// // })
// // app.listen(port,()=>{
// //     console.log(`server is running on port http://localhost:${port}`)
// // })
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const db = require('./db');
// require('dotenv').config();
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000'
//   ,
//   credentials: true
// }));
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// // Email transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
//   port: process.env.SMTP_PORT || 2525,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });
// // Routes
// const authRoutes = require('./routes/auth');
// const contestRoutes = require('./routes/contests');
// const platformRoutes = require('./routes/platform');
// app.use('/api/auth', authRoutes);
// app.use('/api/contests', contestRoutes);  // Changed from '/api' to be more specific
// app.use('/api/platform', platformRoutes); // Changed from '/api/platform' to match your router
// // Email reminder endpoint
// app.post('/api/send-reminder', async (req, res) => {
//   const { email, contestName, platform, startTime, contestUrl } = req.body;
//   try {
//     await transporter.sendMail({
//       from: `nishthap1410@gmail.com`,
//       to: email,
//       subject: `🔔 Reminder: ${contestName} on ${platform}`,
//       html: `
//         <h2>${contestName} starts soon!</h2>
//         <p><strong>Platform:</strong> ${platform}</p>
//         <p><strong>Start Time:</strong> ${new Date(startTime).toLocaleString()}</p>
//         <a href="${contestUrl}" target="_blank">Join Contest Now</a>
//       `,
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.error("Email error:", error);
//     res.status(500).json({ error: "Failed to send reminder" });
//   }
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port http://localhost:${port}`);
// });





const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Connect to Database
// db.connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['x-auth-token']
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: process.env.SMTP_PORT || 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Routes
const authRoutes = require('./routes/auth');
const contestRoutes = require('./routes/contests');
const platformRoutes = require('./routes/platform');

// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/contests', contestRoutes); 
app.use('/api/platform', platformRoutes);

// Email reminder endpoint
app.post('/api/send-reminder', async (req, res) => {
  const { email, contestName, platform, startTime, contestUrl } = req.body;
  
  if (!email || !contestName || !platform || !startTime) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'nishthap1410@gmail.com',
      to: email,
      subject: `🔔 Reminder: ${contestName} on ${platform}`,
      html: `
        <h2>${contestName} starts soon!</h2>
        <p><strong>Platform:</strong> ${platform}</p>
        <p><strong>Start Time:</strong> ${new Date(startTime).toLocaleString()}</p>
        <a href="${contestUrl}" target="_blank">Join Contest Now</a>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to send reminder" 
    });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server error'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});