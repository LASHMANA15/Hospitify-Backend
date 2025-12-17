const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  try {
    console.log('📥 Received appointment request:', req.body);
    
    const { name, age, phone, email, dept, doctor, date, time, symptoms, priority, userEmail } = req.body;
    
    console.log('🔍 Extracted fields:', { name, age, phone, email, dept, doctor, date, time, symptoms, priority, userEmail });
    
    if (!name || !phone || !email || !dept || !doctor || !date || !time) {
      console.log('❌ Validation failed - missing required fields');
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }
    
    if (!userEmail) {
      console.log('❌ Validation failed - missing userEmail');
      return res.status(400).json({ success: false, message: 'User email is required' });
    }

    const appointmentData = {
      patientName: name,
      age: parseInt(age) || undefined,
      phone,
      email,
      department: dept,
      doctor,
      date: new Date(date),
      time,
      symptoms: symptoms || '',
      priority: priority || 'normal',
      bookedBy: userEmail,
      status: 'pending'
    };
    
    console.log('💾 Creating appointment with data:', appointmentData);
    
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    
    console.log(`✅ Appointment saved successfully:`, appointment._id);
    console.log(`📊 Database: ${appointment.db.name}, Collection: ${appointment.collection.name}`);

    return res.json({ success: true, message: 'Appointment booked successfully', appointment });
  } catch (err) {
    console.error('❌ Appointment creation error:', err);
    console.error('Error details:', err.message);
    if (err.name === 'ValidationError') {
      console.error('Validation errors:', err.errors);
    }
    return res.status(500).json({ success: false, message: 'Server error: ' + err.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    console.log('📡 Fetching all appointments from database...');
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    console.log(`📊 Found ${appointments.length} appointments`);
    console.log('Sample appointment:', appointments[0] || 'No appointments found');
    return res.json({ success: true, appointments });
  } catch (err) {
    console.error('❌ Error fetching appointments:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    return res.json({ success: true, message: 'Status updated successfully', appointment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await Appointment.findByIdAndDelete(id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    return res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { createAppointment, getAppointments, updateAppointmentStatus, deleteAppointment };