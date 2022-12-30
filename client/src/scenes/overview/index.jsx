import React from "react";
import {
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Header from "components/Header";
import {
  useGetTotalGamesQuery,
  useGetGamesByResultQuery,
  useGetGamesByYearQuery,
  useGetAccuracyByMonthQuery,
  useGetAccuracyByMoveQuery,
  useGetAccuracyByResultQuery,
  useGetResultsByOpponentRatingQuery,
} from "state/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard } from "@fortawesome/free-solid-svg-icons";
import MarimekkoChart from "components/MarimekkoChart";
import Metric from "components/Metric";
import { LocationSearchingOutlined } from "@mui/icons-material";
import { WinIcon, LossIcon, DrawIcon } from "components/ResultIcons";
import AnalysisBreakdown from "components/AnalysisBreakdown";
import FlexBetween from "components/FlexBetween";
import LineChart from "components/LineChart";
import ResultsHistogram from "components/ResultsHistogram";
import MyResponsiveBar from "components/MyResponsiveBar";
import { useSelector } from "react-redux";

const Overview = () => {
  const theme = useTheme();
  const timeClass = useSelector((state) => state.global.timeClass);
  const startDate = useSelector((state) => state.global.startDate);
  const endDate = useSelector((state) => state.global.endDate);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // SUPA DATA
  const supa_data = {
    timeclass: timeClass,
    startdate: startDate,
    enddate: endDate,
  };
  const { data: totalGamesData, isLoading: isTotalGamesLoading } =
    useGetTotalGamesQuery(supa_data);
  const { data: gamesByResult, isLoading: isGamesByResultLoading } =
    useGetGamesByResultQuery(supa_data);
  const { data: gamesByYear, isLoading: isGamesByYearLoading } =
    useGetGamesByYearQuery(supa_data);
  const { data: accuracyByMonth, isLoading: isAccuracyByMonthLoading } =
    useGetAccuracyByMonthQuery(supa_data);
  const { data: accuracyByMove, isLoading: isAccuracyByMoveLoading } =
    useGetAccuracyByMoveQuery(supa_data);
  const { data: accuracyByResult, isLoading: isAccuracyByResultLoading } =
    useGetAccuracyByResultQuery(supa_data);
  const {
    data: resultsByOpponentRating,
    isLoading: isResultsByOpponentRatingLoading,
  } = useGetResultsByOpponentRatingQuery(supa_data);

  if (
    !totalGamesData ||
    isTotalGamesLoading ||
    !gamesByResult ||
    isGamesByResultLoading ||
    !gamesByYear ||
    isGamesByYearLoading ||
    !accuracyByMonth ||
    isAccuracyByMonthLoading ||
    !accuracyByMove ||
    isAccuracyByMoveLoading ||
    !accuracyByResult ||
    isAccuracyByResultLoading ||
    !resultsByOpponentRating ||
    isResultsByOpponentRatingLoading
  )
    return <CircularProgress />;
  const win = gamesByResult.find((item) => item.Result === "Win");
  const draw = gamesByResult.find((item) => item.Result === "Draw");
  const loss = gamesByResult.find((item) => item.Result === "Loss");
  const chartData = [
    {
      statement: "Result",
      participation: totalGamesData[0].Total,
      win: win.Total,
      draw: draw.Total,
      loss: loss.Total,
      winpct: win.Percentage * 100,
      drawpct: draw.Percentage * 100,
      losspct: loss.Percentage * 100,
    },
  ];
  const accLineData = [
    {
      id: "Average Accuracy",
      data: accuracyByMonth.map((item) => {
        return {
          x: item.month,
          y: item.Accuracy,
        };
      }),
    },
  ];

  const accByMoveData = [
    {
      id: "Overall Accuracy",
      color: theme.palette.secondary[400],
      data: accuracyByMove.map((item) => {
        return {
          x: item.Move,
          y: item.All,
        };
      }),
    },
    {
      id: "White Accuracy",
      color: theme.palette.secondary[200],
      data: accuracyByMove.map((item) => {
        return {
          x: item.Move,
          y: item.White,
        };
      }),
    },
    {
      id: "Black Accuracy",
      color: theme.palette.secondary[100],
      data: accuracyByMove.map((item) => {
        return {
          x: item.Move,
          y: item.Black,
        };
      }),
    },
  ];
  return (
    <Box>
      <Header
        title="Overview"
        subtitle="Overview of general revenue and profit"
      />
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="80px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
        // mb="20px"
      >
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          borderRadius="1.55rem"
        >
          <Metric
            icon=<FontAwesomeIcon icon={faChessBoard} size="2x" />
            value={totalGamesData[0].Total}
          />
        </Box>
        <Box
          gridColumn="span 10"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="0rem"
          borderRadius="1.55rem"
        >
          <MarimekkoChart chartData={chartData} />
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="1.55rem"
        >
          <MyResponsiveBar
            data={gamesByYear}
            keys={["Total"]}
            index="year"
            xlabel="Year"
            ylabel="Total Games"
            labelFormat={false}
            // maxValue="100"
            tooltip={({ indexValue, value }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{indexValue}</span>
                <br />
                <span>Total Games: {value}</span>
              </div>
            )}
          />
        </Box>
      </Box>
      <br />

      <Divider />

      <br />
      <Header subtitle="Average accuracy" sx={{ mt: "20px" }} />
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="80px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          borderRadius="1.55rem"
        >
          <Metric
            icon=<LocationSearchingOutlined sx={{ fontSize: "30px" }} />
            value={accuracyByResult
              .find((item) => item.Result === "All")
              .avg.toFixed(2)}
          />
        </Box>
        <Box
          gridColumn="span 10"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="0rem"
          borderRadius="1.55rem"
        >
          <FlexBetween>
            <AnalysisBreakdown
              title="When you Win"
              icon=<WinIcon sx={{ fontSize: "30px" }} />
              value={`${accuracyByResult
                .find((item) => item.Result === "Win")
                .avg.toFixed(1)}%`}
            />
            <AnalysisBreakdown
              title="When you Draw"
              icon=<DrawIcon sx={{ fontSize: "30px" }} />
              value={`${accuracyByResult
                .find((item) => item.Result === "Draw")
                .avg.toFixed(1)}%`}
            />
            <AnalysisBreakdown
              title="When you Lose"
              icon=<LossIcon sx={{ fontSize: "30px" }} />
              value={`${accuracyByResult
                .find((item) => item.Result === "Loss")
                .avg.toFixed(1)}%`}
            />
          </FlexBetween>
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="1.55rem"
        >
          <LineChart
            data={accLineData}
            xlabel="Year"
            ylabel="Average Accuracy"
            xScale={{
              type: "time",
              format: "%Y-%m-%d",
              useUTC: false,
              precision: "month",
            }}
            xFormat="time:%Y-%m-%d"
            axisBottom={{
              format: "%b %Y",
              tickValues: 5,
              legendOffset: -12,
            }}
          />
        </Box>
      </Box>
      <br />
      <Divider />
      <br />
      <Header subtitle="Accuracy by Move Number" sx={{ mt: "20px" }} />
      <br />
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
          <LineChart
            data={accByMoveData}
            xlabel="Move Number"
            ylabel="Average Accuracy"
            xtickValues={[0, 10, 20, 30, 40, 50]}
          />
        </Box>
      </Box>
      <br />
      <Header subtitle="Results by opponent rating" sx={{ mt: "20px" }} />
      <br />
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
          <ResultsHistogram
            data={resultsByOpponentRating}
            indexBy="OpponentRating"
            bottomLegend="Opponent Rating"
            tooltip={({ data }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>
                  {data.OpponentRating} - {data.OpponentRating + 100}
                </span>
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

export default Overview;
