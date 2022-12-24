import React from "react";
import { useGetPieceCntAccQuery } from "state/api";
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

const Pieces = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: pieceCntAcc, isLoading: isPieceCntAccLoading } =
    useGetPieceCntAccQuery();
  if (!pieceCntAcc || isPieceCntAccLoading) return <CircularProgress />;

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
            data={pieceCntAcc}
            colors={{ scheme: "nivo" }}
            id="Piece"
            value="Percentage"
            tooltipName="Total Moves"
            tooltipValue="Moves"
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
            data={pieceCntAcc.map((d) => ({
              ...d,
              PercentageOpening: d.PercentageOpening * 100,
              PercentageMiddlegame: d.PercentageMiddlegame * 100,
              PercentageEndgame: d.PercentageEndgame * 100,
            }))}
            indexBy="Piece"
            keys={[
              "PercentageOpening",
              "PercentageMiddlegame",
              "PercentageEndgame",
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
                {data.MovesOpening && (
                  <>
                    <br />
                    <strong>
                      Opening: {data.PercentageOpening.toFixed(2)}% (
                      {data.MovesOpening})
                    </strong>
                  </>
                )}
                {data.MovesMiddlegame && (
                  <>
                    <br />
                    <strong>
                      Middlegame: {data.PercentageMiddlegame.toFixed(2)}% (
                      {data.MovesMiddlegame})
                    </strong>
                  </>
                )}
                {data.MovesEndgame && (
                  <>
                    <br />
                    <strong>
                      Endgame: {data.PercentageEndgame.toFixed(2)}% (
                      {data.MovesEndgame})
                    </strong>
                  </>
                )}
              </div>
            )}
            colors={(datum) => {
              return theme.palette.gamephase[
                datum.id.toLowerCase().split("percentage").slice(1)
              ];
            }}
            legendLabel={(datum) => `${datum.id.split("Percentage").slice(1)}`}
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
            data={pieceCntAcc}
            keys={["AvgAcc"]}
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
            data={pieceCntAcc}
            keys={["AvgAccOpening", "AvgAccMiddlegame", "AvgAccEndgame"]}
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
                <span>{id.split("AvgAcc").slice(1)} Accuracy</span>
                <br />
                <span>
                  {indexValue}: {value.toFixed(2)}%
                </span>
              </div>
            )}
            padding={0.1}
            colors={(datum) => {
              return theme.palette.gamephase[
                datum.id.toLowerCase().split("avgacc").slice(1)
              ];
            }}
            legendLabel={(datum) => `${datum.id.split("AvgAcc").slice(1)}`}
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
