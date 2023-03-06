// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import userRouter from './routers/user.router';
import videoRouter from './routers/video.router';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './data-source';

// Initialize the express engine
const app: express.Application = express();

// Use the built-in JSON body parsing middleware
app.use(express.json());

app.use(cors());

// Take a port 3000 for running server.
const port = process.env.PORT || 3000;

// Top Level Routes
app.use('/videos', videoRouter);
app.use('/user', userRouter);

// Server setup
app.listen(port, () => {
  console.log(`Run with:
         http://localhost:${port}/`);
});

// Getting database connection ready
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
