import Piece from "../models/Piece.js";
import CastleStage from "../models/CastleStage.js";
import CastleType from "../models/CastleType.js";

export const getPieceCntAcc = async (req, res) => {
  try {
    const pieceCntAcc = await Piece.find();
    res.status(200).json(pieceCntAcc);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCastleStage = async (req, res) => {
  try {
    const castleStage = await CastleStage.find();
    res.status(200).json(castleStage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCastleType = async (req, res) => {
  try {
    const castleType = await CastleType.find();
    res.status(200).json(castleType);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
