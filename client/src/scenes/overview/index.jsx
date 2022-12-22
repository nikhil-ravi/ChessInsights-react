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
import { ResponsiveBar } from "@nivo/bar";
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
import MyResponsiveMarimekko from "components/ResultsHistogram";

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
          <ResponsiveBar
            data={yearlyStats}
            keys={["totalGames"]}
            indexBy="_id"
            margin={{ top: 20, right: 60, bottom: 50, left: 60 }}
            padding={0}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            // colors={{ datum: "data.color" }}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Year",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Number of Games",
              legendPosition: "middle",
              legendOffset: -40,
              tickValues: 4,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            legends={[]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function (e) {
              return (
                e.id + ": " + e.formattedValue + " in country: " + e.indexValue
              );
            }}
          />
        </Box>
      </Box>
      <Divider />
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
      <Header subtitle="Results by opponent rating" sx={{ mt: "20px" }} />
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
          <MyResponsiveMarimekko data={opponentEloResults} />
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Overview;
