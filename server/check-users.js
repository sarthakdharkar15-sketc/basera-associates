const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/basera';

async function checkUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    const count = await User.countDocuments();
    console.log(`Total users in database: ${count}`);
    const sample = await User.find().limit(5);
    console.log('Sample users:', sample.map(u => u.email));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkUsers();
