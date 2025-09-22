import mongoose from "mongoose";

// Create Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Create Modle
export const User = mongoose.model("User", userSchema);
