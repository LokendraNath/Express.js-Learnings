import { Router } from "express";
import { User } from "./user-model.js";
import { body, validationResult } from "express-validator";

const router = Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      const user = await User.create({ name, email, password });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
