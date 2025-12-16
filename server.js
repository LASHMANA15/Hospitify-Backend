require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // parse JSON body

// connect DB
connectDB(process.env.MONGO_URI);

// routes
app.use('/api/auth', authRoutes);
// basic health
app.get('/', (req, res) => res.send('Hospitify backend running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
