import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 8000;
dotenv.config();
const uri = process.env.MONGO_URI;

//* Connect Database
await mongoose.connect(uri).then(() => {
  console.log("Connected To Database");
});

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
