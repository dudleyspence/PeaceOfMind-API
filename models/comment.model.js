import mongoose, { mongo } from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true },
    authorType: { type: String, enum: ["Guardian", "Carer"], required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model(Comment, CommentSchema);

export default Comment;
