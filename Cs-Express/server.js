import express from "express";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";

const app = express();
app.use(express.json());
const PORT = 8000;
await connectDB();

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

//* Saving Data in MongoDB => Post Method
app.post("/user", async (req, res) => {
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

//* Update Data in MongoDB =>  PUT Method
app.put("/user", async (req, res) => {
  const { email, name } = req.body;
  const matchUser = User.find({ email, name });
  console.log(matchUser);
  res.send("User Update Successfully");
});

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
