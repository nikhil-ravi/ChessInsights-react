import mongoose, { mongo } from "mongoose";

const MoveAccuracySchema = new mongoose.Schema(
  {
    Move: Number,
    All: Number,
    White: Number,
    Black: Number,
  },
  { timestamps: true }
);

const MoveAccuracy = mongoose.model("MoveAccuracy", MoveAccuracySchema);
export default MoveAccuracy;
