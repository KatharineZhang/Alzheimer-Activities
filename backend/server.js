const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import CORS
const app = express();
const port = 3001;

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hackathon2025!!',
  database: 'hack',
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
app.use(cors()); // This allows cross-origin requests

// Set up multer to store images on disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    // Ensure the uploads folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });  // Create folder recursively
      console.log('Uploads folder created');
    } else {
      console.log('Uploads folder already exists');
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp as filename
  },
});

const upload = multer({ storage: storage });

// Middleware to parse JSON bodies (needed for form data like activity)
app.use(express.json());

// Route for uploading an image
app.post('/upload', upload.single('image'), (req, res) => {
  const { activity } = req.body; // Get activity from request body
  const imageName = req.file.filename; // Get the stored file name

  if (!activity) {
    return res.status(400).send('Activity is required');
  }

  // Insert image data into the database
  const query = 'INSERT INTO images (image_name, activity) VALUES (?, ?)';
  db.query(query, [imageName, activity], (err, result) => {
    if (err) {
      console.error('Error saving image to database:', err);
      return res.status(500).send('Error saving image to database');
    }
    res.status(200).send('Image uploaded successfully');
  });
});

// Endpoint to get images from the database
app.get('/images', (req, res) => {
  const query = 'SELECT * FROM images';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching images:', err);
      return res.status(500).json({ message: 'Error fetching images', error: err });
    }
    res.status(200).json({ images: results });
  });
});

// Static file serving for uploaded images
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
