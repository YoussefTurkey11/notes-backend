import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const DB_URL = process.env.DB_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error MongoDB connecting: ", error);
    process.exit(1);
  }
};
