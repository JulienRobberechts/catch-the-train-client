import React from "react";
import TimeSpan from "./timeSpan";
import styled from "styled-components";
import { colors } from "../../design/colors";

const WaitingBox = ({ delayDuration, delayType }) => {
  return <Box>WaitingBox</Box>;
};

const Box = styled.div`
  background: ${() => colors.color3};
`;

export default WaitingBox;
