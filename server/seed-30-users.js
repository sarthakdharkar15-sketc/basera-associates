const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/basera';

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const users = [];
    const cities = ['Indore', 'Mumbai', 'Pune', 'Delhi', 'Gurgaon', 'Goa'];
    const roles = ['user', 'broker'];

    for (let i = 1; i <= 30; i++) {
      users.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: 'password123', // Will be hashed by model pre-save hook
        role: roles[i % 2],
        isPremium: i % 5 === 0,
        isApproved: i % 2 === 0,
        referralCode: `REF-${i + 1000}`,
        membershipLevel: i % 10 === 0 ? 'Yearly Value' : (i % 5 === 0 ? 'Basic Premium' : 'None'),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
      });
    }

    await User.insertMany(users);
    console.log('Successfully seeded 30 users');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding users:', err);
    process.exit(1);
  }
}

seedUsers();
