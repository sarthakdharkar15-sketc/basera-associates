const mongoose = require('mongoose');
const User = require('./models/User');

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/property');
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@basera.com';
    // Delete existing to be 100% sure
    await User.deleteOne({ email: adminEmail });
    
    console.log('Creating fresh admin...');
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
