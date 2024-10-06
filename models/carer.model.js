const mongoose = require("mongoose");

const CarerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phone: String,
    address: String,
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
    about: String,
  },
  { timestamps: true }
);

const Carer = mongoose.model("Carer", CarerSchema);
module.exports = Carer;
