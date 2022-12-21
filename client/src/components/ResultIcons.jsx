const {
  LocalHospital,
  BalanceOutlined,
  IndeterminateCheckBox,
} = require("@mui/icons-material");
const { styled } = require("@mui/system");

export const WinIcon = styled(LocalHospital)({
  fill: "#85a94e",
});

export const DrawIcon = styled(BalanceOutlined)({
  fill: "#8b8987",
});

export const LossIcon = styled(IndeterminateCheckBox)({
  fill: "#b23330",
});
