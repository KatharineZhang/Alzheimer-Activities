// chatgpt assisted creation of this code!
import {mysqlConnection as db} from './config/db';
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();
const port = 3001;  // Port for the server to listen on

// Set up MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,  // MySQL server address (usually localhost)
    user: process.env.DB_USER,  // Your MySQL username
    password: process.env.DB_PASSWORD,  // Your MySQL password
    database: process.env.DB_NAME  // Your MySQL database name
  });
  
  // Connect to the database
  db.connect((err) => {
    if (err) {
      console.error('Could not connect to MySQL:', err);
    } else {
      console.log('Connected to MySQL!');
    }
  });
  
  // Set up multer (for file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for uploading an image
app.post('/upload', upload.single('image'), (req, res) => {
    const imageData = req.file.buffer;  // Get image data from the request
    const imageName = req.file.originalname;  // Get original image name
  
    const query = 'INSERT INTO images (image_data, image_name) VALUES (?, ?)';
    db.query(query, [imageData, imageName], (err, result) => {
      if (err) {
        return res.status(500).send('Error saving image to database');
      }
      res.send('Image uploaded successfully');
    });
  });
  
  // Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });