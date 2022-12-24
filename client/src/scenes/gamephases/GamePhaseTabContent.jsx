import React from "react";
import {
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Header from "components/Header";
import { useGetGameEndedInQuery } from "state/api";
import BreakdownChart from "components/BreakdownChart";
import SunburstChart from "components/SunburstChart";

const GamePhaseTabContent = ({ view }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: gameEndedInData, isLoading: isGameEndedInDataLoading } =
    useGetGameEndedInQuery("All");
  const {
    data: gameEndedInWhiteData,
    isLoading: isGameEndedInWhiteDataLoading,
  } = useGetGameEndedInQuery("White");
  const {
    data: gameEndedInBlackData,
    isLoading: isGameEndedInBlackDataLoading,
  } = useGetGameEndedInQuery("Black");
  if (
    !gameEndedInData ||
    isGameEndedInDataLoading ||
    !gameEndedInWhiteData ||
    isGameEndedInWhiteDataLoading ||
    !gameEndedInBlackData ||
    isGameEndedInBlackDataLoading
  )
    return <CircularProgress />;

  const formattedData = {
    id: "Color",
    children: [
      {
        id: "White",
        color: theme.palette.secondary[200],
        children: gameEndedInWhiteData,
      },
      {
        id: "Black",
        color: theme.palette.primary[200],
        children: gameEndedInBlackData,
      },
    ],
  };
  return (
    <Box>
      <Header subtitle="Games that ended in the..." sx={{ mt: "20px" }} />
      <Box
        mt="0px"
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
          {view === 0 ? (
            <BreakdownChart data={gameEndedInData} colors={ {scheme: "nivo"} } />
          ) : (
            <SunburstChart data={formattedData} colors="nivo" />
          )}
        </Box>
      </Box>
      <Divider />
      <Header subtitle="Accuracy by game phase" sx={{ mt: "20px" }} />
      <Box
        mt="0px"
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
          <>{view}</>
        </Box>
      </Box>
      <Divider />
      <Header
        subtitle="Results for games that ended in the..."
        sx={{ mt: "20px" }}
      />
      <Box
        mt="0px"
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
          <>{view}</>
        </Box>
      </Box>
    </Box>
  );
};

export default GamePhaseTabContent;
