import express from "express";
const app = express();

// JSON Data pars (Global Middle Ware)
app.use(express.json());

// Custom Middleware (Gloabal Middleware)
const reqLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  // har req pe chalege -> POST /api/users 2025-09-22T06:15:56.132Z
  next();
};

app.use(reqLogger);

app.get("/", (req, res) => res.send("Hello World"));

app.get("/hello", (req, res) => res.send("route hello"));

//Post Request
app.post("/api/users", (req, res) => {
  console.log("body", req.body);
  res.json({});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Port Listining on ${PORT}`);
});
