const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firebaseUID: { type: String, required: true },
    name: { type: String, required: true },
    profileImageURL: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["guardian", "carer"], required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
