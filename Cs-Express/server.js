import cookieParser from "cookie-parser";
import express from "express";

const app = express();

//* Middleware
app.use(cookieParser());

//* Simple Route
app.get("/", (req, res) => {
  res.cookie("appName", "vs-code", { maxAge: 360000 });
  res.send("Hello");
});

//* Get Data From Cookie
app.get("/fetch", (req, res) => {
  console.log(req.cookies);
  res.send("Api Called");
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listining on Port ${PORT}`));
