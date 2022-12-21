import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
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
      backgrounColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
        {title}
      </Typography>
      <FlexBetween>
        {icon}
        <Typography
          variant="h3"
          fontWeight="600"
          sx={{ color: theme.palette.secondary[200] }}
        >
          {value}
        </Typography>
      </FlexBetween>
    </Box>
  );
};

export default AnalysisBreakdown;
