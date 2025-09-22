import { Router } from "express";
import { User } from "./user-modle.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await User.create({
    name,
    email,
    password,
  });

  console.log(result);

  res.status(201).json({ id: result._id });
});

export default router;
