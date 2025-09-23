import express from "express";
import { userLogin, userSignup } from "./controller.js";
const app = express();

// Simple Route
app.get("/", (req, res) => {
  res.send("hello");
});

// Authenticate Route
app.get("/user/login", userLogin);
app.get("/user/signup", userSignup);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
