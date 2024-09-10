import mongoose from "mongoose";

const CarerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    address: String,
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  },
  { timestamps: true }
);
/*

The { timestamps: true } option in Mongoose automatically adds two fields to the schema:
- createdAt
- updatedAt
*/

const Carer = mongoose.model(Carer, CarerSchema);
export default Carer;
