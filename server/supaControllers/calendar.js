import supabase from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

export const getTimeOfDayStats = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: todStats, error } = await supabase.rpc(
    "getTimeOfDayStats",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(todStats);
};

export const getDayOfWeekStats = async (req, res) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  let { data: dowStats, error } = await supabase.rpc(
    "getDayOfWeekStats",
    req.params
  );
  if (error) res.status(404).json({ message: error.message });
  else res.status(200).json(dowStats);
};