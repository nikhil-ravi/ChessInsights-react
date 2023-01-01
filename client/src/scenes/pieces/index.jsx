import React from "react";
import { useGetPieceStatsQuery } from "state/api";
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
import { useSelector } from "react-redux";

const pieceAlias = {
  p: "Pawn",
  n: "Knight",
  b: "Bishop",
  r: "Rook",
  q: "Queen",
  k: "King",
};

const Pieces = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const userName = useSelector((state) => state.global.userName);
  const timeClass = useSelector((state) => state.global.timeClass);
  const startDate = useSelector((state) => state.global.startDate);
  const endDate = useSelector((state) => state.global.endDate); // SUPA DATA
  const supa_data = {
    username: userName, 
    timeclass: timeClass,
    startdate: startDate,
    enddate: endDate,
  };
  const { data: pieceStats, isLoading: isPieceStatsLoading } =
    useGetPieceStatsQuery(supa_data);
  if (!pieceStats || isPieceStatsLoading) return <CircularProgress />;
  const formattedData = pieceStats.map((item) => ({
    ...item,
    Piece: pieceAlias[item.Piece],
  }));
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Pieces" subtitle="Moves per piece" sx={{ mt: "20px" }} />
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
            data={formattedData}
            colors={{ scheme: "nivo" }}
            id="Piece"
            value="Percentage"
            tooltipName="Total Moves"
            tooltipValue="Total"
            arcLinkLabel={(d) => `${d.id}: ${d.value}`}
          />
        </Box>
      </Box>

      <Divider />
      <br />
      <Header subtitle="Moves per piece by game phase" sx={{ mt: "20px" }} />
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
          p="0rem"
          borderRadius="1.55rem"
        >
          <ResultsHistogram
            data={formattedData.map((d) => ({
              ...d,
              OpeningPercentage: d.OpeningPercentage * 100,
              MiddlegamePercentage: d.MiddlegamePercentage * 100,
              EndgamePercentage: d.EndgamePercentage * 100,
            }))}
            indexBy="Piece"
            keys={[
              "OpeningPercentage",
              "MiddlegamePercentage",
              "EndgamePercentage",
            ]}
            bottomLegend="Piece"
            tooltip={({ data }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{data.Piece}</span>
                {data.OpeningTotal && (
                  <>
                    <br />
                    <strong>
                      Opening: {data.OpeningPercentage.toFixed(2)}% (
                      {data.OpeningTotal})
                    </strong>
                  </>
                )}
                {data.MiddlegameTotal && (
                  <>
                    <br />
                    <strong>
                      Middlegame: {data.MiddlegamePercentage.toFixed(2)}% (
                      {data.MiddlegameTotal})
                    </strong>
                  </>
                )}
                {data.EndgameTotal && (
                  <>
                    <br />
                    <strong>
                      Endgame: {data.EndgamePercentage.toFixed(2)}% (
                      {data.EndgameTotal})
                    </strong>
                  </>
                )}
              </div>
            )}
            colors={(datum) => {
              return theme.palette.gamephase[
                datum.id.toLowerCase().split("percentage")[0]
              ];
            }}
            legendLabel={(datum) => `${datum.id.split("Percentage")[0]}`}
            legends={[
              {
                dataFrom: "keys",
                anchor: "top",
                direction: "row",
                justify: false,
                translateX: 25,
                translateY: -25,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      </Box>

      <Divider />
      <br />
      <Header subtitle="Average accuracy per piece" sx={{ mt: "20px" }} />
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
            data={formattedData}
            keys={["Accuracy"]}
            index="Piece"
            xlabel="Piece"
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
      <Header
        subtitle="Average accuracy per piece by game phase"
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
          <MyResponsiveBar
            data={formattedData}
            keys={["OpeningAccuracy", "MiddlegameAccuracy", "EndgameAccuracy"]}
            index="Piece"
            xlabel="Piece"
            ylabel="Average Accuracy"
            labelFormat={true}
            maxValue="100"
            labelDecimals={0}
            tooltip={({ id, indexValue, value }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{id.split("Accuracy")[0]} Accuracy</span>
                <br />
                <span>
                  {indexValue}: {value.toFixed(2)}%
                </span>
              </div>
            )}
            padding={0.1}
            colors={(datum) => {
              return theme.palette.gamephase[
                datum.id.toLowerCase().split("accuracy")[0]
              ];
            }}
            legendLabel={(datum) => `${datum.id.split("Accuracy")[0]}`}
            legend={[
              {
                dataFrom: "keys",
                anchor: "top",
                direction: "row",
                justify: false,
                translateX: 25,
                translateY: -21,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Pieces;
