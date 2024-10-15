import express from 'express';
import { connectDB } from './config/database';
import patientRoutes from './routes/patients';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/patients', patientRoutes);

app.get('/', (req, res) => {
  res.send('Patient Records API');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
