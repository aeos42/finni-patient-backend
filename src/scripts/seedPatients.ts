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
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    address: '456 Elm St, Othertown, USA',
    dateOfBirth: new Date('1992-07-22'),
    status: 'Inactive',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    address: '789 Oak Ave, Somewhere, USA',
    dateOfBirth: new Date('1975-03-10'),
    status: 'Active',
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
