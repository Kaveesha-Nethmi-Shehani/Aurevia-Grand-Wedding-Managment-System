import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/royal_bliss_db';
    const conn = await mongoose.connect(mongoUri);
    console.log(`Local MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database Connection Error:', error);
  }
};