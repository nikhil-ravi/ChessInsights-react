import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveMarimekko = ({ data /* see data tab */ }) => {
  const theme = useTheme();
  return (
    <ResponsiveBar
      data={data}
      indexBy="_id"
      keys={["winpct", "drawpct", "losspct"]}
      offset="expand"
      padding={0.01}
      innerPadding={0}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        ticksPosition: "left",
        tickRotation: 0,
        legend: "Opponent Rating",
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
      }}
      margin={{ top: 0, right: 80, bottom: 20, left: 80 }}
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
      borderWidth={1}
      borderColor={{
        from: "theme",
        modifiers: [["darker", 0.2]],
      }}
      defs={[
        {
          id: "winpct",
          type: "patternDots",
          background: theme.palette.result.win,
          color: theme.palette.result.win,
          size: 1,
          padding: 0,
          stagger: false,
        },
        {
          id: "drawpct",
          type: "patternDots",
          background: theme.palette.result.draw,
          color: theme.palette.result.draw,
          size: 1,
          padding: 0,
          stagger: false,
        },
        {
          id: "losspct",
          type: "patternDots",
          background: theme.palette.result.loss,
          color: theme.palette.result.loss,
          size: 1,
          padding: 0,
          stagger: false,
        },
      ]}
      //   valueFormat=" >-.2%"
      fill={[
        {
          match: {
            id: "winpct",
          },
          id: "winpct",
        },
        {
          match: {
            id: "drawpct",
          },
          id: "drawpct",
        },
        {
          match: {
            id: "losspct",
          },
          id: "losspct",
        },
      ]}
      legends={[]}
      enableSlices="x"
      valueFormat="> .2f"
      enableLabel={false}
      tooltip={({ id, value, color, data }) => (
        <div
          style={{
            padding: 12,
            background: theme.palette.primary.main,
          }}
        >
          <span>
            {data._id}-{data._id + 100}
          </span>
          {data.win && (
            <>
              <br />
              <strong>
                Win: {data.winpct.toFixed(2)}% ({data.win})
              </strong>
            </>
          )}
          {data.draw && (
            <>
              <br />
              <strong>
                Draw: {data.drawpct.toFixed(2)}% ({data.draw})
              </strong>
            </>
          )}
          {data.loss && (
            <>
              <br />
              <strong>
                Loss: {data.losspct.toFixed(2)}% ({data.loss})
              </strong>
            </>
          )}
        </div>
      )}
    />
  );
};

export default MyResponsiveMarimekko;
