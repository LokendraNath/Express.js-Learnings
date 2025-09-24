import express from "express";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = 8000;
await connectDB();

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
