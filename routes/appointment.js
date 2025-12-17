const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointmentStatus, deleteAppointment } = require('../controllers/appointmentController');

// Test route
router.get('/test', (req, res) => {
  console.log('📡 Appointment routes are working!');
  res.json({ success: true, message: 'Appointment routes are working!' });
});

router.post('/book', createAppointment);
router.get('/all', getAppointments);
router.put('/:id/status', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

module.exports = router;