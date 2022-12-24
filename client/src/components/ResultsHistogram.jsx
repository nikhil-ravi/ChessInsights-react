import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

const ResultsHistogram = ({
  data,
  tooltip,
  leftTickVals = 5,
  bottomLegend,
  indexBy = "_id",
  keys = ["winpct", "drawpct", "losspct"],
  defs,
  fill,
  legends = [
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
  ],
  legendLabel = undefined,
  colors = undefined,
}) => {
  const theme = useTheme();
  return (
    <ResponsiveBar
      data={data}
      indexBy={indexBy}
      keys={keys}
      offset="expand"
      padding={0.01}
      innerPadding={0}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        ticksPosition: "left",
        tickRotation: 0,
        legend: bottomLegend,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -40,
        legendPosition: "middle",
        tickValues: leftTickVals,
        format: (d) => `${d}%`,
      }}
      margin={{ top: 25, right: 80, bottom: 45, left: 80 }}
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
      borderWidth={2}
      borderColor={{
        from: "theme",
        modifiers: [["darker", 0.2]],
      }}
      defs={defs}
      fill={fill}
      legends={legends}
      legendLabel={legendLabel}
      enableSlices="x"
      valueFormat="> .2f"
      enableLabel={false}
      tooltip={tooltip}
      colors={colors}
    />
  );
};

export default ResultsHistogram;
