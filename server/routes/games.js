import express from "express";
import {
  getYearlyStats,
  getGamesWithStageInfo,
  getResultStats,
  getMoveAccuracy,
  getOpponentEloResults,
  getTerminationByResult,
  // getTransactions,
  // getGeography,
} from "../controllers/games.js";

const router = express.Router();

router.get("/yearlystats", getYearlyStats);
router.get("/resultstats", getResultStats);
router.get("/gameswithstageinfo", getGamesWithStageInfo);
router.get("/moveaccuracy/:type", getMoveAccuracy);
router.get("/opponenteloresults", getOpponentEloResults);
router.get("/terminationbyresult/:result", getTerminationByResult);
// router.get("/transactions", getTransactions);
// router.get("/geography", getGeography);

export default router;
