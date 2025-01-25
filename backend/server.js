const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const { mysqlConnection } = require('./config/db');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

const app = express();

// Middleware for handling JSON data
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Image upload routes
app.use('/api/images', imageRoutes);

// Set up the database connection
mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
