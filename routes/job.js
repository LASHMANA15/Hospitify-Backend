const express = require('express');
const router = express.Router();
const { applyJob, getJobApplications, updateApplicationStatus, deleteJobApplication, createJob, getAllJobs, updateJob, deleteJob } = require('../controllers/jobController');

router.post('/apply', applyJob);
router.get('/applications', getJobApplications);
router.put('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteJobApplication);

router.post('/create', createJob);
router.get('/all', getAllJobs);
router.put('/job/:id', updateJob);
router.delete('/job/:id', deleteJob);

module.exports = router;