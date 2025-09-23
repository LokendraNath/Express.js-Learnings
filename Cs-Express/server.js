import express from "express";
const app = express();
const PORT = 8000;

//* Set EJS as the View Engine
app.set("view engine", "ejs");

//* Simple Route
app.get("/", (req, res) => {
  const userName = "Falana Dimkana";
  res.render("index", { userName });
});

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
