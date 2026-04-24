const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  offerPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Contacted', 'Negotiating', 'Converted', 'Lost'] },
  priority: { type: String, default: 'Medium', enum: ['Low', 'Medium', 'High', 'Urgent'] },
  source: { type: String, default: 'Website' },
  assignedTo: { type: String, default: 'Unassigned' },
  followUpDate: { type: Date },
  notes: [{
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
