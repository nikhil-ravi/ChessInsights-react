import Piece from "../models/Piece.js";

export const getPieceCntAcc = async (req, res) => {
  try {
    const pieceCntAcc = await Piece.find();
    res.status(200).json(pieceCntAcc);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
