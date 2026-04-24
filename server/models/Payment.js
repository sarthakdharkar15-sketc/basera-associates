const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  razorpayOrderId: {
    type: String,
    required: true
  },
  razorpayPaymentId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
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
    required: false
  },
  membershipPlan: {
    type: String,
    required: false
  },

  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Success'
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
