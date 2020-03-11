import React from "react";
import TimeSpan from "./timeSpan";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Walk } from "../../design/icons";

const TravelBox = ({ travelDuration, travelDurationPercentage }) => {
  const largeSpace = travelDurationPercentage > 25;
  return (
    <Box>
      <div>
        Travel... (
        {largeSpace ? <span>largeSpace</span> : <span>small space</span>})
      </div>
      <IconContainer>
        <Walk />
      </IconContainer>
      <TimeSpanStyle>
        <TimeSpan timeSpan={travelDuration} />
      </TimeSpanStyle>
      <IconContainer>
        <Walk />
      </IconContainer>
    </Box>
  );
};
const TimeSpanStyle = styled.span`
  color: ${() => colors.color6};
  margin: 0 0.2rem;
  font-size: 1.6rem;
`;
const Box = styled.div`
  background: ${() => colors.color4};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin-right: 0rem;
  padding-top: 0rem;
  svg {
    width: 2.4rem;
    height: 3.6rem;
    color: ${() => colors.color6};
  }
`;

export default TravelBox;
