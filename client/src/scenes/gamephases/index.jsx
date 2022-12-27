import React from "react";
import { useGetGameEndStageStatsQuery } from "state/api";
import {
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";
import ResultsHistogram from "components/ResultsHistogram";
import MyResponsiveBar from "components/MyResponsiveBar";

function orderGamePhase(phase) {
  return phase === "Opening" ? 1 : phase === "Middlegame" ? 2 : 3;
}

const GamePhases = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: gameEndStageStats, isLoading: isGameEndStageStatsLoading } =
    useGetGameEndStageStatsQuery();
  if (!gameEndStageStats || isGameEndStageStatsLoading)
    return <CircularProgress />;
  const gameEndStageStatswOrder = gameEndStageStats
    .map((element) => {
      return {
        ...element,
        order: orderGamePhase(element.id),
      };
    })
    .sort((a, b) => {
      return a.order < b.order ? 1 : -1;
    });
  const formattedData = gameEndStageStatswOrder
    .map((datum) => {
      return [
        {
          GameEndStageByColor: datum.GameEndedIn + " - White",
          Total: datum.WhiteTotal,
          Accuracy: datum.WhiteAccuracy,
          Win: datum.WhiteWin,
          Draw: datum.WhiteDraw,
          Loss: datum.WhiteLoss,
          WinPercentage: datum.WhiteWinPercentage,
          DrawPercentage: datum.WhiteDrawPercentage,
          LossPercentage: datum.WhiteLossPercentage,
        },
        {
          GameEndStageByColor: datum.GameEndedIn + " - Black",
          Total: datum.BlackTotal,
          Accuracy: datum.BlackAccuracy,
          Win: datum.BlackWin,
          Draw: datum.BlackDraw,
          Loss: datum.BlackLoss,
          WinPercentage: datum.BlackWinPercentage,
          DrawPercentage: datum.BlackDrawPercentage,
          LossPercentage: datum.BlackLossPercentage,
        },
      ];
    })
    .flat(1);
  const userColorData = ["White", "Black"].map((color) => {
    return gameEndStageStatswOrder
      .map((datum) => {
        return {
          UserColor: color,
          ["Moves" + datum.GameEndedIn]: datum[`${color}Total`],
          ["Percentage" + datum.GameEndedIn]: datum[`${color}Percentage`],
        };
      })
      .reduce(
        (acc, datum) => ({
          ...acc,
          ...datum,
        }),
        {}
      );
  });
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Game Phases"
        subtitle="Games that ended in the..."
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
            data={gameEndStageStatswOrder}
            colors={(datum) => {
              return theme.palette.gamephase[datum.id.toLowerCase()];
            }}
            id="GameEndedIn"
            value="Percentage"
            tooltipName="Total Games"
            tooltipValue="Total"
            arcLinkLabel={(d) => `${d.id}: ${d.value}`}
          />
        </Box>
      </Box>

      <Divider />
      <br />
      <Header subtitle={"Accuracy by game phase"} sx={{ mt: "20px" }} />
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
            data={gameEndStageStatswOrder}
            keys={["Accuracy"]}
            index="GameEndedIn"
            xlabel="For moves in the..."
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
        subtitle="Results for games that ended in the..."
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
          p="0rem"
          borderRadius="1.55rem"
        >
          <ResultsHistogram
            data={gameEndStageStatswOrder.map((d) => ({
              ...d,
              WinPercentage: d.WinPercentage * 100,
              DrawPercentage: d.DrawPercentage * 100,
              LossPercentage: d.LossPercentage * 100,
            }))}
            indexBy="GameEndedIn"
            keys={["WinPercentage", "DrawPercentage", "LossPercentage"]}
            bottomLegend="Game ended in"
            tooltip={({ data }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{data.GameEndedIn}</span>
                {data.Win && (
                  <>
                    <br />
                    <strong>
                      Win: {data.WinPercentage.toFixed(2)}% ({data.Win})
                    </strong>
                  </>
                )}
                {data.Draw && (
                  <>
                    <br />
                    <strong>
                      Draw: {data.DrawPercentage.toFixed(2)}% ({data.Draw})
                    </strong>
                  </>
                )}
                {data.Loss && (
                  <>
                    <br />
                    <strong>
                      Loss: {data.LossPercentage.toFixed(2)}% ({data.Loss})
                    </strong>
                  </>
                )}
              </div>
            )}
            colors={(datum) => {
              return theme.palette.result[
                datum.id.toLowerCase().split("percentage")[0]
              ];
            }}
            legendLabel={(datum) => `${datum.id.split("Percentage")[0]}`}
          />
        </Box>
      </Box>

      <Divider />
      <br />
      <Header subtitle="Games that ended in the..." sx={{ mt: "20px" }} />
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
            data={userColorData.map((d) => ({
              ...d,
              PercentageOpening: d.PercentageOpening * 100,
              PercentageMiddlegame: d.PercentageMiddlegame * 100,
              PercentageEndgame: d.PercentageEndgame * 100,
            }))}
            indexBy="UserColor"
            keys={[
              "PercentageOpening",
              "PercentageMiddlegame",
              "PercentageEndgame",
            ]}
            bottomLegend="Player Piece Color"
            tooltip={({ data }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{data.UserColor}</span>
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
      <Header
        subtitle="Accuracy by game phase and player piece color"
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
          p="0rem"
          borderRadius="1.55rem"
        >
          <MyResponsiveBar
            data={gameEndStageStatswOrder}
            keys={["WhiteAccuracy", "BlackAccuracy"]}
            index="GameEndedIn"
            xlabel="Game ended in"
            ylabel="Average Accuracy"
            labelFormat={true}
            maxValue="100"
            tooltip={({ indexValue, id, value }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{indexValue}</span>
                <br />
                <span>
                  {id.split("Accuracy")[0]} Accuracy: {value.toFixed(2)}%
                </span>
              </div>
            )}
          />
        </Box>
      </Box>

      <Divider />
      <br />
      <Header
        subtitle="Results for games that ended in the..."
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
          gridRow="span 5"
          backgroundColor={theme.palette.background.alt}
          p="0rem"
          borderRadius="1.55rem"
        >
          <ResultsHistogram
            data={formattedData.map((d) => ({
              ...d,
              WinPercentage: d.WinPercentage * 100,
              DrawPercentage: d.DrawPercentage * 100,
              LossPercentage: d.LossPercentage * 100,
            }))}
            indexBy="GameEndStageByColor"
            keys={["WinPercentage", "DrawPercentage", "LossPercentage"]}
            bottomLegend="Game ended in"
            tooltip={({ data }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{data.GameEndStageByColor}</span>
                {data.Win && (
                  <>
                    <br />
                    <strong>
                      Win: {data.WinPercentage.toFixed(2)}% ({data.Win})
                    </strong>
                  </>
                )}
                {data.Draw && (
                  <>
                    <br />
                    <strong>
                      Draw: {data.DrawPercentage.toFixed(2)}% ({data.Draw})
                    </strong>
                  </>
                )}
                {data.Loss && (
                  <>
                    <br />
                    <strong>
                      Loss: {data.LossPercentage.toFixed(2)}% ({data.Loss})
                    </strong>
                  </>
                )}
              </div>
            )}
            axisTop={{
              orient: "top",
              tickSize: 5,
              tickPadding: 5,
              ticksPosition: "left",
              tickRotation: 0,
              legendOffset: 36,
              legendPosition: "middle",
              format: (d) => {
                const [gameEndStage] = d.split(" - ");
                return gameEndStage;
              },
            }}
            bottomTickFormat={(d) => {
              const [, playerColor] = d.split(" - ");
              return playerColor;
            }}
            colors={(datum) => {
              return theme.palette.result[
                datum.id.toLowerCase().split("percentage")[0]
              ];
            }}
            legendLabel={(datum) => `${datum.id.split("Percentage")[0]}`}
            margin={{ top: 65, right: 80, bottom: 45, left: 80 }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "top",
                direction: "row",
                justify: false,
                translateX: 25,
                translateY: -55,
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

export default GamePhases;
