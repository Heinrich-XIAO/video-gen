const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

// Serve the static files from the frontend (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Route to get the script data from script.txt
app.get('/get-script', (req, res) => {
  // Read the script.txt file
  fs.readFile(path.join(__dirname, 'script.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).json({ error: 'Failed to read file' });
    }

    // Process the file data into an array of objects
    const lines = data.split('\n');
    const messages = lines.map(line => {
      const parts = line.split(':');
      const person = parts[0].trim().toLowerCase() === 'person a' ? 'a' : 'b';
      const message = parts.slice(1).join(':').trim();
      return { person, message };
    });

    res.json(messages); // Send the processed data as JSON
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

