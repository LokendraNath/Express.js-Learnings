import express from "express";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";

const app = express();
app.use(express.json());
const PORT = 8000;

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

//* Saving Data in MongoDB => Post Method
app.post("/user", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({
      name,
      age,
      email,
    });
    await newUser.save();
    console.log(newUser);
    res.send("User Added Successfully");
  } catch (error) {
    res.send(error.message);
  }
});

//* Update Data in MongoDB =>  PUT Method
app.put("/user", async (req, res) => {
  const { id } = req.body;
  // const matchUser = await User.find({ email, name });
  const matchUser = await User.findByIdAndUpdate(id, { age: "69" });
  await matchUser.save();

  console.log(matchUser);
  res.send("User Update Successfully");
});

//* Delete Data in MongoDB =>  DELETE Method
app.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  res.send("User Deleted");
});

await connectDB().then(() => {
  app.listen(PORT, () => console.log(`Listining on Port ${PORT}`));
});
