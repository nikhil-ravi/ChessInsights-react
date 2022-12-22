import Geography from "../models/Geography.js";

export const getGeography = async (req, res) => {
  try {
    const geography = await Geography.find();
    res.status(200).json(geography);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
