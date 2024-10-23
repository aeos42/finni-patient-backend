import express from 'express';
import cors from 'cors';
import winston from 'winston';

import { connectDB } from './config/database';
import patientRoutes from './routes/patients';

// Create a logger
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const app = express();
const port = 3000;
connectDB();

app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  next();
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack });
  res.status(500).send('An error occurred');
});

app.use('/patients', patientRoutes);
app.get('/', cors(corsOptions), (req, res) => {
  res.send('Patient Records API');
});

app.listen(port, () => {
  logger.info(`Finni patient server running on port ${port}`);
});
