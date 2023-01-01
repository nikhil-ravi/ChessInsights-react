import express from "express";
import {
  getPieceStats,
  getCastleStages,
  getCastleOpponentType,
} from "../controllers/moves.js";

const router = express.Router();
// Supa
router.get(
  "/getpiecestats/:username/:timeclass/:startdate/:enddate",
  getPieceStats
);
router.get(
  "/castlestage/:username/:timeclass/:startdate/:enddate",
  getCastleStages
);
router.get(
  "/castletype/:username/:timeclass/:startdate/:enddate",
  getCastleOpponentType
);

export default router;
