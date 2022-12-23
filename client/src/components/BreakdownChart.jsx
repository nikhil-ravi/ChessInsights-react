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
        colors={{ scheme: colors }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
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
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 30,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
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
