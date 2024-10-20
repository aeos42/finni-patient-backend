import express, { Request, Response } from 'express';
import Patient from '../models/patient';

const router = express.Router();

// Create a new patient
router.post('/', async (req: Request, res: Response) => {
  try {
    const { extraFields, ...patientData } = req.body;
    const patient = new Patient(patientData);
    
    if (extraFields) {
      Object.entries(extraFields).forEach(([key, value]) => {
        patient.extraFields.set(key, value);
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

router.get('/:patientId', async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findOne({ patientId }, { __v: 0, _id: 0 });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
});



// Update a patient
router.patch('/:patientId', async (req: Request, res: Response) => {
  console.log("patching patient")
  try {
    const { patientId } = req.params;
    const { extraFields, ...updateData } = req.body;

    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    else {
      
    }
    Object.assign(patient, updateData);

    if (extraFields) {
      Object.entries(extraFields).forEach(([key, value]) => {
        patient.extraFields.set(key, value);
      });
    }
    await patient.save();
    delete patient._id;
    delete patient.__v;
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
