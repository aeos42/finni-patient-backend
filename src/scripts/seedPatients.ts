import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import Patient from '../models/patient';
import { config } from '../config';

console.log(config.db.username);
// Connect to your MongoDB database
mongoose.connect(
  `mongodb://${config.db.username}:${config.db.password}@localhost:27017/patientsDB`,
);

// Read patients from JSON file
const patientsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'patients.json'), 'utf-8'));

async function seedPatients() {
  try {
    // Clear existing patients
    await Patient.deleteMany({});

    // Insert patients from JSON file
    const insertedPatients = await Patient.insertMany(patientsData);
    console.log(`${insertedPatients.length} patients inserted successfully.`);
  } catch (error) {
    console.error('Error seeding patients:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

seedPatients();
