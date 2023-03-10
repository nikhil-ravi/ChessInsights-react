import React from "react";
import {
  useGetCastleStagesQuery,
  useGetCastleOpponentTypeQuery,
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
import ResultsHistogram from "components/ResultsHistogram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard } from "@fortawesome/free-solid-svg-icons";
import FlexBetween from "components/FlexBetween";
import { LocationSearchingOutlined } from "@mui/icons-material";
import AnalysisBreakdown from "components/AnalysisBreakdown";
import { useSelector } from "react-redux";

const Castling = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const userName = useSelector((state) => state.global.userName);
  const timeClass = useSelector((state) => state.global.timeClass);
  const startDate = useSelector((state) => state.global.startDate);
  const endDate = useSelector((state) => state.global.endDate);
  // SUPA DATA
  const supa_data = {
    username: userName, 
    timeclass: timeClass,
    startdate: startDate,
    enddate: endDate,
  };
  const { data: castleStages, isLoading: isCastleStagesLoading } =
    useGetCastleStagesQuery(supa_data);
  const { data: castleTypes, isLoading: isCastleTypesLoading } =
    useGetCastleOpponentTypeQuery(supa_data);
  if (
    !castleStages ||
    isCastleStagesLoading ||
    !castleTypes ||
    isCastleTypesLoading
  )
    return <CircularProgress />;
  const formattedData = castleTypes.map((datum) => {
    return {
      UserCastle: datum.UserCastleType,
      Total: datum.Total,
      Accuracy: datum.Accuracy,
      opponentCastleData: [
        {
          OpponentCastle: "Short",
          Win: datum.ShortWinTotal,
          Draw: datum.ShortDrawTotal,
          Loss: datum.ShortLossTotal,
          WinPercentage: datum.ShortWinPercentage,
          DrawPercentage: datum.ShortDrawPercentage,
          LossPercentage: datum.ShortLossPercentage,
        },
        {
          OpponentCastle: "Long",
          Win: datum.LongWinTotal,
          Draw: datum.LongDrawTotal,
          Loss: datum.LongLossTotal,
          WinPercentage: datum.LongWinPercentage,
          DrawPercentage: datum.LongDrawPercentage,
          LossPercentage: datum.LongLossPercentage,
        },
        {
          OpponentCastle: "NoCastling",
          Win: datum.NoCastlingWinTotal,
          Draw: datum.NoCastlingDrawTotal,
          Loss: datum.NoCastlingLossTotal,
          WinPercentage: datum.NoCastlingWinPercentage,
          DrawPercentage: datum.NoCastlingDrawPercentage,
          LossPercentage: datum.NoCastlingLossPercentage,
        },
      ],
    };
  });
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Castling"
        subtitle="Games where you castled in the..."
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
            data={castleStages}
            colors={(datum) => {
              return theme.palette.castleStage[datum.id.toLowerCase()];
            }}
            id="GameStage"
            value="Percentage"
            tooltipName="Total Games"
            tooltipValue="Total"
            arcLinkLabel={(d) => `${d.id}: ${d.value}`}
          />
        </Box>
      </Box>
      <Divider />
      <br />
      <Header
        subtitle="Results when you castled in the..."
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
            data={castleStages.map((d) => ({
              ...d,
              WinPercentage: d.WinPercentage * 100,
              DrawPercentage: d.DrawPercentage * 100,
              LossPercentage: d.LossPercentage * 100,
            }))}
            indexBy="GameStage"
            keys={["WinPercentage", "DrawPercentage", "LossPercentage"]}
            bottomLegend="Castled In"
            tooltip={({ data }) => (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <span>{data.GameStage}</span>
                {data.WinTotal && (
                  <>
                    <br />
                    <strong>
                      Win: {data.WinPercentage.toFixed(2)}% ({data.WinTotal})
                    </strong>
                  </>
                )}
                {data.DrawTotal && (
                  <>
                    <br />
                    <strong>
                      Draw: {data.DrawPercentage.toFixed(2)}% ({data.DrawTotal})
                    </strong>
                  </>
                )}
                {data.LossTotal && (
                  <>
                    <br />
                    <strong>
                      Loss: {data.LossPercentage.toFixed(2)}% ({data.LossTotal})
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
      {formattedData.map(
        ({ UserCastle, Total, Accuracy, opponentCastleData }) => {
          return (
            <Box key={UserCastle}>
              <Divider />
              <br />
              <Header
                subtitle={
                  UserCastle === "NoCastling"
                    ? "When you did not castle"
                    : UserCastle === "Long"
                    ? "When you castled long (queenside)"
                    : "When you castled short (kingside)"
                }
                sx={{ mt: "20px" }}
              />
              <FlexBetween>
                <AnalysisBreakdown
                  title="Total Games"
                  icon={<FontAwesomeIcon icon={faChessBoard} size="2x" />}
                  value={Total}
                />
                <AnalysisBreakdown
                  title="Accuracy"
                  icon={<LocationSearchingOutlined />}
                  value={Accuracy.toFixed(1)}
                />
              </FlexBetween>
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
                    data={opponentCastleData.map((d) => ({
                      ...d,
                      WinPercentage: d.WinPercentage * 100,
                      DrawPercentage: d.DrawPercentage * 100,
                      LossPercentage: d.LossPercentage * 100,
                    }))}
                    indexBy="OpponentCastle"
                    keys={["WinPercentage", "DrawPercentage", "LossPercentage"]}
                    bottomLegend="Opponent Castled"
                    tooltip={({ data }) => (
                      <div
                        style={{
                          padding: 12,
                          background: theme.palette.primary.main,
                        }}
                      >
                        <span>{data.OpponentCastle}</span>
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
                              Draw: {data.DrawPercentage.toFixed(2)}% (
                              {data.Draw})
                            </strong>
                          </>
                        )}
                        {data.Loss && (
                          <>
                            <br />
                            <strong>
                              Loss: {data.LossPercentage.toFixed(2)}% (
                              {data.Loss})
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
                    legendLabel={(datum) =>
                      `${datum.id.split("Percentage")[0]}`
                    }
                  />
                </Box>
              </Box>
            </Box>
          );
        }
      )}
    </Box>
  );
};

export default Castling;
