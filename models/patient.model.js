import mongoose, { mongo } from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    age: Number,
    medicalConditions: [String],
    carers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Carer" }],
    guardians: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guardian" }],
  },
  { timestamps: true }
);

const Patient = mongoose.model(Patient, PatientSchema);

export default Patient;
