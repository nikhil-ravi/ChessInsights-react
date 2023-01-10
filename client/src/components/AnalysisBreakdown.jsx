import React from "react";
import { Box, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const AnalysisBreakdown = ({ title, value, icon }) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      // display="flex"
      flexDirection="column"
      // justifyContent="space-between"
      p="1.25rem 1rem"
      // flex="1 1 100%"
      backgrouncolor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <div variant="h3" sx={{ color: theme.palette.secondary[100] }}>
        {title}
      </div>
      <FlexBetween>
        {icon}
        <div
          variant="h3"
          fontWeight="600"
          sx={{ color: theme.palette.secondary[200] }}
        >
          {value}
        </div>
      </FlexBetween>
    </Box>
  );
};

export default AnalysisBreakdown;
