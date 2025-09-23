import { Router } from "express";
import { User } from "./user-model.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

const router = Router();

// Dynamic Parameter
router.get("/:userId", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

const userValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

//* /api/users/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      //* Check Email in DB
      const user = await User.findOne({ email });

      //* Check if user not found
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      //* Check User Password In Hash
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // JSON Token (JWT)
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });

      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", userValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "fail", errors: errors.array() });
    }

    const { name, email, password } = req.body;

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
