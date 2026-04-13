"use strict";
 
const express = require('express');
const app = express();

let messages = [
  { id: 1, text: "Welcome to the message board!", author: "Admin" },
];
let nextId = 2;

 
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

app.get('/api/headers', (req, res) => {
  res.json(req.headers);
});

app.get('/api/messages', (req, res) => {
  res.type('json').send(messages);
});


app.post('/api/messages', (req, res) => {
  const text = req.body.text;
  const author = req.body.author;

  if (!text || !author) {
    return res.status(400).json({ error: 'text and author are required' });
  }

  const message = {
    id: nextId,
    text,
    author
  };

  messages.push(message);
  nextId++;

  res.status(201).json(message);
});
 
 
// ---- Your endpoints go above this line ----
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

