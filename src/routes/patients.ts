import express, { Request, Response } from 'express';
import Patient from '../models/patient';

const router = express.Router();

// Create a new patient
router.post('/', async (req: Request, res: Response) => {
  try {
    const { extra_fields, ...patientData } = req.body;
    const patient = new Patient(patientData);
    
    if (extra_fields) {
      Object.entries(extra_fields).forEach(([key, value]) => {
        patient.extra_fields.set(key, value);
      });
    }

    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

// Get all patients
router.get('/', async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find({}, { __v: 0, _id: 0 });
    const patientCount = patients.length;
    console.log(`Retrieved ${patientCount} patients`);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
});

// Update a patient
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { extra_fields, ...updateData } = req.body;
    
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    Object.assign(patient, updateData);

    if (extra_fields) {
      Object.entries(extra_fields).forEach(([key, value]) => {
        patient.extra_fields.set(key, value);
      });
    }

    await patient.save();
    res.json(patient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;
