import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import gamesRoutes from "./routes/games.js";
import geographyRoutes from "./routes/geography.js";
import calendarRoutes from "./routes/calendar.js";
import movesRoutes from "./routes/moves.js";
// import managementRoutes from "./routes/management.js";
// import salesRoutes from "./routes/sales.js";

// data imports
// import Game from "./models/Game.js";
// import GameStageInfo from "./models/GameStageInfo.js";
// import GameMovesInfo from "./models/GameMovesInfo.js";
// import {
//   dataGames,
//   // dataGameMovesInfo,
//   dataGameStageInfo,
// } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/games", gamesRoutes);
app.use("/geography", geographyRoutes);
app.use("/calendar", calendarRoutes);
app.use("/moves", movesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.SERVER_PORT || 9000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* ONLY ADD DATA ONE TIME */
    // Game.insertMany(dataGames);
    // GameStageInfo.insertMany(dataGameStageInfo);
    // GameMovesInfo.insertMany(dataGameMovesInfo);
  })
  .catch((error) => console.error(`${error} did not connect.`));
