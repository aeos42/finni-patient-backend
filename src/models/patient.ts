import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IPatient extends Document {
  patientId: string;
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: Date;
  status: string;
  extraFields: Record<string, any>;
}

const patientSchema: Schema = new Schema({
  patientId: { type: String, unique: true, required: true, default: () => genUniqueId() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  status: { type: String, required: true },
  extraFields: { type: Map, of: Schema.Types.Mixed, default: {} }
});

function genUniqueId() {
  return uuidv4();
}

export default mongoose.model<IPatient>('Patient', patientSchema);
