import express from "express";
import mongoose from 'mongoose'
import "../loadEnvironment.mjs";

const app = express();

await mongoose.connect(process.env.ATLAS_URI);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5000);