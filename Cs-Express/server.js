import express from "express";
const app = express();

//* Middleware
app.use(express.json());

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

const users = [];

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  users.push({
    username,
    email,
    password,
  });
  res.send("User Registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || user.password !== password) {
    return res.send("You are not authorized");
  }
});
app.get("/dashboard", (req, res) => {});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listining on Port ${PORT}`));
