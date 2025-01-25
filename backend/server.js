const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { Buffer } = require('buffer');

const app = express();
const port = 3001;

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hackathon2025!!', // Replace with your password
  database: 'hack', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

// Enable CORS for all routes
app.use(cors());

// Set up multer storage configuration for file handling
const storage = multer.memoryStorage(); // Store images in memory as Buffer
const upload = multer({ storage: storage });

// Middleware to parse JSON bodies
app.use(express.json());

// Upload route to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  const { activity } = req.body;  // Get activity from request body
  const imageData = req.file.buffer; // Get image file as buffer
  const imageName = req.file.originalname; // Get the original image file name

  if (!activity || !imageData) {
    return res.status(400).send('Activity and image are required');
  }

  // Insert image data into the database
  const query = 'INSERT INTO images (image_name, activity, image_data) VALUES (?, ?, ?)';
  db.query(query, [imageName, activity, imageData], (err, result) => {
    if (err) {
      console.error('Error saving image to database:', err);
      return res.status(500).send('Error saving image to database');
    }
    res.status(200).send('Image uploaded successfully');
  });
});

// Static file serving for uploaded images (if you want to serve them later)
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
