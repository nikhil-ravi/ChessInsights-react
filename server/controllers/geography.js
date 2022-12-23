import Geography from "../models/Geography.js";

export const getGeography = async (req, res) => {
  try {
    const geography = await Geography.aggregate([
      {
        $addFields: {
          wl: {
            $subtract: [
              { $multiply: ["$WinPct", 100] },
              { $multiply: ["$LossPct", 100] },
            ],
          },
        },
      },
    ]);
    res.status(200).json(geography);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
