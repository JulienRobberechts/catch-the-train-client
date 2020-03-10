import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import TimeSpan from "./timeSpan";
import { Walk } from "../../design/icons";

const DurationLine = ({
  travelDuration,
  travelDurationPercentage,
  waitingDuration,
  waitingDurationPercentage
}) => {
  console.log("travelDurationPercentage", travelDurationPercentage);
  console.log("waitingDurationPercentage", waitingDurationPercentage);
  return (
    <TargetTime>
      <TravelTime percentage={travelDurationPercentage}>
        <IconContainer>
          <Walk />
        </IconContainer>
        <TimeSpan timeSpan={travelDuration} />
        <IconContainer>
          <Walk />
        </IconContainer>
      </TravelTime>
      <WaitingTime percentage={waitingDurationPercentage}>
        <TimeSpan timeSpan={waitingDuration} />
      </WaitingTime>
    </TargetTime>
  );
};

const TargetTime = styled.div`
  background-color: ${() => colors.color3};
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 65px;
`;

const TravelTime = styled.div`
  background-color: ${() => colors.color5};
  width: ${props => props.percentage + "%"};
  display: flex;
  justify-content: space-around;
  align-items: stretch;
`;

const WaitingTime = styled.div`
  background-color: ${() => colors.color4};
  width: ${props => props.percentage + "%"};
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin-right: 0.2rem;
  padding-top: 0.2rem;
  svg {
    width: 3.6rem;
    height: 3.6rem;
    color: ${() => colors.color6};
  }
`;

export default DurationLine;
