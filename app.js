const express = require('express');
const app = express();
const shortid = require('shortid'); // Library for generating short IDs

const urlDatabase = {}; // In-memory database for URL storage

app.use(express.json());

// Create a short URL
app.post('/shorten', (req, res) => {
  const longUrl = req.body.longUrl;
  const shortUrl = shortid.generate();
  urlDatabase[shortUrl] = longUrl;
  res.json({ shortUrl });
});

// Redirect to the long URL
app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const longUrl = urlDatabase[shortUrl];
  if (longUrl) {
    res.redirect(301, longUrl);
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
