// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import videoRouter from './routers/video.router';
import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './data-source';

// Initialize the express engine
const app: express.Application = express();

// Use the built-in JSON body parsing middleware
app.use(express.json());

// Take a port 3000 for running server.
const port = 3000;

app.use('/videos', videoRouter);

// Server setup
app.listen(port, () => {
  console.log(`Run with:
         http://localhost:${port}/`);
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
