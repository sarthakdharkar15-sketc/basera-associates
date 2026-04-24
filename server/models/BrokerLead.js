const mongoose = require('mongoose');

const brokerLeadSchema = new mongoose.Schema({
  email: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Contacted', 'Onboarded', 'Rejected'] },
  priority: { type: String, default: 'Medium', enum: ['Low', 'Medium', 'High', 'Urgent'] },
  followUpDate: { type: Date },
  notes: [{
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('BrokerLead', brokerLeadSchema);
