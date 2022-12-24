import mongoose, { mongo } from "mongoose";

const CastleTypeSchema = new mongoose.Schema(
  {
    UserCastle: String,
    Total: Number,
    Percentage: Number,
    Win: Number,
    WinPercentage: Number,
    Draw: Number,
    DrawPercentage: Number,
    Loss: Number,
    LossPercentage: Number,
    LongTotal: Number,
    LongWin: Number,
    LongWinPercentage: Number,
    LongDraw: Number,
    LongDrawPercentage: Number,
    LongLoss: Number,
    LongLossPercentage: Number,
    NoCastlingTotal: Number,
    NoCastlingWin: Number,
    NoCastlingWinPercentage: Number,
    NoCastlingDraw: Number,
    NoCastlingDrawPercentage: Number,
    NoCastlingLoss: Number,
    NoCastlingLossPercentage: Number,
    ShortTotal: Number,
    ShortWin: Number,
    ShortWinPercentage: Number,
    ShortDraw: Number,
    ShortDrawPercentage: Number,
    ShortLoss: Number,
    ShortLossPercentage: Number,
    Accuracy: Number,
  },
  { timestamps: true }
);

const CastleType = mongoose.model("CastleType", CastleTypeSchema);
export default CastleType;
