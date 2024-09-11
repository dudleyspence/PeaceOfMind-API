const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Carer" },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    uploadDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const File = mongoose.model(File, FileSchema);

module.exports = File;
