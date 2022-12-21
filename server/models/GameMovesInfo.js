import mongoose, { mongo } from "mongoose";

const GameMovesInfoSchema = new mongoose.Schema(
  {
    GameId: { type: String, ref: "Game" },
    MoveInfo: [
      {
        MoveNumber: String,
        MoveSan: String,
        MovedPiece: String,
        GameStage: String,
        CP: {
          relative: { cp: Number, moves: Number },
          turn: Boolean,
        },
        WinPercentage: Number,
        AccuracyPercentage: Number,
      },
    ],
  },
  { timestamps: true }
);

const GameMovesInfo = mongoose.model("GameMovesInfo", GameMovesInfoSchema);
export default GameMovesInfo;
