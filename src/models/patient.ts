import mongoose, { Document, Schema } from 'mongoose';

export interface IPatient extends Document {
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: Date;
  status: string;
}

const patientSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  status: { type: String, required: true },
});

export default mongoose.model<IPatient>('Patient', patientSchema);
