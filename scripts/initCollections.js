require('dotenv').config();
const mongoose = require('mongoose');
const Signup = require('../models/User');
const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');
const MedicalProduct = require('../models/MedicalProduct');

const initCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to hospitify database');

    // Create collections by inserting and removing a dummy document
    await Signup.create({ fullName: 'temp', email: 'temp@temp.com', password: 'temp' });
    await Signup.deleteOne({ email: 'temp@temp.com' });

    await Appointment.create({ patientName: 'temp', email: 'temp@temp.com', phone: '123', department: 'temp', doctor: 'temp', date: new Date(), time: '10:00' });
    await Appointment.deleteOne({ email: 'temp@temp.com' });

    await Contact.create({ name: 'temp', email: 'temp@temp.com', phone: '123', subject: 'temp', message: 'temp' });
    await Contact.deleteOne({ email: 'temp@temp.com' });

    await MedicalProduct.create({ name: 'temp', category: 'temp', description: 'temp', price: 0, manufacturer: 'temp' });
    await MedicalProduct.deleteOne({ name: 'temp' });

    console.log('Collections created successfully:');
    console.log('- signups');
    console.log('- appointments');
    console.log('- contact');
    console.log('- medical_products');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

initCollections();