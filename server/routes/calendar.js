import express from "express";
import {
  getGamesByCalendar,
  getAccByCalendar,
  getResultsByCalendar,
} from "../controllers/calendar.js";

const router = express.Router();

router.get("/games/:qType", getGamesByCalendar);
router.get("/accuracy/:qType", getAccByCalendar);
router.get("/results/:qType", getResultsByCalendar);

export default router;
