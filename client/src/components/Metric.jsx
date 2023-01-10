import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const Metric = ({
  title = undefined,
  subTitle = undefined,
  icon,
  value,
  valueFontVariant = "h3",
  p = "1rem 1rem",
}) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      flexDirection="column"
      p={p}
      backgrouncolor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      {title && (
        <Typography
          variant={valueFontVariant}
          fontWeight="600"
          sx={{ color: theme.palette.secondary[100] }}
          centered
        >
          {title}
        </Typography>
      )}
      <FlexBetween>
        {icon}
        <Typography
          variant={valueFontVariant}
          fontWeight="600"
          sx={{ color: theme.palette.secondary[200] }}
        >
          {value}
        </Typography>
      </FlexBetween>
      {subTitle && (
        <Typography
          variant={valueFontVariant}
          fontWeight="600"
          sx={{ color: theme.palette.secondary[300], center: "right" }}
        >
          {subTitle}
        </Typography>
      )}
    </Box>
  );
};

export default Metric;
