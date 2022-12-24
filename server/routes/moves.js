import express from "express";
import {
  getPieceCntAcc,
  getCastleStage,
  getCastleType,
} from "../controllers/moves.js";

const router = express.Router();

router.get("/getpiececntacc", getPieceCntAcc);
router.get("/getcastlestage", getCastleStage);
router.get("/getcastletype", getCastleType);

export default router;
