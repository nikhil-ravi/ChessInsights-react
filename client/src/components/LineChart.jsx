import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const LineChart = ({
  data,
  xlabel,
  ylabel,
  xScale = { type: "point" },
  xtickValues = null,
  ytickValues = 5,
  ymin = 0,
  ymax = 100,
  legend = false,
  xFormat = undefined,
  axisBottom = {
    orient: "bottom",
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: xlabel,
    legendOffset: 36,
    legendPosition: "middle",
    tickValues: xtickValues,
  },
}) => {
  const theme = useTheme();
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 80, bottom: 50, left: 80 }}
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
      //   colors={datumColor ? { datum: "data.color" } : undefined}
      xScale={xScale}
      xFormat={xFormat}
      yScale={{
        type: "linear",
        min: ymin,
        max: ymax,
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={axisBottom}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: ylabel,
        legendOffset: -50,
        legendPosition: "middle",
        tickValues: ytickValues,
        format: (d) => `${d}%`,
      }}
      pointSize={0}
      //   pointColor={{ theme: "background" }}
      //   pointBorderWidth={2}
      //   pointBorderColor={{ from: "serieColor" }}
      //   pointLabelYOffset={-12}
      useMesh={true}
      legends={
        legend
          ? [
              {
                anchor: "top",
                direction: "row",
                justify: false,
                translateX: 13,
                translateY: -20,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
      curve="linear"
      enableArea={true}
      enableGridX={false}
      enableSlices="x"
    />
  );
};
export default LineChart;
