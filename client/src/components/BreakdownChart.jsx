import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, useTheme } from "@mui/material";
import { LocationSearchingOutlined } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard, faChessKnight } from "@fortawesome/free-solid-svg-icons";
import Parser from "html-react-parser";

const BreakdownChart = ({
  data,
  colors,
  tooltipName = "Total Games",
  tooltipValue = "value",
  id = "id",
  value = "percentage",
}) => {
  const theme = useTheme();
  return (
    <Box
      height="100%"
      width={undefined}
      minHeight={undefined}
      minWidth={undefined}
      position="relative"
    >
      <ResponsivePie
        data={data}
        id={id}
        value={value}
        valueFormat=">-.2%"
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
        colors={colors}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={false}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={true}
        arcLinkLabel={function (e) {
          return e.id + " " + (e.value * 100).toFixed(2) + "%";
        }}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        enableArcLabels={false}
        legends={[]}
        tooltip={({ datum }) => {
          return (
            <div
              style={{
                padding: 12,
                background: theme.palette.primary.main,
              }}
            >
              <span>{datum.id}</span>
              <br />
              <span>
                {tooltipName}: {datum.data[tooltipValue]}
              </span>
            </div>
          );
        }}
      />
    </Box>
  );
};

export default BreakdownChart;
