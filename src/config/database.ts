import mongoose from 'mongoose';
import { config } from '../config';
import { logger } from '../index';
export const connectDB = async () => {
  try {
    mongoose.connect(
      `mongodb://${config.db.username}:${config.db.password}@localhost:27017/patientsDB`,
    );
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
