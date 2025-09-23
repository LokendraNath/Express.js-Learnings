import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRouter from "./src/user/user-route.js";

dotenv.config();
const app = express();

//* Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
});

//* Routes
app.use("/api/users", userRouter);
app.get("/", (req, res) => res.send("Hello World"));
app.get("/hello", (req, res) => res.send("route hello"));

//* Error handler
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ status: "error", message: err.message });
});

//* Start server after DB connection
const PORT = process.env.PORT || 8000;
const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
};

startServer();
