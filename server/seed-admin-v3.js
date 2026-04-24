const mongoose = require('mongoose');
const User = require('./models/User');

async function createAdmin() {
  try {
    // UPDATED DB NAME TO MATCH server.js
    await mongoose.connect('mongodb://127.0.0.1:27017/basera');
    console.log('Connected to MongoDB (basera)');

    const adminEmail = 'admin@basera.com';
    await User.deleteOne({ email: adminEmail });
    
    console.log('Creating fresh admin in BASERA db...');
    const admin = new User({
      name: 'Super Admin',
      email: adminEmail,
      password: 'admin123',
      role: 'admin',
      isApproved: true,
      referralCode: 'ADMIN' + Date.now()
    });

    await admin.save();

    console.log('Admin account ready:');
    console.log('Email: admin@basera.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
}

createAdmin();
