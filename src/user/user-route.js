import { Router } from "express";
import { User } from "./user-model.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

const userValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

//* Validate Email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

//* /api/users/login
router.post(
  "/login",
  [body("email").isEmail().withMessage("Valid email required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    //* Email Validate
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email Formate" });
    }
    //* Check Email in DB
    const user = await User.findOne({
      email,
    });
    //* Check if user not found throw email
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    //* Check User Password In Hash
    const matched = await bcrypt.compare(password, user.password); // True of False
    if (!matched) {
      return res.status(400).json({ message: "User Not Match" });
    }

    // JSON Token (JWT)
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24",
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
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
