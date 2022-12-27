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
