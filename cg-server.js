import express from "express";
const app = express();

// JSON Data pars
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));

app.get("/hello", (req, res) => res.send("route hello"));

//Post Request
app.post("/api/users", (req, res) => {
  console.log("body", req.body.name);
  res.json({});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Port Listining on ${PORT}`);
});
