import express from "express";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";

const app = express();
const PORT = 8000;
await connectDB();

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

//* Post Method
app.post("/user", express.json(), async (req, res) => {
  const { name, email, age } = req.body;
  const newUser = new User({
    name,
    age,
    email,
  });
  await newUser.save();
  console.log(newUser);
  res.send("User Added Successfully");
});

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
