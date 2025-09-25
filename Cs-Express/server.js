import cookieParser from "cookie-parser";
import express from "express";

const app = express();

//* Middleware
app.use(cookieParser());

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listining on Port ${PORT}`));
