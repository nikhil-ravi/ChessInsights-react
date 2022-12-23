import express from "express";
import { getPieceCntAcc } from "../controllers/moves.js";

const router = express.Router();

router.get("/getpiececntacc", getPieceCntAcc);

export default router;
