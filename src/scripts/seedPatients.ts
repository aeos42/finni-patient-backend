import mongoose from 'mongoose';
import Patient from '../models/patient';
import { config } from '../config';

console.log(config.db.username)
// Connect to your MongoDB database
mongoose.connect(`mongodb://${config.db.username}:${config.db.password}@localhost:27017/patientsDB`);

const samplePatients = [
  {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, Anytown, USA',
    dateOfBirth: new Date('1980-01-15'),
    status: 'Active',
    extraFields: {
      phoneNumber: '555-123-4567',
      emergencyContact: 'Jane Doe',
      bloodType: 'A+',
    },
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    address: '456 Elm St, Othertown, USA',
    dateOfBirth: new Date('1992-07-22'),
    status: 'Inactive',
    extraFields: {
      preferredLanguage: 'Spanish',
      occupation: 'Teacher',
      allergies: ['Peanuts', 'Penicillin'],
    },
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    address: '789 Oak Ave, Somewhere, USA',
    dateOfBirth: new Date('1975-03-10'),
    status: 'Active',
    extraFields: {
      insuranceProvider: 'HealthCare Plus',
      lastCheckup: new Date('2023-11-15'),
      chronicConditions: ['Diabetes Type 2', 'Hypertension'],
    },
  },
  // Add more sample patients as needed
];

async function seedPatients() {
  try {
    // Clear existing patients
    await Patient.deleteMany({});

    // Insert sample patients
    const insertedPatients = await Patient.insertMany(samplePatients);
    console.log(`${insertedPatients.length} patients inserted successfully.`);
  } catch (error) {
    console.error('Error seeding patients:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

seedPatients();
