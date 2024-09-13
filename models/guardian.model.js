const mongoose = require("mongoose");

const GuardianSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    phone: String,
    relationToPatient: String,
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  },
  { timestamps: true }
);

const Guardian = mongoose.model("Guardian", GuardianSchema);
module.exports = Guardian;
