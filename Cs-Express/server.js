import express from "express";
import router from "./route.js";
const app = express();

//* Simple Route
app.get("/", (req, res) => {
  res.send("hello");
});

//* jab bhi koi request /user se start hogi, usko us router file me bhej do.
app.use(express.json());
app.use("/user", router);

//* Create Post Route
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  res.json({
    message: `Welcome ${name} , your email is ${email}`,
  });
});

//* Create Put Method

// Dummy data
const dummyUsers = [
  { id: 1, name: "Hritik" },
  { id: 2, name: "Rohit" },
  { id: 1, name: "Ronalod" },
];

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;

  const user = dummyUsers.find((u) => u.id === parseInt(userId));

  if (!user) return res.status(400).send("User Not Found");

  user.name = name;
  res.send(name);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
