import React from "react";
import TimeSpan from "./timeSpan";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Walk } from "../../design/icons";

const TravelBox = ({ travelDuration, travelDurationPercentage }) => {
  const largeSpace = travelDurationPercentage > 25;
  return (
    <Box>
      <Text>trajet</Text>
      {largeSpace && (
        <IconContainer>
          <Walk />
        </IconContainer>
      )}
      <TimeSpanStyle>
        <TimeSpan timeSpan={travelDuration} />
      </TimeSpanStyle>
      <IconContainer>
        <Walk />
      </IconContainer>
    </Box>
  );
};

const Box = styled.div`
  background: ${() => colors.color4};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const Text = styled.span`
  color: ${() => colors.color6};
  margin: 0 0.2rem;
  font-size: 1rem;
`;
const TimeSpanStyle = styled.span`
  color: ${() => colors.color6};
  margin: 0 0.2rem;
  font-size: 1.6rem;
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
