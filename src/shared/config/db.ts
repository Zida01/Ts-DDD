// database.ts
import mongoose from "mongoose";
import { ENV } from "../config/env";
import { ConnectionError } from "../errorhandler/customerrorHandler";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.DB_URI);
    console.log(ENV.DB_URI);
    console.log("✅ Database connected successfully");
  } catch (error: any) {
    console.error("❌ Database connection failed:", error.message);
    throw new ConnectionError("Failed to connect to database");
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log("🔌 Database connection closed.");
};