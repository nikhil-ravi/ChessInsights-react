import express from "express";

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
} from "../controllers/games.js";

const router = express.Router();

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
