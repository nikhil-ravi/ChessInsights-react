import supabase from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

export const getTotalGames = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: totalGames, error } = await supabase.rpc(
    "getTotalGames",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(totalGames);
};

export const getGamesByResult = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: gamesByResult, error } = await supabase.rpc(
    "getGamesByResult",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(gamesByResult);
};

export const getGamesByYear = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: gamesByYear, error } = await supabase.rpc(
    "getGamesByYear",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(gamesByYear);
};

export const getAccuracyByMonth = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: accuracyByMonth, error } = await supabase.rpc(
    "getAccuracyByMonth",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(accuracyByMonth);
};

export const getAccuracyByMove = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: accuracyByMove, error } = await supabase.rpc(
    "getAccuracyByMove",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(accuracyByMove);
};

export const getAccuracyByResult = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: accuracyByResult, error } = await supabase.rpc(
    "getAccuracyByResult",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(accuracyByResult);
};

export const getResultsByOpponentRating = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: resultsByOpponentRating, error } = await supabase.rpc(
    "getResultsByOpponentRating",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(resultsByOpponentRating);
};

export const getGameByTerminationandResults = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: gameByTerminationandResults, error } = await supabase.rpc(
    "GameByTerminationandResults",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(gameByTerminationandResults);
};

export const getGamePhases = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: gamesPhases, error } = await supabase.rpc(
    "getGamePhases",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(gamesPhases);
};
