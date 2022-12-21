import mongoose, { mongo } from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    GameId: { type: String, required: true },
    Event: String,
    Year: Number,
    Date: Date,
    White: String,
    Black: String,
    WhiteElo: Number,
    BlackElo: Number,
    UserElo: Number,
    UserColor: String,
    Opponent: String,
    OpponentElo: Number,
    OpponentCountryCode: String,
    Result: String,
    TimeControl: Number,
    TimeIncrement: Number,
    TimeClass: String,
    Termination: String,
    DayOfWeek: String,
    TimeOfDay: String,
    ECO: String,
    WhiteAccuracy: Number,
    BlackAccuracy: Number,
    UserAccuracy: Number,
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", GameSchema);
export default Game;
