import { Router } from "express";
import { User } from "./user-model.js";
import { body, validationResult } from "express-validator";

const router = Router();
const userValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars"),
];

router.post("/", userValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ status: "fail", errors: errors.array() });

  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
});

export default router;
