import React from "react";
import {
  useGetGamesByCalendarQuery,
  useGetAccByCalendarQuery,
  useGetResultsByCalendarQuery,
} from "state/api";
import {
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";
import MyResponsiveBar from "components/MyResponsiveBar";
import ResultsHistogram from "components/ResultsHistogram";

const TimeOfDay = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: gamesByToD, isLoading: isGamesByToDLoading } =
    useGetGamesByCalendarQuery("TimeOfDay");
  const { data: accByToD, isLoading: isAccByToDLoading } =
    useGetAccByCalendarQuery("TimeOfDay");
  const { data: resultsByToD, isLoading: isResultsByToDLoading } =
    useGetResultsByCalendarQuery("TimeOfDay");
  if (
    !gamesByToD ||
    isGamesByToDLoading ||
    !accByToD ||
    isAccByToDLoading ||
    !resultsByToD ||
    isResultsByToDLoading
  )
    return <CircularProgress />;
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Time of Day"
        subtitle="Games by time of day"
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
          <BreakdownChart data={gamesByToD} colors="nivo" />
        </Box>
      </Box>
      <Divider />
      <br />
      <Header subtitle="Accuracy by time of day" sx={{ mt: "20px" }} />
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
          <MyResponsiveBar
            data={accByToD}
            keys="avgAcc"
            index="_id"
            xlabel="Time of Day"
            ylabel="Average Accuracy"
            labelFormat={true}
            maxValue="100"
          />
        </Box>
      </Box>

      <Divider />
      <br />
      <Header subtitle="Results by time of day" sx={{ mt: "20px" }} />
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
          <ResultsHistogram
            data={resultsByToD}
            leftTickVals={5}
            bottomLegend="Time of Day"
            tooltip={({ data }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{data._id}</span>
                {data.win && (
                  <>
                    <br />
                    <strong>
                      Win: {data.winpct.toFixed(2)}% ({data.win})
                    </strong>
                  </>
                )}
                {data.draw && (
                  <>
                    <br />
                    <strong>
                      Draw: {data.drawpct.toFixed(2)}% ({data.draw})
                    </strong>
                  </>
                )}
                {data.loss && (
                  <>
                    <br />
                    <strong>
                      Loss: {data.losspct.toFixed(2)}% ({data.loss})
                    </strong>
                  </>
                )}
              </div>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TimeOfDay;
