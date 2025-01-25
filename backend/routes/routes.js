const express = require('express');
const multer = require('multer');
const path = require('path');
const { mysqlConnection } = require('../config/db');

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ storage: storage });

// Endpoint to upload an image
router.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;

  // Save the image path in the database
  mysqlConnection.query('INSERT INTO images (path) VALUES (?)', [imagePath], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading image', error: err });
    }
    res.status(200).json({ message: 'Image uploaded successfully', imageId: result.insertId });
  });
});

// Endpoint to get images from the database
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM images', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching images', error: err });
    }
    res.status(200).json({ images: results });
  });
});

module.exports = router;
