import React from "react";
import TimeSpan from "./timeSpan";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Station } from "../../design/icons";

const WaitingBox = ({ waitingDuration, waitingDurationPercentage }) => {
  const largeSpace = waitingDurationPercentage > 25;
  return (
    <Box>
      <Text>en gare</Text>
      <TimeSpan timeSpan={waitingDuration} />
      {largeSpace && (
        <IconContainer>
          <Station />
        </IconContainer>
      )}
    </Box>
  );
};

const Text = styled.span`
  color: ${() => colors.color6};
  margin: 0 0.2rem;
  font-size: 1rem;
`;
const Box = styled.div`
  background: ${() => colors.color3};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  border-left: 3px dashed ${() => colors.color6};
  margin-left: 1px;
`;

const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin-right: 0rem;
  padding-top: 0rem;
  svg {
    width: 2.4rem;
    height: 3.6rem;
    fill: ${() => colors.color6};
  }
`;

export default WaitingBox;
