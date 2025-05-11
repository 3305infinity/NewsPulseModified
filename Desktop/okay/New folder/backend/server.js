const express = require('express');
const app = express()
const port=process.env.PORT || 5000;
const db=require('./db')
require('dotenv').config();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: process.env.SMTP_PORT || 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const platformRoutes = require('./routes/platform');
app.use('/platforms', platformRoutes);
app.post('/api/send-reminder', async (req, res) => {
  const { email, contestName, platform, startTime, contestUrl } = req.body;

  try {
    await transporter.sendMail({
      from: `nishthap1410@gmail.com`,
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
    res.status(500).json({ error: "Failed to send reminder" });
  }
});
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true
}));
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const contestRoutes = require("./routes/contests");
app.use("/api", contestRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// const cors = require("cors");
// app.use(cors());
// app.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' }));
//to fetch the body from the api with api/auth we have to use a middleware