import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({
  data,
  keys,
  index,
  xlabel,
  ylabel,
  labelFormat = false,
  labelDecimals = 2,
  maxValue = "auto",
  tooltip,
  groupMode = "grouped",
  colors = undefined,
  legendLabel = undefined,
  legend = [],
  padding = 0.01,
}) => {
  const theme = useTheme();
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={index}
      groupMode={groupMode}
      margin={{ top: 20, right: 80, bottom: 40, left: 80 }}
      padding={padding}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      maxValue={maxValue}
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
            color: theme.palette.secondary[200],
            background: theme.palette.primary.main,
          },
        },
      }}
      colors={colors}
      label={
        labelFormat
          ? (d) => `${d.value.toFixed(labelDecimals)}%`
          : (d) => `${d.value}`
      }
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
        legend: xlabel,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: ylabel,
        legendPosition: "middle",
        legendOffset: -50,
        tickValues: 4,
        format: labelFormat ? (value) => `${value}%` : (value) => value,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={legend}
      tooltip={tooltip}
      legendLabel={legendLabel}
    />
  );
};

export default MyResponsiveBar;
