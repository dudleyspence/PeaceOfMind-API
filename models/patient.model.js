const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dob: { type: Date, required: true },
    address: String,
    medicalConditions: [String],
    carers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Carer" }],
    guardians: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guardian" }],
      validate: [
        (v) => {
          return v.length > 0;
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
