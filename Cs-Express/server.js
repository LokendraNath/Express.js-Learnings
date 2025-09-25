import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({
    username,
    email,
    password: hashedPassword,
  });
  res.send("User Registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send("You are not authorized");
  }
  const token = jwt.sign(
    { username: user.username, email: user.email },
    "test#secret"
  );
  res.send({ token });
});
app.get("/dashboard", (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.send("no token provided");

  try {
    const decodedToken = jwt.verify(token, "test#secret");
    res.send(`Welcom ${decodedToken.username}`);
  } catch (error) {
    res.send("Access Denied");
  }
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listining on Port ${PORT}`));
