const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
  pageName: { type: String, required: true, unique: true }, // e.g., 'jagdish-bhawan'
  sections: [
    {
      title: String,
      content: String,
      image: String,
      type: { type: String, default: 'text' } // text, image, list, etc.
    }
  ],
  metadata: {
    title: String,
    subtitle: String,
    heroImage: String,
    nightImage: String
  }
}, { timestamps: true });

module.exports = mongoose.model('PageContent', pageContentSchema);
