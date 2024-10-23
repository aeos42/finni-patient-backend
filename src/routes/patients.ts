import express, { Request, Response } from 'express';
import Patient from '../models/patient';
import { logger } from '../index'; // You'll need to export the logger from index.ts

const router = express.Router();

// Create a new patient
router.post('/', async (req: Request, res: Response) => {
  logger.info('Creating new patient', { patientData: req.body });
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
    logger.info(`Retrieved ${patients.length} patients`);
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
  logger.info('Updating patient', { patientId: req.params.patientId, updateData: req.body });
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
      patient.extraFields = new Map(Object.entries(extraFields));
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

// Delete a patient
router.delete('/:patientId', async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const deletedPatient = await Patient.findOneAndDelete({ patientId });

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully', patient: deletedPatient });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error deleting patient', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred while deleting patient' });
    }
  }
});


export default router;
