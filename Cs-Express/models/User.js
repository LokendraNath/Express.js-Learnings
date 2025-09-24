import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  age: { type: Number, require: true },
  email: { type: String, require: true, unique: true },
});

export const User = mongoose.model("User", userSchema);
