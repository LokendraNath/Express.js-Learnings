import express from "express";
const app = express();

app.get("/", (req, res) => res.send("Hello World"));

app.get("/hello", (req, res) => res.send("route hello"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Port Listining on ${PORT}`);
});
