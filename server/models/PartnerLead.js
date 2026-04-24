const mongoose = require('mongoose');

const partnerLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  experience: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Contacted', 'Onboarded', 'Rejected'] },
  priority: { type: String, default: 'Medium', enum: ['Low', 'Medium', 'High', 'Urgent'] },
  source: { type: String, default: 'Website' },
  followUpDate: { type: Date },
  notes: [{
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('PartnerLead', partnerLeadSchema);
