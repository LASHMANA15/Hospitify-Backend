const express = require('express');
const router = express.Router();
const { applyJob, getJobApplications, updateApplicationStatus, deleteJobApplication } = require('../controllers/jobController');

router.post('/apply', applyJob);
router.get('/applications', getJobApplications);
router.put('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteJobApplication);

module.exports = router;