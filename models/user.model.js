const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String }, // Firebase UID stored as a string
    name: { type: String, required: true },
    profileImageURL: String,
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["guardian", "carer"], required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
