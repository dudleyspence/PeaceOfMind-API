const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    about: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    address: String,
    medicalConditions: [String],
    profileImageURL: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
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
