import supabase from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

export const getPieceStats = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: pieceStats, error } = await supabase.rpc(
    "getPieceStats",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(pieceStats);
};

export const getCastleStages = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: castleStage, error } = await supabase.rpc(
    "getCastleStage",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(castleStage);
};

export const getCastleOpponentType = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: castleOpponentType, error } = await supabase.rpc(
    "getCastleOpponentType",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(castleOpponentType);
};
