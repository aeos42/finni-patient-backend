import express, { Request, Response } from 'express';
import Patient from '../models/patient';

const router = express.Router();

// Create a new patient
router.post('/', async (req: Request, res: Response) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: 'Error creating patient', error });
  }
});

// Get all patients
router.get('/', async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
});

export default router;
