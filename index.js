const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./message.db');

const app = express();

const port = 7000;

// Serve static files from the public folder
app.use(express.static('public'));

// Parse JSON request bodies
app.use(express.json());

// Open the SQLite3 database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the messages database.');
  });
});

// API endpoint for adding a message
app.post('/api/message', (req, res) => {
  const { username, message } = req.body;

  // Insert the message into the database
  db.run(`INSERT INTO messages (username, message) VALUES (?, ?)`, [username, message], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log(`A new message has been added with rowid ${this.lastID}`);
      res.status(200).json({ username: username, message: message });
    }
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
