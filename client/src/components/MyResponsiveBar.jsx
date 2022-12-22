import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({
  data,
  keys,
  index,
  xlabel,
  ylabel,
  labelFormat = false,
  maxValue = "auto",
}) => {
  const theme = useTheme();
  return (
    <ResponsiveBar
      data={data}
      keys={[keys]}
      indexBy={index}
      margin={{ top: 20, right: 80, bottom: 40, left: 80 }}
      padding={0.01}
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
            color: theme.palette.primary.main,
          },
        },
      }}
      label={labelFormat ? (d) => `${d.value.toFixed(2)}%` : undefined}
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
        format: (value) => `${value}%`,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[]}
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
  );
};

export default MyResponsiveBar;
