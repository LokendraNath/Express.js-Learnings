import express from "express";
import router from "./route.js";
const app = express();

// Simple Route
app.get("/", (req, res) => {
  res.send("hello");
});

// jab bhi koi request /user se start hogi, usko us router file me bhej do.
app.use("/user", router);

// Create Post Route
app.post("/users", express.json(), (req, res) => {
  const { name, email } = req.body;
  res.json({
    message: `Welcome ${name} , your email is ${email}`,
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
