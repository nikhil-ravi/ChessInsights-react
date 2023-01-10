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
  getRating,
  getMaxRating,
} from "../controllers/games.js";

const router = express.Router();

// SUPA Routes
router.get(
  "/totalgames/:username/:timeclass/:startdate/:enddate",
  getTotalGames
);
router.get(
  "/gamesbyresult/:username/:timeclass/:startdate/:enddate",
  getGamesByResult
);
router.get(
  "/gamesbyyear/:username/:timeclass/:startdate/:enddate",
  getGamesByYear
);
router.get(
  "/accuracybymonth/:username/:timeclass/:startdate/:enddate",
  getAccuracyByMonth
);
router.get(
  "/accuracybymove/:username/:timeclass/:startdate/:enddate",
  getAccuracyByMove
);
router.get(
  "/accuracybyresult/:username/:timeclass/:startdate/:enddate",
  getAccuracyByResult
);
router.get(
  "/resultsbyopponentrating/:username/:timeclass/:startdate/:enddate",
  getResultsByOpponentRating
);
router.get(
  "/gamebyterminationandresults/:username/:timeclass/:startdate/:enddate",
  getGameByTerminationandResults
);
router.get(
  "/gamephases/:username/:timeclass/:startdate/:enddate",
  getGamePhases
);
router.get("/rating/:username/:timeclass/:startdate/:enddate", getRating);
router.get("/maxrating/:username/:timeclass/:startdate/:enddate", getMaxRating);

export default router;
