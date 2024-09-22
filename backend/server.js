const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cors = require('cors');
const aptolizeRoutes = require('./routes/aptolizeRoutes');

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors());
// Connect to MongoDB
connectDB();

// Routes
app.use('/api', authRoutes);
app.use('/api/aptolize', aptolizeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
