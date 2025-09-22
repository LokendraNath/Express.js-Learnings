import express from "express";
const app = express();

// Inbuilt Middlware (Global Middle Ware)
app.use(express.json());

// Custom Middleware (Gloabal Middleware)
const reqLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  // har req pe chalege -> POST /api/users 2025-09-22T06:15:56.132Z
  next();
};

//? Pure App me lagane ke liye
// app.use(reqLogger);

//Post Request
app.post("/api/users", reqLogger, (req, res) => {
  console.log("body", req.body);
  res.json({});
});

app.get("/", (req, res) => res.send("Hello World"));
app.get("/hello", (req, res) => res.send("route hello"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Port Listining on ${PORT}`);
});
