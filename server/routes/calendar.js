import express from "express";

import {
  getTimeOfDayStats,
  getDayOfWeekStats,
} from "../controllers/calendar.js";

const router = express.Router();

router.get(
  "/todstats/:username/:timeclass/:startdate/:enddate",
  getTimeOfDayStats
);
router.get(
  "/dowstats/:username/:timeclass/:startdate/:enddate",
  getDayOfWeekStats
);

export default router;
