import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Header from "components/Header";
import {
  useGetYearlyStatsQuery,
  useGetResultStatsQuery,
  useGetMoveAccuracyQuery,
  useGetOpponentEloResultsQuery,
} from "state/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard } from "@fortawesome/free-solid-svg-icons";
import MarimekkoChart from "components/MarimekkoChart";
import Metric from "components/Metric";
import { LocationSearchingOutlined } from "@mui/icons-material";
import { WinIcon, LossIcon, DrawIcon } from "components/ResultIcons";
import AnalysisBreakdown from "components/AnalysisBreakdown";
import FlexBetween from "components/FlexBetween";
import { TabPanel, a11yProps } from "components/TabUtils";
import LineChart from "components/LineChart";
import ResultsHistogram from "components/ResultsHistogram";
import MyResponsiveBar from "components/MyResponsiveBar";

const Overview = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // MUI Tab handlers
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: yearlyStats, isLoading: isYearlyStatsLoading } =
    useGetYearlyStatsQuery();
  const { data: resultStats, isLoading: isResultStatsLoading } =
    useGetResultStatsQuery();
  const { data: moveAccuracy, isLoading: isMoveAccuracyLoading } =
    useGetMoveAccuracyQuery("All");
  const { data: moveAccuracyWhite, isLoading: isMoveAccuracyWhiteLoading } =
    useGetMoveAccuracyQuery("White");
  const { data: moveAccuracyBlack, isLoading: isMoveAccuracyBlackLoading } =
    useGetMoveAccuracyQuery("Black");
  const { data: opponentEloResults, isLoading: isOpponentEloResultsLoading } =
    useGetOpponentEloResultsQuery();

  if (
    !yearlyStats ||
    isYearlyStatsLoading ||
    !resultStats ||
    isResultStatsLoading ||
    !moveAccuracy ||
    isMoveAccuracyWhiteLoading ||
    !moveAccuracyWhite ||
    isMoveAccuracyLoading ||
    !moveAccuracyBlack ||
    isMoveAccuracyBlackLoading ||
    !opponentEloResults ||
    isOpponentEloResultsLoading
  )
    return <CircularProgress />;
  const win = resultStats.find((item) => item.result === "Win");
  const draw = resultStats.find((item) => item.result === "Draw");
  const loss = resultStats.find((item) => item.result === "Loss");
  const chartData = [
    {
      statement: "Result",
      participation: 2373,
      win: win.games,
      draw: draw.games,
      loss: loss.games,
      winpct: win.percentGames,
      drawpct: draw.percentGames,
      losspct: loss.percentGames,
    },
  ];
  let totalGames = yearlyStats.reduce(function (prev, current) {
    return prev + +current.totalGames;
  }, 0);
  let avgAccOverall =
    yearlyStats.reduce(function (prev, current) {
      return prev + +(current.totalGames * current.avgAcc);
    }, 0) / totalGames;
  const winAcc = resultStats.find((item) => item.result === "Win").avgAcc;
  const drawAcc = resultStats.find((item) => item.result === "Draw").avgAcc;
  const lossAcc = resultStats.find((item) => item.result === "Loss").avgAcc;
  const accLineData = [
    {
      id: "Average Accuracy",
      data: yearlyStats.map((item) => {
        return {
          x: item._id,
          y: item.avgAcc,
        };
      }),
    },
  ];
  const moveAccLineData = [
    {
      id: "Average Accuracy by Move",
      data: moveAccuracy,
    },
  ];
  const moveAccByColorLinesData = [
    {
      id: "White",
      color: "hsl(52, 70%, 50%)",
      data: moveAccuracyWhite,
    },
    {
      id: "Black",
      color: "hsl(237, 70%, 50%)",
      data: moveAccuracyBlack,
    },
  ];
  console.log(opponentEloResults);
  return (
    <Box m="1.5rem 2.5rem">
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
        mb="20px"
      >
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          borderRadius="1.55rem"
        >
          <Metric
            icon=<FontAwesomeIcon icon={faChessBoard} size="3x" />
            value={totalGames}
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
            data={yearlyStats}
            keys={["totalGames"]}
            index="_id"
            xlabel="Year"
            ylabel="Number of Games"
            tooltip={({ indexValue, value }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{indexValue}</span>
                <br />
                <span>Average Accuracy: {value}</span>
              </div>
            )}
          />
        </Box>
      </Box>
      <Divider />
      <br />
      <Header subtitle="Average accuracy" sx={{ mt: "20px" }} />
      <Box
        mt="20px"
        mb="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="80px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
        backgroundColor={theme.palette.background.alt}
        borderRadius="1.55rem"
        p="2rem 0rem"
      >
        {/* <Box gridColumn="span 1" gridRow="span 1" /> */}
        <Box gridColumn="span 3" gridRow="span 1" ml="5rem">
          <Metric
            icon=<LocationSearchingOutlined sx={{ fontSize: "50px" }} />
            value={avgAccOverall.toFixed(2)}
          />
        </Box>
        <Box gridColumn="span 1" gridRow="span 1" />
        <Box
          gridColumn="span 7"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="-10rem 14rem"
          borderRadius="1.55rem"
        >
          <FlexBetween>
            <AnalysisBreakdown
              title="When you Win"
              icon=<WinIcon sx={{ fontSize: "30px" }} />
              value={`${winAcc.toFixed(1)}%`}
            />
            <AnalysisBreakdown
              title="When you Draw"
              icon=<DrawIcon sx={{ fontSize: "30px" }} />
              value={`${drawAcc.toFixed(1)}%`}
            />
            <AnalysisBreakdown
              title="When you Lose"
              icon=<LossIcon sx={{ fontSize: "30px" }} />
              value={`${lossAcc.toFixed(1)}%`}
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
          />
        </Box>
      </Box>
      <Divider />
      <br />
      <Header subtitle="Accuracy by Move Number" sx={{ mt: "20px" }} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Overall" {...a11yProps(0)} />
          <Tab label="By Piece Color" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
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
                data={moveAccLineData}
                xlabel="Move Number"
                ylabel="Average Accuracy"
                xtickValues={[0, 10, 20, 30, 40, 50]}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
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
                data={moveAccByColorLinesData}
                xlabel="Move Number"
                ylabel="Average Accuracy"
                xtickValues={[0, 10, 20, 30, 40, 50]}
                legend={true}
              />
            </Box>
          </Box>
        </TabPanel>
      </Box>
      <Divider />
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
            data={opponentEloResults}
            bottomLegend="Opponent Rating"
            tooltip={({ id, value, color, data }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>
                  {data._id}-{data._id + 100}
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
            defs={[
              {
                id: "winpct",
                type: "patternDots",
                background: theme.palette.result.win,
                color: theme.palette.result.win,
                size: 1,
                padding: 0,
                stagger: false,
              },
              {
                id: "drawpct",
                type: "patternDots",
                background: theme.palette.result.draw,
                color: theme.palette.result.draw,
                size: 1,
                padding: 0,
                stagger: false,
              },
              {
                id: "losspct",
                type: "patternDots",
                background: theme.palette.result.loss,
                color: theme.palette.result.loss,
                size: 1,
                padding: 0,
                stagger: false,
              },
            ]}
            fill={[
              {
                match: {
                  id: "winpct",
                },
                id: "winpct",
              },
              {
                match: {
                  id: "drawpct",
                },
                id: "drawpct",
              },
              {
                match: {
                  id: "losspct",
                },
                id: "losspct",
              },
            ]}
          />
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Overview;
