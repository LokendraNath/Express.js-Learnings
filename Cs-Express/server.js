import express from "express";
const app = express();
const PORT = 8000;

//* Simple Route
app.get("/", (req, res) => {
  res.send("hello");
});

//* Multiple Route Parameter
app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.send({
    userId,
    postId,
  });
});

//* Catch-All Invalid Routes
app.get((req, res) => {
  res.send("Sorry, this is invalid URL");
});

app.listen(PORT, () => {
  console.log(`Listining on Port ${PORT}`);
});
