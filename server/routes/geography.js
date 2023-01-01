import express from "express";
import { getGeographyStats } from "../controllers/geography.js";

const router = express.Router();
router.get(
  "/geography/:username/:timeclass/:startdate/:enddate",
  getGeographyStats
);

export default router;
