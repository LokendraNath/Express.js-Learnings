import express from "express";
const app = express();
const PORT = 8000;

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
