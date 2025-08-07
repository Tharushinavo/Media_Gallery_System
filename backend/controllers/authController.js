const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const otpStorage = {};

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error('❌ EMAIL_USER or EMAIL_PASS not set in .env');
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Verify transporter connection (helps catch errors early)
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP transporter verification failed:', error);
  } else {
    console.log('✅ SMTP transporter ready');
  }
});

const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStorage[email] = otp;

  try {
    const mailOptions = {
      from: `"Media Gallery System" <${EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Hello!\n\nYour OTP code is: ${otp}\nThis OTP will expire in 10 minutes.\n\nThank you!`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

const register = async (req, res) => {
  const { email, password, otp } = req.body;

  if (!otpStorage[email]) {
    return res.status(400).json({ message: 'OTP not requested or expired' });
  }

  if (otpStorage[email] !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword });

  delete otpStorage[email]; // remove used OTP

  res.status(201).json({ message: 'Registered successfully' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

module.exports = { sendOtp, register, login };
