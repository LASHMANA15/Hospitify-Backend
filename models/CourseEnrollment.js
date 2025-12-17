const mongoose = require('mongoose');

const courseEnrollmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String },
  enrolledBy: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  enrollmentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' }
});

module.exports = mongoose.model('CourseEnrollment', courseEnrollmentSchema, 'courseenrollments');