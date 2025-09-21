import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT;

/*
// // With Static Page
// app.use(express.static(path.join(__dirname, "public")));
*/

// Woring With Json
const series = [
  { id: 1, title: "Stranger Things" },
  { id: 2, title: "Succession" },
  { id: 3, title: "Breking Bad" },
];
// Get All Posts
app.get("/api/series", (req, res) => {
  const userLimit = parseInt(req.query.limit);

  if (!isNaN(userLimit) && userLimit > 0) {
    return res.status(200).json(series.slice(0, userLimit));
  }
  res.status.json(series);
});

// Get Single Posts
app.get("/api/series/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const post = series.find((s) => s.id === userId);
  if (!post) {
    return res.status(404).json({ message: `A Post is not Found ${userId}` });
  }
  res.status(200).json(post);
});

/*
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "home.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });
*/

app.listen(port, () => console.log(`App Listining On Port ${port}`));
