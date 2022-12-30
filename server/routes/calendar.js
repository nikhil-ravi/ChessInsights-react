import express from "express";
import {
  getGamesByCalendar,
  getAccByCalendar,
  getResultsByCalendar,
} from "../controllers/calendar.js";

import {
  getTimeOfDayStats,
  getDayOfWeekStats,
} from "../supaControllers/calendar.js";

const router = express.Router();

router.get("/games/:qType", getGamesByCalendar);
router.get("/accuracy/:qType", getAccByCalendar);
router.get("/results/:qType", getResultsByCalendar);
router.get("/todstats/:timeclass/:startdate/:enddate", getTimeOfDayStats);
router.get("/dowstats/:timeclass/:startdate/:enddate", getDayOfWeekStats);

export default router;
