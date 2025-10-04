import mongoose from "mongoose";

const mongoUri =
  "mongodb+srv://bhuvankumar66666_db_user:ld6HnVy21maJKuvd@learnnextjs.bd47pub.mongodb.net/?retryWrites=true&w=majority&appName=LearnNextjs";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

