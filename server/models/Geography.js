import mongoose from "mongoose";

const GeographySchema = new mongoose.Schema(
  {
    Country: String,
    Draw: Number,
    Loss: Number,
    Win: Number,
    Total: Number,
    DrawPct: Number,
    WinPct: Number,
    LossPct: Number,
    UserAccuracy: Number,
  },
  { timestamps: true }
);

const Geography = mongoose.model("Geography", GeographySchema);
export default Geography;
