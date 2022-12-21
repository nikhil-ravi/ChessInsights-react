import Game from "../models/Game.js";
import MoveAccuracy from "../models/MoveAccuracy.js";

export const getYearlyStats = async (req, res) => {
  try {
    const yearlyGames = await Game.aggregate([
      {
        $group: {
          _id: "$Year",
          avgAcc: {
            $avg: "$UserAccuracy",
          },
          totalGames: {
            $count: {},
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.status(200).json(yearlyGames);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getResultStats = async (req, res) => {
  try {
    const gamesResults = await Game.aggregate([
      {
        $group: {
          _id: "$Result",
          games: {
            $count: {},
          },
          avgAcc: {
            $avg: "$UserAccuracy",
          },
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$games",
          },
          results: {
            $push: {
              result: "$_id",
              games: "$games",
              avgAcc: "$avgAcc",
            },
          },
        },
      },
      {
        $unwind: {
          path: "$results",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                percentGames: {
                  $multiply: [
                    {
                      $divide: ["$results.games", "$sum"],
                    },
                    100,
                  ],
                },
              },
              "$results",
              "$avgAcc",
            ],
          },
        },
      },
    ]);
    res.status(200).json(gamesResults);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGamesWithStageInfo = async (req, res) => {
  try {
    const gamesWithStageInfo = await Game.aggregate([
      {
        $lookup: {
          from: "gamestageinfos",
          localField: "GameId",
          foreignField: "GameId",
          as: "GameStageInfo",
        },
      },
      {
        $unwind: {
          path: "$GameStageInfo",
        },
      },
    ]);
    res.status(200).json(gamesWithStageInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMoveAccuracy = async (req, res) => {
  try {
    const { type } = req.params;
    const moveAccuracy = await MoveAccuracy.aggregate([
      {
        $project: {
          _id: 0,
          x: "$Move",
          y: `$${type}`,
        },
      },
    ]);
    res.status(200).json(moveAccuracy);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOpponentEloResults = async (req, res) => {
  try {
    const opponentEloResults = await Game.aggregate([
      {
        $bucket: {
          groupBy: "$OpponentElo",
          boundaries: [
            100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300,
            1400, 1500, 1600, 1700, 1800, 1900, 2000,
          ],
          default: 2000,
          output: {
            games: {
              $sum: 1,
            },
            win: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$Result", "Win"],
                  },
                  1,
                  0,
                ],
              },
            },
            draw: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$Result", "Draw"],
                  },
                  1,
                  0,
                ],
              },
            },
            loss: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$Result", "Loss"],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          games: 1,
          win: 1,
          draw: 1,
          loss: 1,
          winpct: {
            $multiply: [
              {
                $divide: ["$win", "$games"],
              },
              100,
            ],
          },
          drawpct: {
            $multiply: [
              {
                $divide: ["$draw", "$games"],
              },
              100,
            ],
          },
          losspct: {
            $multiply: [
              {
                $divide: ["$loss", "$games"],
              },
              100,
            ],
          },
        },
      },
    ]);
    res.status(200).json(opponentEloResults);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTerminationByResult = async (req, res) => {
  try {
    const { result } = req.params;
    const terminationByResult = await Game.aggregate([
      {
        $match: {
          Result: `${result}`,
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
          data: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $unwind: {
          path: "$data",
        },
      },
      {
        $group: {
          _id: "$data.Termination",
          value: {
            $sum: 1,
          },
          total: {
            $first: "$count",
          },
        },
      },
      {
        $project: {
          value: 1,
          total: 1,
          percentage: {
            $divide: ["$value", "$total"],
          },
          id: "$_id",
          label: "$_id",
          _id: 0,
        },
      },
    ]);
    res.status(200).json(terminationByResult);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
