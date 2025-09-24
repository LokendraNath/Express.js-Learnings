import express from "express";
import multer from "multer";
import { storage } from "./config/multer.js";

const app = express();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024000,
  },
});
const PORT = 8000;

app.use(express.urlencoded()); // for url encoded form data
app.use(upload.single("image")); // for simple form data

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

//* Handling Form Data
app.post("/form", (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("Form Recieved");
});

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
