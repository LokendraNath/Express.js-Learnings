import express from "express";
const app = express();
const PORT = 8000;

//? app dekh sakte ho online file ko
app.use(express.static("public"));
app.use(express.static("images")); // Ek aur dalna hai to

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
