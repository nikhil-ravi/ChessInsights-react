import express from "express";
import { getGeography } from "../controllers/geography.js";
import { getGeographyStats } from "../supaControllers/geography.js";

const router = express.Router();

router.get("/geography", getGeography);
router.get("/geography/:timeclass/:startdate/:enddate", getGeographyStats);

export default router;
