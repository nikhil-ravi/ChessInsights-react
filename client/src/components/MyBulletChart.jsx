import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBullet } from "@nivo/bullet";
import { BasicTooltip } from "@nivo/tooltip";

const CustomTooltip = ({ v0, v1, color }) => {
  return (
    <BasicTooltip
      id={
        v1 ? (
          <span style={{ color: "peachpuff" }}>
            <strong>{v0}</strong> to <strong>{v1}</strong>
          </span>
        ) : (
          <strong style={{ color: "rosybrown" }}>{v0}</strong>
        )
      }
      enableChip={true}
      color={color}
    />
  );
};

const CustomRange = ({
  x,
  y,
  width,
  height,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  data,
}) => {
  const theme = useTheme();
  return (
    <rect
      x={x + 2}
      y={y + 2}
      rx={5}
      ry={5}
      width={width}
      height={height - 4}
      fill={
        data.index === 0
          ? theme.palette.gamephase.opening
          : data.index === 1
          ? theme.palette.gamephase.middlegame
          : theme.palette.gamephase.endgame
      }
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
};

const MyBulletChart = ({ data }) => {
  const theme = useTheme();
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
              {d.Moves}
            </tspan>
          </text>
        ),
      }))}
      rangeComponent={CustomRange}
      maxValue={1}
      minValue={0}
      margin={{ top: 20, right: 50, bottom: 50, left: 120 }}
      spacing={46}
      titleAlign="end"
      titleOffsetX={-50}
      titleOffsetY={10}
      measureSize={0}
      markerSize={0}
      tooltip={CustomTooltip}
      theme={{
        textColor: theme.palette.primary.main,
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
            color: "#000",
          },
        },
      }}
    />
  );
};

export default MyBulletChart;
