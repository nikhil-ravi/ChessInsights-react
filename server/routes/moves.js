import express from "express";
import {
  getPieceCntAcc,
  getCastleStage,
  getCastleType,
} from "../controllers/moves.js";

import {
  getPieceStats,
  getCastleStages,
  getCastleOpponentType,
} from "../supaControllers/moves.js";

const router = express.Router();

router.get("/getpiececntacc", getPieceCntAcc);
router.get("/getcastlestage", getCastleStage);
router.get("/getcastletype", getCastleType);
// Supa
router.get("/getpiecestats/:timeclass/:startdate/:enddate", getPieceStats);
router.get("/castlestage/:timeclass/:startdate/:enddate", getCastleStages);
router.get("/castletype/:timeclass/:startdate/:enddate", getCastleOpponentType);

export default router;
