import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes.js';

const app = express();

app.use(cors());
app.use(express.json());

//use endpoints defined in routes.js
app.use('/', routes);

mongoose.connect(process.env.ATLAS_URI).then(() => {
  console.log('listening on port 5000');
  app.listen(5000);
});