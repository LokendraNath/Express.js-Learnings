import express from "express";

const app = express();

// Simple Route
app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
