import React from "react";
import { useGetGameByTerminationandResultsQuery } from "state/api";
import {
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";
import { useSelector } from "react-redux";

const GameResults = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const timeClass = useSelector((state) => state.global.timeClass);
  const startDate = useSelector((state) => state.global.startDate);
  const endDate = useSelector((state) => state.global.endDate);

  // SUPA DATA
  const supa_data = {
    timeclass: timeClass,
    startdate: startDate,
    enddate: endDate,
  };
  const {
    data: gameByTerminationandResults,
    isLoading: isGameByTerminationandResultsLoading,
  } = useGetGameByTerminationandResultsQuery(supa_data);
  if (isGameByTerminationandResultsLoading) return <CircularProgress />;
  if (!gameByTerminationandResults)
    return (
      <Header
        title="No games in this date range"
        subtitle="Please choose a different date range and time class combination."
        sx={{ mt: "20px" }}
      />
    );
  const win = gameByTerminationandResults
    ? gameByTerminationandResults.filter((item) => item.Result === "Win")
    : [{}];
  const draw = gameByTerminationandResults
    ? gameByTerminationandResults.filter((item) => item.Result === "Draw")
    : [{}];
  const loss = gameByTerminationandResults
    ? gameByTerminationandResults.filter((item) => item.Result === "Loss")
    : [{}];
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Game Results"
        subtitle="Games you won by..."
        sx={{ mt: "20px" }}
      />
      <Box
        mt="20px"
        mb="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="80px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
        backgroundColor={theme.palette.background.alt}
        borderRadius="1.55rem"
        p="2rem 0rem"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="1.55rem"
        >
          <BreakdownChart
            colors={{ scheme: "greens" }}
            data={win}
            tooltipValue="Total"
            id="Termination"
            value="Percentage"
          />
        </Box>
      </Box>
      <Divider />
      <br />
      <Header subtitle="Games you drew by..." sx={{ mt: "20px" }} />
      <Box
        mt="20px"
        mb="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="80px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
        backgroundColor={theme.palette.background.alt}
        borderRadius="1.55rem"
        p="2rem 0rem"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="1.55rem"
        >
          <BreakdownChart
            data={draw}
            tooltipValue="Total"
            id="Termination"
            value="Percentage"
            colors={{ scheme: "greys" }}
          />
        </Box>
      </Box>

      <Divider />
      <br />
      <Header subtitle="Games you lost by..." sx={{ mt: "20px" }} />
      <Box
        mt="20px"
        mb="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="80px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
        backgroundColor={theme.palette.background.alt}
        borderRadius="1.55rem"
        p="2rem 0rem"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="1.55rem"
        >
          <BreakdownChart
            data={loss}
            tooltipValue="Total"
            id="Termination"
            value="Percentage"
            colors={{ scheme: "reds" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GameResults;
