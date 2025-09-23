import express from "express";
const app = express();

//? Controllers
import { searchController, userNameController } from "./controller.js";

// Simple Route
app.get("/", (req, res) => {
  res.send("hello");
});

// Dynamic Routes
app.get("/user/:userid", userNameController);

// Query => /search?keyword=something
app.get("/search", searchController);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
