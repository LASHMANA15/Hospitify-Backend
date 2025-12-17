const bcrypt = require('bcrypt');
const Signup = require('../models/User');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

const signupUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const existing = await Signup.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new Signup({ fullName, email, password: hashed });
    await user.save();

    console.log(`✅ User saved to database: ${user.db.name}, collection: ${user.collection.name}`);
    console.log(`📧 Email: ${email}`);

    return res.json({ success: true, message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    return res.json({ 
      success: true, 
      message: 'Login successful', 
      user: { id: user._id, fullName: user.fullName, email: user.email } 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }
    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Email not found' });
    }

    const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.password = hashed;
    await user.save();

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { signupUser, loginUser, resetPassword };