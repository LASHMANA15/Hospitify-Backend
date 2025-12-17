require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to hospitify database');

    const email = 'suryasekar626@gmail.com';
    const password = 'surya@1234';
    const fullName = 'Surya Sekar';

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ fullName, email, password: hashed });

    console.log('Admin created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();