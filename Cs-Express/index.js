import express from "express";
import router from "./route.js";
const app = express();

// Simple Route
app.get("/", (req, res) => {
  res.send("hello");
});

// jab bhi koi request /user se start hogi, usko us router file me bhej do.
app.use("/user", router);

// Authenticate Route
app.get("/user/login", userLogin);
app.get("/user/signup", userSignup);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
