import mongoose from "mongoose";

const GameEndStageStatSchema = new mongoose.Schema(
  {
    GameEndedIn: String,
    Total: Number,
    Percentage: Number,
    Win: Number,
    WinPercentage: Number,
    Draw: Number,
    DrawPercentage: Number,
    Loss: Number,
    LossPercentage: Number,
    WhiteTotal: Number,
    WhitePercentage: Number,
    WhiteWin: Number,
    WhiteWinPercentage: Number,
    WhiteDraw: Number,
    WhiteDrawPercentage: Number,
    WhiteLoss: Number,
    WhiteLossPercentage: Number,
    BlackTotal: Number,
    BlackPercentage: Number,
    BlackWin: Number,
    BlackWinPercentage: Number,
    BlackDraw: Number,
    BlackDrawPercentage: Number,
    BlackLoss: Number,
    BlackLossPercentage: Number,
    GameAccuracy: Number,
    WhiteGameAccuracy: Number,
    BlackGameAccuracy: Number,
    Accuracy: Number,
    WhiteAccuracy: Number,
    BlackAccuracy: Number,
  },
  { timestamps: true }
);

const GameEndStageStat = mongoose.model(
  "GameEndStageStat",
  GameEndStageStatSchema
);
export default GameEndStageStat;
