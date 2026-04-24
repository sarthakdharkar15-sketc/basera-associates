const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true, enum: ['All', 'Mumbai', 'Pune', 'Delhi', 'Gurgaon'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);
