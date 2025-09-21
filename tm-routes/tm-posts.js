import express from "express";
const router = express.Router();

// Woring With Json
const series = [
  { id: 1, title: "Stranger Things" },
  { id: 2, title: "Succession" },
  { id: 3, title: "Breking Bad" },
];

// Get All Posts
router.get("/", (req, res) => {
  const userLimit = parseInt(req.query.limit);

  if (!isNaN(userLimit) && userLimit > 0) {
    return res.status(200).json(series.slice(0, userLimit));
  }
  res.status(200).json(series);
});

// Get Single Posts
router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const post = series.find((s) => s.id === userId);
  if (!post) {
    return res.status(404).json({ message: `A Post is not Found ${userId}` });
  }
  res.status(200).json(post);
});

export default router;
