const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, default: 'Mumbai' }, // Mumbai, Pune, Delhi, Gurgaon
  price: { type: Number, required: true },
  location: { type: String, required: true },
  lat: { type: Number, default: 22.7196 },
  lng: { type: Number, default: 75.8577 },
  description: { type: String, required: true },
  status: { type: String, default: 'Available' }, // Supported: Available, Sold Out, Upcoming, etc.
  amenities: [{ type: String }],
  images: [{ type: String }],
  brochureUrl: { type: String },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
