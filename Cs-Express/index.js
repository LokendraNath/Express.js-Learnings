import express from "express";

const app = express();

// Simple Route
app.get("/", (req, res) => {
  res.send("hello");
});

// Dynamic Routes
app.get("/user/:userid", (req, res) => {
  const userId = req.params.userid;
  res.send(`Welcom User ${userId}`);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
