const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'https://task-manager-app-taupe.vercel.app',
      'https://task-manager-app-taupe.vercel.app/' // With trailing slash
    ];
    
    // Add your Render URL too if accessed directly
    if (process.env.CLIENT_URL) {
      allowedOrigins.push(process.env.CLIENT_URL);
      // Also add version without trailing slash
      if (process.env.CLIENT_URL.endsWith('/')) {
        allowedOrigins.push(process.env.CLIENT_URL.slice(0, -1));
      } else {
        allowedOrigins.push(`${process.env.CLIENT_URL}/`);
      }
    }
    
    // Check if origin is allowed
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit process if DB connection fails
  });

// Routes
app.get("/", (req, res) => {
  res.send("Task Management API is running");
});

app.use("/auth", authRoutes);
app.use('/api/tasks', taskRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
