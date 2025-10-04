import mongoose from "mongoose";

const mongoUri = process.env.DB_URI; 

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return; // Already connected
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};
