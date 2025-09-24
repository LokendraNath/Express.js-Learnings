import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    age: { type: Number, require: true },
    email: { type: String, require: true, unique: true },
    userOrder: { type: Object, default: {} },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

export const User = mongoose.model("User", userSchema);
