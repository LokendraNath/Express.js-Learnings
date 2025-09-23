import express from "express";
import multer from "multer";

const app = express();
const upload = multer();
const PORT = 8000;

app.use(express.urlencoded()); // for url encoded form data
app.use(upload.array()); // for simple form data

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
