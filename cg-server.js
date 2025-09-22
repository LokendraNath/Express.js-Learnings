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
  // console.log("body", req.body);
  throw new Error("Error AA gya bc"); // fake error
  res.json({});
});

app.get("/", (req, res) => res.send("Hello World"));
app.get("/hello", (req, res) => res.send("route hello"));

// Errr Handling Middleware
app.use((err, req, res, next) => {
  console.log(err.stack);

  res.status(500).json({ message: "Something Went Wrong" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Port Listining on ${PORT}`);
});
