import mongoose from "mongoose";

const PieceSchema = new mongoose.Schema(
  {
    Piece: String,
    Moves: Number,
    AvgAcc: Number,
    MovesEndgame: Number,
    MovesMiddlegame: Number,
    MovesOpening: Number,
    AvgAccEndgame: Number,
    AvgAccMiddlegame: Number,
    AvgAccOpening: Number,
    Percentage: Number,
    PercentageEndgame: Number,
    PercentageMiddlegame: Number,
    PercentageOpening: Number,
    Order: Number,
  },
  { timestamps: true }
);

const Piece = mongoose.model("Piece", PieceSchema);
export default Piece;
