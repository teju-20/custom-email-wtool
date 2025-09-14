// src/config/db.ts

// Option 1: Mocked DB connection (skip MongoDB)
export const connectDB = async (): Promise<void> => {
  console.log("⚠️ MongoDB skipped (mocked). Backend will run without DB.");
};

/* ------------------------------------------------------ */
/* Option 2: If you want real MongoDB connection later,  */
/* uncomment this and comment out the mocked version.    */
/* ------------------------------------------------------ */

// import mongoose from 'mongoose';

// const MONGO_URI = process.env.MONGO_URI;

// if (!MONGO_URI) {
//   console.error("❌ MONGO_URI is not defined in .env");
//   process.exit(1);
// }

// export const connectDB = async (): Promise<void> => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1);
//   }
// };
