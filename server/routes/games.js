import express from "express";
import {
  getYearlyStats,
  getGamesWithStageInfo,
  getResultStats,
  getMoveAccuracy,
  getOpponentEloResults,
  getTerminationByResult,
  getGameEndedIn,
  getGameEndStageStats,
  // getTransactions,
  // getGeography,
} from "../controllers/games.js";

import {
  getTotalGames,
  getGamesByResult,
  getGamesByYear,
  getAccuracyByMonth,
  getAccuracyByMove,
  getAccuracyByResult,
  getResultsByOpponentRating,
  getGameByTerminationandResults,
  getGamePhases,
} from "../supaControllers/games.js";

const router = express.Router();

router.get("/yearlystats", getYearlyStats);
router.get("/resultstats", getResultStats);
router.get("/gameswithstageinfo", getGamesWithStageInfo);
router.get("/moveaccuracy/:type", getMoveAccuracy);
router.get("/opponenteloresults", getOpponentEloResults);
router.get("/terminationbyresult/:result", getTerminationByResult);
router.get("/gameendedin/:color", getGameEndedIn);
router.get("/gameendstagestats", getGameEndStageStats);
// SUPA Routes
router.get("/totalgames/:timeclass/:startdate/:enddate", getTotalGames);
router.get("/gamesbyresult/:timeclass/:startdate/:enddate", getGamesByResult);
router.get("/gamesbyyear/:timeclass/:startdate/:enddate", getGamesByYear);
router.get(
  "/accuracybymonth/:timeclass/:startdate/:enddate",
  getAccuracyByMonth
);
router.get("/accuracybymove/:timeclass/:startdate/:enddate", getAccuracyByMove);
router.get(
  "/accuracybyresult/:timeclass/:startdate/:enddate",
  getAccuracyByResult
);
router.get(
  "/resultsbyopponentrating/:timeclass/:startdate/:enddate",
  getResultsByOpponentRating
);
router.get(
  "/gamebyterminationandresults/:timeclass/:startdate/:enddate",
  getGameByTerminationandResults
);
router.get("/gamephases/:timeclass/:startdate/:enddate", getGamePhases);

export default router;
