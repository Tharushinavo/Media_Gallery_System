require('dotenv').config(); // Load env variables first

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.MONGO_URI || !process.env.PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ Missing required environment variables in .env');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');

  app.use('/api/auth', authRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
