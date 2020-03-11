import React from "react";
import TimeSpan from "./timeSpan";
import styled from "styled-components";
import { colors } from "../../design/colors";

const WaitingBox = ({ waitingDuration, waitingDurationPercentage }) => {
  const largeSpace = waitingDurationPercentage > 25;
  return (
    <Box>
      <div>
        Waiting... (
        {largeSpace ? <span>largeSpace</span> : <span>small space</span>})
      </div>
      <TimeSpan timeSpan={waitingDuration} />
    </Box>
  );
};

const Box = styled.div`
  background: ${() => colors.color3};
`;

export default WaitingBox;
