const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  image: { type: String },
  syllabus: [{ type: String }],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  enrolledStudents: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema, 'courses');