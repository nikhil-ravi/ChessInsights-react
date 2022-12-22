import React from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const Metric = ({
  icon,
  value,
  valueFontVariant = "h3",
  p = "1.25rem 1rem",
}) => {
  const theme = useTheme();

  return (
    <FlexBetween p={p}>
      {icon}
      <Typography
        variant={valueFontVariant}
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>
    </FlexBetween>
  );
};

export default Metric;
