const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  age: { type: Number },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  symptoms: { type: String },
  priority: { type: String, enum: ['normal', 'urgent', 'emergency'], default: 'normal' },
  bookedBy: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema, 'appointments');