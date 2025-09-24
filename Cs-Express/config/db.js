import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URI;

//* Connect Database
export const connectDB = async () => {
  await mongoose.connect(uri).then(() => {
    console.log("Connected To Database");
  });
};
