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

function orderDays(day) {
  return day === "Sunday"
    ? 7
    : day === "Monday"
    ? 1
    : day === "Tuesday"
    ? 2
    : day === "Wednesday"
    ? 3
    : day === "Thursday"
    ? 4
    : day === "Friday"
    ? 5
    : 6;
}

const DayOfWeek = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: gamesByDoW, isLoading: isGamesByDoWLoading } =
    useGetGamesByCalendarQuery("DayOfWeek");
  const { data: accByDoW, isLoading: isAccByDoWLoading } =
    useGetAccByCalendarQuery("DayOfWeek");
  const { data: resultsByDoW, isLoading: isResultsByDoWLoading } =
    useGetResultsByCalendarQuery("DayOfWeek");
  if (
    !gamesByDoW ||
    isGamesByDoWLoading ||
    !accByDoW ||
    isAccByDoWLoading ||
    !resultsByDoW ||
    isResultsByDoWLoading
  )
    return <CircularProgress />;
  const gamesByDoWwOrder = gamesByDoW
    .map((element) => {
      return {
        ...element,
        order: orderDays(element.id),
      };
    })
    .sort((a, b) => {
      return a.order < b.order ? -1 : 1;
    });

  const accByDoWwOrder = accByDoW
    .map((element) => {
      return {
        ...element,
        order: orderDays(element._id),
      };
    })
    .sort((a, b) => {
      return a.order < b.order ? -1 : 1;
    });

    const resultsByDoWwOrder = resultsByDoW
    .map((element) => {
      return {
        ...element,
        order: orderDays(element._id),
      };
    })
    .sort((a, b) => {
      return a.order < b.order ? -1 : 1;
    });
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Day of Week"
        subtitle="Games by day of week"
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
            data={gamesByDoWwOrder}
            colors={{ scheme: "category10" }}
          />
        </Box>
      </Box>
      <Divider />
      <br />
      <Header subtitle="Accuracy by day of week" />
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
            data={accByDoWwOrder}
            keys={["avgAcc"]}
            index="_id"
            xlabel="Day Of Week"
            ylabel="Average Accuracy"
            labelFormat={true}
            maxValue="100"
            tooltip={({ indexValue, value }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{indexValue}</span>
                <br />
                <span>Average Accuracy: {value.toFixed(2)}%</span>
              </div>
            )}
          />
        </Box>
      </Box>

      <Divider />
      <br />
      <Header subtitle="Results by day of week" sx={{ mt: "20px" }} />
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
            data={resultsByDoWwOrder}
            leftTickVals={5}
            bottomLegend="Day Of Week"
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
            colors={(datum) => {
              return theme.palette.result[
                datum.id.toLowerCase().split("pct")[0]
              ];
            }}
            legendLabel={(datum) =>
              `${datum.id.split("pct")[0].charAt(0).toUpperCase()}` +
              `${datum.id.split("pct")[0].substring(1)}`
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DayOfWeek;
