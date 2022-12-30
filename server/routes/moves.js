import express from "express";
import {
  getPieceStats,
  getCastleStages,
  getCastleOpponentType,
} from "../controllers/moves.js";

const router = express.Router();
// Supa
router.get("/getpiecestats/:timeclass/:startdate/:enddate", getPieceStats);
router.get("/castlestage/:timeclass/:startdate/:enddate", getCastleStages);
router.get("/castletype/:timeclass/:startdate/:enddate", getCastleOpponentType);

export default router;
