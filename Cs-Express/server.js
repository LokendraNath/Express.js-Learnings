import express from "express";
const app = express();
const PORT = 8000;

app.use(express.urlencoded());

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

//* Handling Form Data
app.post("/form", (req, res) => {
  console.log(req.body);
  res.send("Form Recieved");
});

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
