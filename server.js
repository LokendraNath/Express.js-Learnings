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
    res.json(series.slice(0, userLimit));
  } else {
    res.json(series);
  }
});

// Get Single Posts
app.get("/api/series/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  res.json(series.filter((s) => s.id === userId));
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
