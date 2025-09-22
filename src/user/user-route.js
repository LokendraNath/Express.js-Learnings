import { Router } from "express";
import { User } from "./user-modle.js";

const router = Router();

router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate Request
  if (!name || !email || !password) {
    const error = new Error("All Field are required");
    error.statusCode = 400;
    next(error);
    // res.status(404).json({ msg: "All Feild Required" });
    return;
  }

  const result = await User.create({
    name,
    email,
    password,
  });

  console.log(result);

  res.status(201).json({ id: result._id });
});

export default router;
