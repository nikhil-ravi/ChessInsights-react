import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { ResponsiveBullet } from "@nivo/bullet";

const MyResponsibleBullet = ({ data, rangeIndexToKeep }) => {
  const theme = useTheme();
  const CustomRange = ({
    x,
    y,
    width,
    height,
    color,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    data,
  }) => (
    <rect
      x={x + 2}
      y={y + 2}
      rx={5}
      ry={5}
      width={width - 4}
      height={height - 4}
      fill={theme.palette.primary.main}
      opacity={data.index === rangeIndexToKeep ? 1 : 0}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      text="Nik"
    />
  );
  return (
    <ResponsiveBullet
      data={data.map((d) => ({
        ...d,
        title: (
          <text dy={-12}>
            <tspan
              style={{
                fill: theme.palette.secondary[200],
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              {d.id}
            </tspan>
            <tspan
              x={0}
              dy={18}
              style={{
                fill: "#999",
                fontSize: "12px",
              }}
            >
              {d.value} ({d.percentage.toFixed(2)}%)
            </tspan>
          </text>
        ),
      }))}
      rangeComponent={CustomRange}
      maxValue={100}
      minValue={0}
      margin={{ top: 0, right: 50, bottom: 50, left: 120 }}
      spacing={46}
      titleAlign="end"
      titleOffsetX={-100}
      measureSize={0}
      markerSize={0}
      theme={{
        axis: {
          domain: {
            line: {
              strokeWidth: 0,
              strokeOpacity: 0,
            },
          },
          ticks: {
            line: {
              strokeWidth: 1,
              strokeOpacity: 0,
            },
            text: {
              fontSize: 0,
              fill: theme.palette.primary.main,
            },
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
    />
  );
};

const StaggeringBarChart = ({ data }) => {
  const theme = useTheme();
  var dataOpening = data.find((item) => item.id === "Opening");
  dataOpening = [
    {
      ...dataOpening,
      ranges: [0, dataOpening.percentage],
      measures: [],
      markers: [],
    },
  ];
  var dataMiddlegame = data.find((item) => item.id === "Middlegame");
  dataMiddlegame = [
    {
      ...dataMiddlegame,
      ranges: [
        dataOpening[0].percentage,
        dataOpening[0].percentage + dataMiddlegame.percentage,
      ],
      measures: [],
      markers: [],
    },
  ];
  var dataEndgame = data.find((item) => item.id === "Endgame");
  dataEndgame = [
    {
      ...dataEndgame,
      ranges: [dataOpening[0].percentage + dataMiddlegame[0].percentage, 100],
      measures: [],
      markers: [],
    },
  ];
  return (
    <Box height="10vh">
      <MyResponsibleBullet data={dataOpening} rangeIndexToKeep={0} />
      <MyResponsibleBullet data={dataMiddlegame} rangeIndexToKeep={1} />
      <MyResponsibleBullet data={dataEndgame} rangeIndexToKeep={1} />
    </Box>
  );
};

export default StaggeringBarChart;
