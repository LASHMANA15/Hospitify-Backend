const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  experience: { type: String, required: true },
  qualification: { type: String, required: true },
  department: { type: String, required: true },
  coverLetter: { type: String },
  resume: { type: String }, // URL or file path
  expectedSalary: { type: String },
  availableFrom: { type: Date },
  status: { type: String, enum: ['pending', 'reviewing', 'shortlisted', 'rejected', 'hired'], default: 'pending' },
  appliedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema, 'jobapplications');