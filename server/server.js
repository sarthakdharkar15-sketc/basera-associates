require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Project = require('./models/Project');
const Inquiry = require('./models/Inquiry');
const Payment = require('./models/Payment');
const Visit = require('./models/Visit');
const Alert = require('./models/Alert');
const PartnerLead = require('./models/PartnerLead');
const BrokerLead = require('./models/BrokerLead');
const Newsletter = require('./models/Newsletter');
const User = require('./models/User');
const PageContent = require('./models/PageContent');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');




const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(compression());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({ storage: storage });

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/basera';
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected successfully to', MONGO_URI);
    // Seed initial data if db is empty
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.create([
        {
          title: 'Basera Heights - Commercial',
          type: 'Commercial',
          price: 15000000,
          location: 'Downtown Metro',
          lat: 22.7126,
          lng: 75.8577,
          description: 'Premium commercial spaces with modern amenities and high footfall.',
          amenities: ['Main Road Facing', '24x7 Security', 'Ample Parking'],
          images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'],
          brochureUrl: ''
        },
        {
          title: 'Green Valley Plots',
          type: 'Plots',
          price: 5000000,
          location: 'Suburban Tech Park',
          lat: 22.7210,
          lng: 75.8750,
          description: 'Vastu-compliant residential plots ready for registration.',
          amenities: ['Clear Title', 'Gated Community', 'Park Facing'],
          images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2032&auto=format&fit=crop'],
          brochureUrl: ''
        }
      ]);
      console.log('Database seeded with initial properties.');
    }

    // Seed initial Users if empty
    const userCount = await User.countDocuments();
    if (userCount <= 1) { // 1 might be the admin
      const dummyUsers = [];
      for (let i = 1; i <= 30; i++) {
        dummyUsers.push({
          name: `User ${i}`,
          email: `user${i}@example.com`,
          password: 'password123',
          role: i % 5 === 0 ? 'broker' : 'user',
          isPremium: i % 3 === 0,
          referralCode: `REF-${i + 2000}`,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
        });
      }
      await User.insertMany(dummyUsers);
      console.log('Database seeded with 30 dummy users.');
    }

    // Seed initial PageContent if empty
    const pageCount = await PageContent.countDocuments();
    if (pageCount === 0) {
      await PageContent.create([
        {
          pageName: 'jagdish-bhawan',
          metadata: {
            title: 'Jagdish Bhawan',
            subtitle: 'Commercial Excellence in Sarafa Bazaar',
            heroImage: '/jagdish_bhawan_user.jpg',
            nightImage: '/jagdish_bhawan_night_user.png'
          },
          sections: []
        },
        {
          pageName: 'altamount-crown',
          metadata: {
            title: 'Altamount Crown',
            subtitle: 'Ultra-Luxury Residencies at Altamount Road',
            heroImage: '/altamount-vision.jpg',
            nightImage: '/altamount-vision.jpg'
          },
          sections: []
        },
        {
          pageName: 'coastal-villas',
          metadata: {
            title: 'Coastal Villas',
            subtitle: 'Exclusive Seaside Living',
            heroImage: '/property1.jpg',
            nightImage: '/property1.jpg'
          },
          sections: []
        }
      ]);
      console.log('Database seeded with multi-page content placeholders.');
    }
    
    // Seed extra projects for the new design
    const newCount = await Project.countDocuments();
    if (newCount < 5) {
      await Project.create([
        {
          title: 'Skyline Delhi Corporate',
          type: 'Commercial',
          city: 'Delhi',
          price: 25000000,
          location: 'Connaught Place',
          lat: 28.6315,
          lng: 77.2167,
          description: 'State-of-the-art corporate workspaces in the heart of the capital.',
          amenities: ['Smart Building', 'Helipad Access', 'Retail Podium'],
          images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'],
          brochureUrl: ''
        },
        {
          title: 'Pune Heritage Suites',
          type: 'Flats',
          city: 'Pune',
          price: 12000000,
          location: 'Koregaon Park',
          lat: 18.5362,
          lng: 73.8940,
          description: 'Premium 3BHK apartments in Pune\'s most desirable residential enclave.',
          amenities: ['Infinity Pool', 'Clubhouse', 'Smart Home Integration'],
          images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop'],
          brochureUrl: ''
        },
        {
          title: 'Gurgaon Tech Plots',
          type: 'Plots',
          city: 'Gurgaon',
          price: 8000000,
          location: 'Golf Course Road Extension',
          lat: 28.4282,
          lng: 77.0811,
          description: 'Spacious individual villa plots located near the upcoming tech corridor.',
          amenities: ['Pre-approved Plans', 'Direct Highway Access', 'Eco-friendly'],
          images: ['https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=2070&auto=format&fit=crop'],
          brochureUrl: ''
        },
        {
          title: 'Mumbai Marine Towers',
          type: 'Commercial',
          city: 'Mumbai',
          price: 35000000,
          location: 'Worli',
          lat: 19.0176,
          lng: 72.8172,
          description: 'A bustling multi-purpose tower ideal for luxury boutique offices.',
          amenities: ['High Footfall Area', 'Double Height Shops', 'Central AC'],
          images: ['https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2077&auto=format&fit=crop'],
          brochureUrl: ''
        }
      ]);
      console.log('Database seeded with additional cross-city properties.');
    }

    // Seed Coastal Villas if they don't exist
    const coastalCount = await Project.countDocuments({ type: 'Coastal' });
    if (coastalCount < 20) {
      if (coastalCount > 0) await Project.deleteMany({ type: 'Coastal' }); // Update to full list of 20
      await Project.create([
        // MUMBAI LUXURY COASTAL (5 Units)
        {
          title: 'The Malabar Sky-Villa',
          type: 'Coastal',
          city: 'Mumbai',
          price: 450000000,
          location: 'Malabar Hill',
          lat: 18.9548,
          lng: 72.7985,
          description: 'An architectural masterpiece overlooking the Arabian Sea, featuring a private helicopter pad and 360-degree glass walls.',
          amenities: ['Sea View', 'Private Helipad', 'Smart Home', 'Infinity Pool'],
          images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Juhu Sands Estate',
          type: 'Coastal',
          city: 'Mumbai',
          price: 320000000,
          location: 'Juhu Beach',
          lat: 19.1027,
          lng: 72.8270,
          description: 'Experience beachfront living in the heart of Mumbai. Direct private access to the shore and world-class interiors.',
          amenities: ['Beach Path', 'Private Security', 'Zen Garden', 'Luxury Lifestyle'],
          images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Worli Sea-Link Penthouse',
          type: 'Coastal',
          city: 'Mumbai',
          price: 250000000,
          location: 'Worli Seaface',
          lat: 19.0176,
          lng: 72.8172,
          description: 'A modern marvel offering unparalleled views of the iconic Sea Link and the vast ocean horizon.',
          amenities: ['Sea Link View', 'Concierge Service', 'Private Cinema', 'High ROI'],
          images: ['https://images.unsplash.com/photo-1600607687940-c52af04657b3?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Marine Drive Heritage Mansion',
          type: 'Coastal',
          city: 'Mumbai',
          price: 550000000,
          location: 'Marine Drive',
          lat: 18.9438,
          lng: 72.8236,
          description: 'The pinnacle of luxury at the Queen\'s Necklace. A restored heritage mansion with state-of-the-art updates.',
          amenities: ['Heritage', 'Sea View', 'Grand Ballroom', 'Premium Location'],
          images: ['https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Cuffe Parade Coastal Tower',
          type: 'Coastal',
          city: 'Mumbai',
          price: 280000000,
          location: 'Cuffe Parade',
          lat: 18.9145,
          lng: 72.8220,
          description: 'Ultra-exclusive residential tower with individual floor-penthouses and private docking facilities.',
          amenities: ['Private Dock', 'Panoramic Sea View', 'Spa & Wellness', 'Luxury Lifestyle'],
          images: ['https://images.unsplash.com/photo-1600585154526-990dcea4db0d?q=80&w=2070'],
          isFeatured: true
        },
        // GOA BEACH SIDE (5 Units)
        {
          title: 'Vagator Cliff Mansion',
          type: 'Coastal',
          city: 'Goa',
          price: 95000000,
          location: 'Vagator Cliff',
          lat: 15.6028,
          lng: 73.7336,
          description: 'Stunning cliffside mansion with infinity pools that merge with the horizon of the Arabian Sea.',
          amenities: ['Infinity View', 'Cliffside Living', 'Private Bar', 'High ROI'],
          images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Anjuna Tropical Sanctuary',
          type: 'Coastal',
          city: 'Goa',
          price: 72000000,
          location: 'Anjuna Beach',
          lat: 15.5782,
          lng: 73.7435,
          description: 'A hidden sanctuary nestled in coconut groves with bohemian-luxe architecture and private beach gates.',
          amenities: ['Beachfront', 'Tropical Garden', 'Yoga Deck', 'Luxury Lifestyle'],
          images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Candolim Royal Estate',
          type: 'Coastal',
          city: 'Goa',
          price: 150000000,
          location: 'Candolim',
          lat: 15.5158,
          lng: 73.7686,
          description: 'Majestic estate inspired by Indo-Portuguese royalty, offering ultimate privacy and grand living spaces.',
          amenities: ['Private Jetty', 'Royal Interiors', 'Grand Courtyard', 'Premium Location'],
          images: ['https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Palolem Azure Villa',
          type: 'Coastal',
          city: 'Goa',
          price: 58000000,
          location: 'Palolem',
          lat: 15.0100,
          lng: 74.0232,
          description: 'Contemporary minimalist villa designed to maximize ocean breezes and natural light in South Goa.',
          amenities: ['Ocean Breeze Design', 'Private Beach Access', 'Eco-Friendly', 'Sea View'],
          images: ['https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Morjim Eco-Luxe Retreat',
          type: 'Coastal',
          city: 'Goa',
          price: 85000000,
          location: 'Morjim Beachside',
          lat: 15.6174,
          lng: 73.7225,
          description: 'A sustainable luxury retreat near the turtle nesting sites, offering peace and ultimate premium comfort.',
          amenities: ['Eco-Luxe', 'Turtle Beach Proximity', 'Organic Pool', 'Investment Grade'],
          images: ['https://images.unsplash.com/photo-1602343168117-bb8917f564f5?q=80&w=2070'],
          isFeatured: true
        },
        // ADDITIONAL 10 PROPERTIES (5 Mumbai, 5 Goa)
        {
          title: 'Bandra Oceanfront Villa',
          type: 'Coastal',
          city: 'Mumbai',
          price: 380000000,
          location: 'Bandra Bandstand',
          lat: 19.0435,
          lng: 72.8193,
          description: 'Luxury villa in Mumbai\'s most happening neighborhood. Stunning views of the sea and celebrities for neighbors.',
          amenities: ['Sea View', 'Private Gym', 'Prime Location', 'Luxury Lifestyle'],
          images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Breach Candy Coastal Haven',
          type: 'Coastal',
          city: 'Mumbai',
          price: 420000000,
          location: 'Breach Candy',
          lat: 18.9715,
          lng: 72.8252,
          description: 'Exclusive residence in South Mumbai with direct ocean views and traditional luxury finishes.',
          amenities: ['Ocean View', 'Garden', 'Security', 'Premium Location'],
          images: ['https://images.unsplash.com/photo-1600607687940-c52af04657b3?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Versova Beachfront Loft',
          type: 'Coastal',
          city: 'Mumbai',
          price: 180000000,
          location: 'Versova Beach',
          lat: 19.1351,
          lng: 72.8090,
          description: 'Modern beachside loft for the young elite, featuring an expansive deck and sunset views.',
          amenities: ['Sunset Deck', 'Modern Art', 'Beachfront', 'High ROI'],
          images: ['https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Shivaji Park Coastal Estate',
          type: 'Coastal',
          city: 'Mumbai',
          price: 220000000,
          location: 'Shivaji Park',
          lat: 19.0268,
          lng: 72.8360,
          description: 'Graceful luxury apartments in a historical coastal setting with expansive park and sea views.',
          amenities: ['Gated', 'Sea View', 'Park Access', 'Luxury Lifestyle'],
          images: ['https://images.unsplash.com/photo-1600585154526-990dcea4db0d?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Prabhadevi Sea-View Penthouses',
          type: 'Coastal',
          city: 'Mumbai',
          price: 350000000,
          location: 'Prabhadevi',
          lat: 19.0163,
          lng: 72.8286,
          description: 'Super-premium sky penthouses with double-height ceilings and panoramic wrap-around decks.',
          amenities: ['Sky Deck', 'Private Pool', 'Sea View', 'Premium Location'],
          images: ['https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Baga Retreat Villa',
          type: 'Coastal',
          city: 'Goa',
          price: 65000000,
          location: 'Baga Beachside',
          lat: 15.5553,
          lng: 73.7517,
          description: 'Exclusive Goan villa just steps away from the most happening beach in the North.',
          amenities: ['Near Beach', 'Private Pool', 'Investment Grade', 'Luxury Lifestyle'],
          images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Calangute Azure Mansion',
          type: 'Coastal',
          city: 'Goa',
          price: 88000000,
          location: 'Calangute',
          lat: 15.5443,
          lng: 73.7553,
          description: 'Spacious royal mansion with modern comforts and walking distance to the Calangute coastline.',
          amenities: ['Walking to Beach', 'Garden', 'Parking', 'High ROI'],
          images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Ashwem Turtle Nest Villa',
          type: 'Coastal',
          city: 'Goa',
          price: 110000000,
          location: 'Ashwem Beach',
          lat: 15.6567,
          lng: 73.7150,
          description: 'Pristine luxury villa in a peaceful village environment with premium amenities and ocean panoramas.',
          amenities: ['Pristine Beach', 'Quiet Location', 'Ocean View', 'Luxury Lifestyle'],
          images: ['https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Arambol Shorefront Home',
          type: 'Coastal',
          city: 'Goa',
          price: 45000000,
          location: 'Arambol',
          lat: 15.6881,
          lng: 73.7051,
          description: 'Bohemian-luxe villas for the global nomad, merging raw nature with high-end comfort.',
          amenities: ['Nature Views', 'Beachfront', 'Private Sunset Space', 'Sea View'],
          images: ['https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=2070'],
          isFeatured: true
        },
        {
          title: 'Dona Paula Ocean Cliff',
          type: 'Coastal',
          city: 'Goa',
          price: 180000000,
          location: 'Dona Paula',
          lat: 15.4452,
          lng: 73.8016,
          description: 'Ultra-luxurious cliffside residence with private dock access and views of the Mormugao harbor.',
          amenities: ['Cliffside', 'Private Dock', 'Premium Location', 'Luxury Lifestyle'],
          images: ['https://images.unsplash.com/photo-1602343168117-bb8917f564f5?q=80&w=2070'],
          isFeatured: true
        }
      ]);
      console.log('Database seeded with 20 premium Coastal Villas (Mumbai & Goa).');
    }

    // Seed mock Partner Leads - Ensure 20
    const partnerCount = await PartnerLead.countDocuments();
    if (partnerCount < 20) {
      if (partnerCount > 0) await PartnerLead.deleteMany({}); // Wipe if insufficient
      const cities = ['Mumbai', 'Pune', 'Delhi', 'Gurgaon', 'Indore'];
      const dummyPartners = Array.from({ length: 20 }).map((_, i) => ({
        name: `Partner ${i + 1}`,
        phone: `98765${10000 + i}`,
        city: cities[i % cities.length],
        experience: `${(i % 5) + 1} Years`,
        status: i % 3 === 0 ? 'Pending' : 'Contacted'
      }));
      await PartnerLead.insertMany(dummyPartners);
      console.log('Seeded 20 Associate Partner Leads');
    }

    // Seed mock Broker Leads - Ensure 20
    const brokerCount = await BrokerLead.countDocuments();
    if (brokerCount < 20) {
      if (brokerCount > 0) await BrokerLead.deleteMany({}); // Wipe if insufficient
      const dummyBrokers = Array.from({ length: 20 }).map((_, i) => ({
        email: `broker${i + 1}@example.com`,
        status: i % 3 === 0 ? 'Pending' : 'Onboarded'
      }));
      await BrokerLead.insertMany(dummyBrokers);
      console.log('Seeded 20 Broker Network Signups');
    }
    
    // Seed mock Newsletter Subscribers - Ensure 20
    const newsletterCount = await Newsletter.countDocuments();
    if (newsletterCount < 20) {
      if (newsletterCount > 0) await Newsletter.deleteMany({}); // Wipe if insufficient
      const dummySubscribers = Array.from({ length: 20 }).map((_, i) => ({
        email: `subscriber${i + 1}@gmail.com`,
      }));
      await Newsletter.insertMany(dummySubscribers);
      console.log('Seeded 20 Newsletter Subscribers');
    }

    // Seed mock Payments linked to projects - Ensure 20
    const paymentCount = await Payment.countDocuments();
    if (paymentCount < 20) {
      if (paymentCount > 0) await Payment.deleteMany({}); // Wipe if insufficient
      const allProjects = await Project.find();
      if (allProjects.length > 0) {
        const dummyPayments = Array.from({ length: 20 }).map((_, i) => {
          const project = allProjects[i % allProjects.length];
          return {
            razorpayOrderId: `order_${1000 + i}`,
            razorpayPaymentId: `pay_${2000 + i}`,
            userName: `Client ${i + 1}`,
            userEmail: `client${i + 1}@example.com`,
            userPhone: `9988776655`,
            projectId: project._id,
            amount: project.price / 100
          };
        });
        await Payment.insertMany(dummyPayments);
        console.log('Seeded 20 Successful Payments');
      }
    }

    // Seed/Update Admin User
    const adminEmail = 'admin@basera.com';
    let admin = await User.findOne({ email: adminEmail });
    
    if (!admin) {
      admin = new User({
        name: 'Admin Basera',
        email: adminEmail,
        password: 'adminpassword',
        role: 'admin'
      });
      await admin.save();
      console.log('Created default admin user: admin@basera.com / adminpassword');
    } else {
      // Ensure role is admin and password is reset for this session to be sure
      admin.password = 'adminpassword';
      admin.role = 'admin';
      await admin.save();
      console.log('Reset admin credentials to: admin@basera.com / adminpassword');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware for Auth (Simplified Dummy)
const authMiddleware = (req, res, next) => {
  next();
};

// Razorpay Initialization
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummysecret'
});

const JWT_SECRET = process.env.JWT_SECRET || 'basera_secret_key_123';

// Nodemailer Transporter Configuration (Use environment variables for real credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'basera.associates.demo@gmail.com',
  }
});

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        role: 'user'
      });
    } else if (!user.googleId) {
      // Link Google ID to existing email account
      user.googleId = sub;
      await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Google login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ error: 'Google authentication failed' });
  }
});


// Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', upload.fields([{ name: 'images', maxCount: 5 }, { name: 'brochure', maxCount: 1 }]), async (req, res) => {
  try {
    const images = req.files['images'] ? req.files['images'].map(file => '/uploads/' + file.filename) : [];
    const brochureUrl = req.files['brochure'] ? '/uploads/' + req.files['brochure'][0].filename : '';

    const newProject = await Project.create({
      ...req.body,
      status: req.body.status || 'Available',
      amenities: req.body.amenities ? (Array.isArray(req.body.amenities) ? req.body.amenities : req.body.amenities.split(',')) : [],
      images,
      brochureUrl
    });
    
    res.status(201).json({ message: 'Project created successfully!', project: newProject });
    
    // Trigger Alerts Notification (Simulated)
    const interestedUsers = await Alert.find({ $or: [{ city: newProject.city }, { city: 'All' }] });
    if (interestedUsers.length > 0) {
      console.log(`[ALERT] Notifying ${interestedUsers.length} users about new project: ${newProject.title}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.post('/api/projects/bulk', upload.single('csv'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No CSV file uploaded' });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        const projects = results.map(row => ({
          title: row.title,
          type: row.type || 'Flats',
          city: row.city || 'Mumbai',
          price: Number(row.price),
          location: row.location,
          lat: Number(row.lat) || 22.7196,
          lng: Number(row.lng) || 75.8577,
          description: row.description,
          status: row.status || 'Available',
          amenities: row.amenities ? row.amenities.split('|') : [],
          images: row.images ? row.images.split('|') : []
        }));

        await Project.insertMany(projects);
        
        // Trigger Alerts for Bulk (Simplified simulation)
        console.log(`[ALERT] Bulk notification trigger for ${projects.length} new properties`);

        fs.unlinkSync(req.file.path); // Clean up uploaded file
        res.status(201).json({ message: `${projects.length} properties imported successfully!` });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to import CSV data' });
      }
    });
});

app.put('/api/projects/:id', upload.fields([{ name: 'images', maxCount: 5 }, { name: 'brochure', maxCount: 1 }]), async (req, res) => {
  try {
    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const images = req.files['images'] ? req.files['images'].map(file => '/uploads/' + file.filename) : existingProject.images;
    const brochureUrl = req.files['brochure'] ? '/uploads/' + req.files['brochure'][0].filename : existingProject.brochureUrl;

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
      ...req.body,
      amenities: req.body.amenities ? (Array.isArray(req.body.amenities) ? req.body.amenities : req.body.amenities.split(',')) : existingProject.amenities,
      images,
      brochureUrl
    }, { new: true });

    res.json({ message: 'Project updated successfully!', project: updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.patch('/api/projects/:id/featured', async (req, res) => {
  try {
    const { isFeatured } = req.body;
    const project = await Project.findByIdAndUpdate(req.params.id, { isFeatured }, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update featured status' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json({ message: 'Interest submitted securely!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate('projectId').sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.patch('/api/inquiries/:id', async (req, res) => {
  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ message: 'Inquiry updated successfully', inquiry: updatedInquiry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

app.post('/api/inquiries/:id/notes', async (req, res) => {
  try {
    const { content, author } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
    
    inquiry.notes.push({ content, author, createdAt: new Date() });
    await inquiry.save();
    res.json({ message: 'Note added', inquiry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add note' });
  }
});

app.get('/api/analytics', async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const inquiries = await Inquiry.find().populate('projectId');
    const totalInquiries = inquiries.length;
    
    // Calculate leads per property
    const propertyLeads = {};
    inquiries.forEach(inq => {
      if(inq.projectId) {
        const id = inq.projectId._id.toString();
        if(!propertyLeads[id]) {
          propertyLeads[id] = { project: inq.projectId, count: 0 };
        }
        propertyLeads[id].count += 1;
      }
    });

    const topProperties = Object.values(propertyLeads)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(item => ({
         title: item.project.title,
         leads: item.count
      }));
      
    // Because user auth is currently frontend mocked, we simulate a realistic user count 
    // growing proportionally with inquiry submissions for the admin CRM demonstration.
    const totalUsers = 145 + (totalInquiries * 3);
    
    // Mock user growth data for the chart across 6 months
    const userGrowthChart = [
      { month: 'Oct', users: totalUsers - 50 },
      { month: 'Nov', users: totalUsers - 35 },
      { month: 'Dec', users: totalUsers - 20 },
      { month: 'Jan', users: totalUsers - 10 },
      { month: 'Feb', users: totalUsers - 2 },
      { month: 'Mar', users: totalUsers }
    ];

    res.json({
      totalUsers,
      totalInquiries,
      totalProjects,
      topProperties,
      userGrowthChart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

app.post('/api/likes', (req, res) => {
  // We can attach this to a specific User model later, for now just acknowledge
  console.log('Received like for project:', req.body.projectId);
  res.status(200).json({ message: 'Like saved!' });
});

app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // Amount in rupees
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: "receipt_order_" + Date.now()
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Add a simulated payment route for testing/demo
app.post('/api/payment/simulate', async (req, res) => {
  try {
    const { userName, userEmail, userPhone, projectId, amount, membershipPlan } = req.body;
    const newPayment = await Payment.create({
      razorpayOrderId: 'sim_order_' + Date.now(),
      razorpayPaymentId: 'sim_pay_' + Date.now(),
      userName,
      userEmail,
      userPhone,
      projectId: projectId || null,
      membershipPlan: membershipPlan || null,
      amount
    });
    res.status(200).json({ message: 'Simulated payment successful', payment: newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save simulated payment' });
  }
});

app.post('/api/payment/verify', async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      userName, 
      userEmail, 
      userPhone, 
      projectId, 
      amount,
      membershipPlan
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummysecret';
    
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      const newPayment = await Payment.create({
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        userName,
        userEmail,
        userPhone,
        projectId: projectId || null,
        membershipPlan: membershipPlan || null,
        amount
      });
      res.status(200).json({ message: 'Payment verified successfully', payment: newPayment });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});


app.get('/api/payments', async (req, res) => {
  try {
    const payments = await Payment.find().populate('projectId').sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// Visit Routes
app.post('/api/visits', async (req, res) => {
  try {
    const newVisit = await Visit.create(req.body);
    res.status(201).json({ message: 'Visit scheduled successfully!', visit: newVisit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to schedule visit' });
  }
});

app.get('/api/visits', async (req, res) => {
  try {
    const visits = await Visit.find().populate('projectId').sort({ createdAt: -1 });
    res.json(visits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch visits' });
  }
});

app.patch('/api/visits/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedVisit = await Visit.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedVisit) {
      return res.status(404).json({ error: 'Visit not found' });
    }
    res.json({ message: 'Visit status updated', visit: updatedVisit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update visit status' });
  }
});

// Alert Routes
app.post('/api/alerts', async (req, res) => {
  try {
    const newAlert = await Alert.create(req.body);
    res.status(201).json({ message: 'Property alerts activated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to set property alerts' });
  }
});

app.get('/api/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});






// Newsletter Routes
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    await Newsletter.findOneAndUpdate(
      { email },
      { email },
      { upsert: true, new: true }
    );
    res.status(201).json({ message: 'Successfully subscribed to newsletter!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

app.get('/api/newsletter', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

// Catch-all route to serve React app for unresolved routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Partner Lead Routes
app.post('/api/partner-leads', async (req, res) => {
  try {
    const lead = await PartnerLead.create(req.body);
    res.status(201).json({ message: 'Success', lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit' });
  }
});

app.get('/api/partner-leads', async (req, res) => {
  try {
    const leads = await PartnerLead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

app.patch('/api/partner-leads/:id', async (req, res) => {
  try {
    const updated = await PartnerLead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.post('/api/partner-leads/:id/notes', async (req, res) => {
  try {
    const { content, author } = req.body;
    const lead = await PartnerLead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    
    lead.notes.push({ content, author, createdAt: new Date() });
    await lead.save();
    res.json({ message: 'Note added', lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add note' });
  }
});

// Broker Lead Routes
app.post('/api/broker-leads', async (req, res) => {
  try {
    const lead = await BrokerLead.create(req.body);
    res.status(201).json({ message: 'Success', lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.get('/api/broker-leads', async (req, res) => {
  try {
    const leads = await BrokerLead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.patch('/api/broker-leads/:id', async (req, res) => {
  try {
    const updated = await BrokerLead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.post('/api/broker-leads/:id/notes', async (req, res) => {
  try {
    const { content, author } = req.body;
    const lead = await BrokerLead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    
    lead.notes.push({ content, author, createdAt: new Date() });
    await lead.save();
    res.json({ message: 'Note added', lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add note' });
  }
});

// Broadcast / Mass Email Route
app.post('/api/admin/send-mass-email', async (req, res) => {
  try {
    const { subject, message, type } = req.body;
    
    // Fetch all users and newsletter subscribers
    const users = await User.find({}, 'email');
    const subscribers = await Newsletter.find({}, 'email');
    
    const allEmails = [...new Set([
      ...users.map(u => u.email),
      ...subscribers.map(s => s.email)
    ])];

    if (allEmails.length === 0) {
      return res.status(400).json({ error: 'No recipients found' });
    }

    // Modern HTML Email Template
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #c39d63; border-radius: 12px; background-color: #0c0e12; color: #ffffff;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #c39d63; margin: 0; letter-spacing: 2px;">BASERA ASSOCIATES</h1>
          <p style="color: #888; font-size: 0.8rem; text-transform: uppercase;">The Pinnacle of Luxury Real Estate</p>
        </div>
        
        <div style="background: rgba(195, 157, 99, 0.1); padding: 25px; border-radius: 8px; border-left: 4px solid #c39d63;">
          <h2 style="color: #c39d63; margin-top: 0;">${subject}</h2>
          <p style="line-height: 1.6; font-size: 1.1rem; color: #e0e0e0;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="http://basera-associates.com" style="background-color: #c39d63; color: #000; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Explore Now</a>
        </div>
        
        <div style="margin-top: 40px; border-top: 1px solid #333; padding-top: 20px; text-align: center; font-size: 0.8rem; color: #666;">
          <p>&copy; 2026 Basera Associates. All rights reserved.</p>
          <p>Indore | Mumbai | Pune | Delhi | Gurgaon</p>
        </div>
      </div>
    `;

    // Note: In production, you'd use a service like SendGrid/Mailgun or loop with delay to avoid spam filters.
    // For this demo/setup, we'll simulate success if credentials aren't provided.
    
    if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'demo_password_123') {
        const mailOptions = {
          from: `"Basera Associates" <${process.env.EMAIL_USER}>`,
          to: allEmails.join(','),
          subject: subject,
          html: emailHtml
        };
        await transporter.sendMail(mailOptions);
    } else {
        console.log(`[SIMULATION] Mass email would be sent to ${allEmails.length} recipients.`);
        console.log(`Subject: ${subject}`);
    }

    res.json({ message: `Successfully broadcasted to ${allEmails.length} recipients!` });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send broadcast emails' });
  }
});

// Page Content Routes
app.get('/api/page-content', async (req, res) => {
  try {
    const pages = await PageContent.find({}, 'pageName metadata.title');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

app.get('/api/page-content/:pageName', async (req, res) => {
  try {
    const content = await PageContent.findOne({ pageName: req.params.pageName });
    if (!content) return res.status(404).json({ error: 'Page content not found' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch page content' });
  }
});

app.post('/api/page-content', async (req, res) => {
  try {
    const { pageName, sections, metadata } = req.body;
    const content = await PageContent.findOneAndUpdate(
      { pageName },
      { sections, metadata },
      { upsert: true, new: true }
    );
    res.json({ message: 'Page content updated successfully', content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update page content' });
  }
});

// Catch-all route to serve the frontend for any other routes (Express 5 compatible)
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
