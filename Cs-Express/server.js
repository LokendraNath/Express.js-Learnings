import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";

const app = express();

//* Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: "sample-session",
    resave: false,
    saveUninitialized: false,
  })
);

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
  req.session.user = user;
  res.send("User Login Successfully");
});
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.send("Unauthorize User");
  }
  res.send(`Welcome , ${req.session.user.username}`);
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listining on Port ${PORT}`));
