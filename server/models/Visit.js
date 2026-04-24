const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Scheduled', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);
