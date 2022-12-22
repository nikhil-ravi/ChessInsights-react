import React, { useState } from "react";
import { useGetTerminationByResultQuery } from "state/api";
import {
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";

const GameResults = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: terminationByWin, isLoading: isTerminationByWinLoading } =
    useGetTerminationByResultQuery("Win");
  const { data: terminationByDraw, isLoading: isTerminationByDrawLoading } =
    useGetTerminationByResultQuery("Draw");
  const { data: terminationByLoss, isLoading: isTerminationByLossLoading } =
    useGetTerminationByResultQuery("Loss");
  if (
    !terminationByWin ||
    isTerminationByWinLoading ||
    !terminationByDraw ||
    isTerminationByDrawLoading ||
    !terminationByLoss ||
    isTerminationByLossLoading
  )
    return <CircularProgress />;
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
          <BreakdownChart data={terminationByWin} colors="greens" />
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
          <BreakdownChart data={terminationByDraw} colors="greys" />
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
          <BreakdownChart data={terminationByLoss} colors="reds" />
        </Box>
      </Box>
    </Box>
  );
};

export default GameResults;
