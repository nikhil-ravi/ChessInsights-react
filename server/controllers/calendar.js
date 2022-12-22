import Game from "../models/Game.js";

export const getGamesByCalendar = async (req, res) => {
  try {
    const { qType } = req.params;
    const query = [
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
          _id: `$data.${qType}`,
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
    ];
    const gamesByCalendar = await Game.aggregate(query);
    res.status(200).json(gamesByCalendar);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAccByCalendar = async (req, res) => {
  try {
    const { qType } = req.params;
    const accByCalendar = await Game.aggregate([
      {
        $group: {
          _id: `$${qType}`,
          avgAcc: {
            $avg: "$UserAccuracy",
          },
        },
      },
    ]);
    res.status(200).json(accByCalendar);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getResultsByCalendar = async (req, res) => {
  try {
    const { qType } = req.params;
    const resultsByCalendar = await Game.aggregate([
      {
        $group: {
          _id: `$${qType}`,
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
        $project: {
          _id: 0,
          count: 1,
          qType: `$data.${qType}`,
          Result: "$data.Result",
        },
      },
      {
        $group: {
          _id: {
            qType: "$qType",
            Result: "$Result",
          },
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
            $multiply: [
              {
                $divide: ["$value", "$total"],
              },
              100,
            ],
          },
          qType: "$_id.qType",
          Result: "$_id.Result",
          _id: 0,
        },
      },
      {
        $group: {
          _id: "$qType",
          results: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $project: {
          win: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$results",
                  as: "list",
                  cond: {
                    $eq: ["$$list.Result", "Win"],
                  },
                },
              },
              0,
            ],
          },
          loss: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$results",
                  as: "list",
                  cond: {
                    $eq: ["$$list.Result", "Loss"],
                  },
                },
              },
              0,
            ],
          },
          draw: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$results",
                  as: "list",
                  cond: {
                    $eq: ["$$list.Result", "Draw"],
                  },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          win: "$win.value",
          winpct: "$win.percentage",
          draw: "$draw.value",
          drawpct: "$draw.percentage",
          loss: "$loss.value",
          losspct: "$loss.percentage",
          total: "$win.total",
        },
      },
    ]);
    res.status(200).json(resultsByCalendar);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
