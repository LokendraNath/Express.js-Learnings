import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";

const app = express();

//* Middleware
app.use(cookieParser());
app.use(
  session({
    secret: "sample-session",
    resave: false,
    saveUninitialized: false,
  })
);

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/visit", (req, res) => {
  if (req.session.page_views) {
    //* multitime visited
    req.session.page_views++;
    res.send(`You Visited this page ${req.session.page_views} times`);
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time !");
  }
});
app.get("/remove-session", (req, res) => {
  req.session.destroy();
  res.send("Session will removed");
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listining on Port ${PORT}`));
