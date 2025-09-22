import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  //* yaha par "/" kyoki server me already /api/users dala hai to extra dalenge to extra ho jayega
  res.json({ msg: "All good" });
});

export default router;
