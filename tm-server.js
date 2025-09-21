import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 8000;
import posts from "./tm-routes/tm-posts.js";

// Routes
app.use("/api/posts", posts);

/*
// // With Static Page
// app.use(express.static(path.join(__dirname, "public")));
*/

/*
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "home.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });
*/

app.listen(port, () => console.log(`App Listining On Port ${port}`));
