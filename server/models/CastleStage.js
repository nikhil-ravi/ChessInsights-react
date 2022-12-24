import mongoose from "mongoose";

const CastleStageSchema = new mongoose.Schema(
  {
    UserCastleStage: String,
    Total: Number,
    Draw: Number,
    Loss: Number,
    Win: Number,
    Percentage: Number,
    WinPercentage: Number,
    DrawPercentage: Number,
    LossPercentage: Number,
  },
  { timestamps: true }
);

const CastleStage = mongoose.model("CastleStage", CastleStageSchema);
export default CastleStage;
