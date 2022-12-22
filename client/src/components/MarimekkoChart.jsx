import { ResponsiveMarimekko } from "@nivo/marimekko";
import { useTheme } from "@mui/system";
import FlexBetween from "./FlexBetween";
import { Box, Typography } from "@mui/material";
import {
  BalanceOutlined,
  IndeterminateCheckBox,
  LocalHospital,
} from "@mui/icons-material";

const commonProps = {
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  id: "statement",
  value: "participation",
  layout: "vertical",
  axisLeft: {},
  axisBottom: {},
  dimensions: [
    {
      id: "Win",
      value: "win",
    },
    {
      id: "draw",
      value: "draw",
    },
    {
      id: "loss",
      value: "loss",
    },
  ],
};

const MarimekkoChart = ({ chartData }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="0.4rem 1rem"
      flex="1 1 100%"
      backgrounColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween p="0.1rem 1rem">
        <FlexBetween>
          <LocalHospital style={{ fill: theme.palette.result.win }} />
          <Typography variant="h3" fontWeight="600" mr="10px">
            {chartData[0].winpct.toFixed(2)}%
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <BalanceOutlined style={{ fill: theme.palette.result.draw }} />
          <Typography variant="h3" fontWeight="600" mr="10px">
            {chartData[0].drawpct.toFixed(2)}%
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <IndeterminateCheckBox style={{ fill: theme.palette.result.loss }} />
          <Typography variant="h3" fontWeight="600" mr="10px">
            {chartData[0].losspct.toFixed(2)}%
          </Typography>
        </FlexBetween>
      </FlexBetween>
      <Box height="1vh">
        <ResponsiveMarimekko
          {...commonProps}
          data={chartData}
          innerPadding={32}
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
          enableGridY={false}
          layout="horizontal"
          offset="silouhette"
          layers={["grid", "axes", "bars"]}
          axisLeft={undefined}
          axisBottom={undefined}
          defs={[
            {
              id: "win",
              type: "patternDots",
              background: theme.palette.result.win,
              color: theme.palette.result.win,
              size: 1,
              padding: 0,
              stagger: false,
            },
            {
              id: "draw",
              type: "patternDots",
              background: theme.palette.result.draw,
              color: theme.palette.result.draw,
              size: 1,
              padding: 0,
              stagger: false,
            },
            {
              id: "loss",
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
                id: "Win",
              },
              id: "win",
            },
            {
              match: {
                id: "draw",
              },
              id: "draw",
            },
            {
              match: {
                id: "loss",
              },
              id: "loss",
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default MarimekkoChart;
