import express from "express";
const app = express();

//* Middleware
app.use(express.json());

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listining on Port ${PORT}`));
