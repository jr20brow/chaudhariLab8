"use strict";
 
const express = require('express');
const app = express();
 
// Serve static files from the 'public' folder
app.use(express.static('public'));
 
// Parse JSON request bodies (needed for POST)
app.use(express.json());
 
// ---- Your endpoints go below this line ----
 app.get('/hello', (req, res) => {
  res.type('text').send('Hello from the server!');
});

 app.get('/api/time', (req, res) => {
  res.json({
    currentTime: new Date().toISOString(),
    message: "Current server time"
  });
});

 app.get('/api/greet/:name', (req, res) => {
  res.json({
    greeting: "Hello, " + req.params.name + "! Welcome to the API."
  })
});

 app.get('/api/math/', (req, res) => {
  res.json({
    
  })
});

app.get('/api/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      message: "Sorry for the wait!",
      delayMs: 3000
    });
  }, 3000);
});

app.get('/api/unreliable', (req, res) => {
  const rand = Math.random();
  if (rand < 0.5) {
    res.status(500).json({
      error: "Server had a bad day. Try again!"
    });
  } else {
    res.json({
      message: "Lucky! It worked this time.",
      luckyNumber: Math.floor(Math.random() * 100)
    });
  }
});

 
 
// ---- Your endpoints go above this line ----
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
