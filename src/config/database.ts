import mongoose from 'mongoose';
import { config } from '../config';

export const connectDB = async () => {
  try {
    mongoose.connect(`mongodb://${config.db.username}:${config.db.password}@localhost:27017/patientsDB`);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
