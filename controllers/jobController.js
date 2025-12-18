const JobApplication = require('../models/JobApplication');
const Job = require('../models/Job');

const applyJob = async (req, res) => {
  try {
    const { jobTitle, applicantName, email, phone, experience, qualification, department, coverLetter, expectedSalary, availableFrom, userEmail } = req.body;
    
    if (!jobTitle || !applicantName || !email || !phone || !experience || !qualification || !department) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const application = new JobApplication({
      jobTitle,
      applicantName,
      email,
      phone,
      experience,
      qualification,
      department,
      coverLetter: coverLetter || '',
      expectedSalary: expectedSalary || '',
      availableFrom: availableFrom ? new Date(availableFrom) : new Date(),
      appliedBy: userEmail
    });

    await application.save();
    console.log(`✅ Job application: ${applicantName} applied for ${jobTitle}`);

    return res.json({ success: true, message: 'Application submitted successfully', application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    return res.json({ success: true, applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const application = await JobApplication.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    return res.json({ success: true, message: 'Status updated successfully', application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await JobApplication.findByIdAndDelete(id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    return res.json({ success: true, message: 'Application deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, location, experience, type, salary, description, image, department, requirements, responsibilities } = req.body;
    
    if (!title || !location || !experience || !type || !salary || !description || !image) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const job = new Job({
      title,
      location,
      experience,
      type,
      salary,
      description,
      image,
      department: department || location,
      requirements: requirements || [],
      responsibilities: responsibilities || []
    });

    await job.save();
    console.log(`✅ Job created: ${title}`);

    return res.json({ success: true, message: 'Job created successfully', job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    return res.json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    return res.json({ success: true, message: 'Job updated successfully', job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    return res.json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { applyJob, getJobApplications, updateApplicationStatus, deleteJobApplication, createJob, getAllJobs, updateJob, deleteJob };