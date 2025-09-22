import { Router } from "express";
import { User } from "./user-model.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

const router = Router();

const userValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

router.post("/", userValidation, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "fail", errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Duplicate email check
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ status: "fail", message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hash });

    // Omit password field from response
    const { password: pwd, ...userWithoutPwd } = user.toObject();

    res.status(201).json({ status: "success", data: userWithoutPwd });
  } catch (error) {
    next(error);
  }
});

export default router;
