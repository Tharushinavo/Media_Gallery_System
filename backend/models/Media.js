const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: String,
  title: String,
  description: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);