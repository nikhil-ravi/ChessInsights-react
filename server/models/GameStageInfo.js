import mongoose, { mongo } from "mongoose";

const GameStageInfoSchema = new mongoose.Schema(
  {
    GameId: { type: String, ref: "Game" },
    end: Number,
    ended_in: String,
    middle: Number,
    plies: Number,
  },
  { timestamps: true }
);

const GameStageInfo = mongoose.model("GameStageInfo", GameStageInfoSchema);
export default GameStageInfo;
