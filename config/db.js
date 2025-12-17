const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  try {
    // Disconnect any existing connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('Disconnected from previous MongoDB connection');
    }

    await mongoose.connect(mongoUri, {
      // mongoose 7+ has good defaults
    });
    
    console.log('MongoDB connected');
    console.log(`🔗 Connected to database: ${mongoose.connection.db.databaseName}`);
    console.log(`📍 Connection URI: ${mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
