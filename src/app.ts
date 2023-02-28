import express from 'express';

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port = 3000;

// Handling '/' Request
app.get('/', (req, res) => {
  res.send('TypeScript With Express');
});

// Server setup
app.listen(port, () => {
  console.log(`Run with:
         http://localhost:${port}/`);
});
