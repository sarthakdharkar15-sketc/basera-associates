const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: function() {
      return !this.googleId; // Password is required only if googleId is not present
    }
  },
  googleId: { type: String },
  role: { type: String, enum: ['user', 'broker', 'admin'], default: 'user' },
  isPremium: { type: Boolean, default: false },
  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isApproved: { type: Boolean, default: false }, // Only for brokers
  membershipLevel: { type: String, enum: ['None', 'Basic Premium', 'Broker Plan', 'Yearly Value'], default: 'None' },
  subscriptionExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
