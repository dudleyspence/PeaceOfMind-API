import mongoose from "mongoose";

const GuardianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    relationToPatient: String,
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  },
  { timestamps: true }
);

const Guardian = mongoose.model(Guardian, GuardianSchema);
export default Guardian;
