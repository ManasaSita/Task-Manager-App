const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection (MongoDB example)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tasks', taskRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Task Management API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});