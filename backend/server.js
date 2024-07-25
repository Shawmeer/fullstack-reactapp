const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection configuration
const dbConfig = {
  host: 'mysql',
  user: 'samir',
  password: 'Password@01',
  database: 'react'
};

let db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig);

  db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds
    } else {
      console.log('Connected to MySQL');
    }
  });

  db.on('error', err => {
    console.error('MySQL error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED') {
      handleDisconnect(); // Reconnect if the connection is lost or refused
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// API endpoint to receive data
app.post('/api/submit', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const query = 'INSERT INTO your_table(name) VALUES (?)'; // Replace 'your_table' with your actual table name
  db.query(query, [name], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Server error');
    }

    res.send('Data received successfully');
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to my backend server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
