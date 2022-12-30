import React from "react";
import { useGetGamePhasesQuery } from "state/api";
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
import { useSelector } from "react-redux";


const GamePhases = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const timeClass = useSelector((state) => state.global.timeClass);
  const startDate = useSelector((state) => state.global.startDate);
  const endDate = useSelector((state) => state.global.endDate);
  const supa_data = {
    timeclass: timeClass,
    startdate: startDate,
    enddate: endDate,
  };
  const { data: gamePhases, isLoading: isGamePhasesLoading } =
    useGetGamePhasesQuery(supa_data);
  if (
    !gamePhases ||
    isGamePhasesLoading
  )
    return <CircularProgress />;
  

  const formattedData = gamePhases
    .map((datum) => {
      return [
        {
          GameEndStageByColor: datum.GameEndInStage + " - White",
          Total: datum.whiteTotal,
          Accuracy: datum.whiteAccuracy,
          Win: datum.whiteWinTotal,
          Draw: datum.whiteDrawTotal,
          Loss: datum.whiteLossTotal,
          WinPercentage: datum.whiteWinPercentage,
          DrawPercentage: datum.whiteDrawPercentage,
          LossPercentage: datum.whiteLossPercentage,
        },
        {
          GameEndStageByColor: datum.GameEndInStage + " - Black",
          Total: datum.blackTotal,
          Accuracy: datum.blackAccuracy,
          Win: datum.blackWinTotal,
          Draw: datum.blackDrawTotal,
          Loss: datum.blackLossTotal,
          WinPercentage: datum.blackWinPercentage,
          DrawPercentage: datum.blackDrawPercentage,
          LossPercentage: datum.blackLossPercentage,
        },
      ];
    })
    .flat(1);
  const gamePhasesColorData = ["White", "Black"].map((color) => {
    return gamePhases
      .map((datum) => {
        return {
          UserColor: color,
          [datum.GameEndInStage]: datum[`${color.toLowerCase()}Total`],
          ["Percentage" + datum.GameEndInStage]:
            datum[`${color.toLowerCase()}Percentage`],
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
            data={gamePhases}
            colors={(datum) => {
              return theme.palette.gamephase[datum.id.toLowerCase()];
            }}
            id="GameEndInStage"
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
            data={gamePhases}
            keys={["Accuracy"]}
            index="GameEndInStage"
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
            data={gamePhases.map((d) => ({
              ...d,
              winPercentage: d.winPercentage * 100,
              drawPercentage: d.drawPercentage * 100,
              lossPercentage: d.lossPercentage * 100,
            }))}
            indexBy="GameEndInStage"
            keys={["winPercentage", "drawPercentage", "lossPercentage"]}
            bottomLegend="Game ended in"
            tooltip={({ data }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{data.GameEndInStage}</span>
                {data.winTotal && (
                  <>
                    <br />
                    <strong>
                      Win: {data.winPercentage.toFixed(2)}% ({data.winTotal})
                    </strong>
                  </>
                )}
                {data.drawTotal && (
                  <>
                    <br />
                    <strong>
                      Draw: {data.drawPercentage.toFixed(2)}% ({data.drawTotal})
                    </strong>
                  </>
                )}
                {data.lossTotal && (
                  <>
                    <br />
                    <strong>
                      Loss: {data.lossPercentage.toFixed(2)}% ({data.lossTotal})
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
            legendLabel={(datum) => {
              const word = datum.id.split("Percentage")[0];
              const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
              return `${capitalized}`;
            }}
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
            data={gamePhasesColorData.map((d) => ({
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
                {data.Opening && (
                  <>
                    <br />
                    <strong>
                      Opening: {data.PercentageOpening.toFixed(2)}% (
                      {data.Opening})
                    </strong>
                  </>
                )}
                {data.Middlegame && (
                  <>
                    <br />
                    <strong>
                      Middlegame: {data.PercentageMiddlegame.toFixed(2)}% (
                      {data.Middlegame})
                    </strong>
                  </>
                )}
                {data.Endgame && (
                  <>
                    <br />
                    <strong>
                      Endgame: {data.PercentageEndgame.toFixed(2)}% (
                      {data.Endgame})
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
            data={gamePhases}
            keys={["whiteAccuracy", "blackAccuracy"]}
            index="GameEndInStage"
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
                  {id === "whiteAccuracy" ? "White Accuracy" : "Black Accuracy"}
                  : {value.toFixed(2)}%
                </span>
              </div>
            )}
            legend={[
              {
                dataFrom: "keys",
                anchor: "top",
                direction: "row",
                justify: false,
                translateX: 25,
                translateY: -22,
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
            legendLabel={(datum) =>
              `${datum.id === "whiteAccuracy" ? "White" : "Black"}`
            }
            colors={(datum) =>
              `${datum.id === "whiteAccuracy" ? "#ddac67" : "#382d1c"}`
            }
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
