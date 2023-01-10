import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import MarimekkoChart from "components/MarimekkoChart";
import AnalysisBreakdown from "components/AnalysisBreakdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard } from "@fortawesome/free-solid-svg-icons";
import {
  LocationSearchingOutlined,
  ScoreboardOutlined,
} from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";

const MyResponsiveChoropleth = ({ formattedData, domain }) => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Box mt="40px" height="75vh">
        <ResponsiveChoropleth
          data={formattedData}
          colors={"RdYlGn"}
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
                fontSize: 15,
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          features={geoData.features}
          margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
          domain={domain}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={150}
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[-4, 0, 0]}
          borderWidth={1.3}
          borderColor="#ffffff"
          tooltip={({ feature }) => {
            if (!feature.data) return <></>;
            return (
              <Box
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 0.5fr)",
                    gap: 0,
                    gridTemplateRows: "auto",
                    gridTemplateAreas: `". . label . ."
    "metricGames .  metricScore . metricAcc"
    "WDLchart WDLchart WDLchart WDLchart WDLchart"`,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  <Box
                    sx={{
                      gridArea: "label",
                      bgcolor: theme.palette.primary.main,
                    }}
                    centered="true"
                  >
                    <strong>{feature.label}</strong>
                  </Box>
                  <Box
                    sx={{
                      gridArea: "metricGames",
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <AnalysisBreakdown
                      title="Games"
                      icon={<FontAwesomeIcon icon={faChessBoard} size="2x" />}
                      value={feature.data.total}
                    />
                  </Box>
                  <Box
                    sx={{
                      gridArea: "metricScore",
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <AnalysisBreakdown
                      title="Score"
                      icon={<ScoreboardOutlined sx={{ fontSize: "30px" }} />}
                      value={feature.data.value.toFixed(2)}
                    />
                  </Box>
                  <Box
                    sx={{
                      gridArea: "metricAcc",
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <AnalysisBreakdown
                      title="Accuracy"
                      icon={<LocationSearchingOutlined />}
                      value={feature.data.acc.toFixed(2)}
                    />
                  </Box>
                  <Box
                    sx={{
                      gridArea: "WDLchart",
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <MarimekkoChart
                      chartData={[feature.data]}
                      textVariant={"h5"}
                    />
                  </Box>
                </Box>
              </Box>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default MyResponsiveChoropleth;
