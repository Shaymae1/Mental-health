// server.js

import express, { Request, Response } from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';

const app = express();
const port = process.env.PORT || 3000; 

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle form submission
app.post('/api/signup', async (req, res) => {
  const formData = req.body;

  try {
    // Hash password before storing in database
    const hashedPassword = await bcrypt.hash(formData.password, 10); // Hash password with salt rounds = 10

    // Insert into MySQL database
    const sql = 'INSERT INTO users (firstName, lastName, email, passwordconfirm, password) VALUES (?, ?, ?, ?, ?)';
    const values = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.passwordconfirm,
      hashedPassword, // Store hashed password in database
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        res.status(500).json({ success: false, error: 'Error inserting into database' });
      } else {
        console.log('Inserted into database:', result);
        res.status(200).json({ success: true, message: 'User registered successfully' });
      }
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ success: false, error: 'Error hashing password' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:5500`);
});
