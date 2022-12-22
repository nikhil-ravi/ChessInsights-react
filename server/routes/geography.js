import express from "express";
import { getGeography } from "../controllers/geography.js";

const router = express.Router();

router.get("/geography", getGeography);

export default router;
