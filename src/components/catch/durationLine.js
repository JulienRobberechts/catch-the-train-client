import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";

const DurationLine = ({
  travelDurationPercentage,
  waitingDurationPercentage
}) => {
  console.log("travelDurationPercentage", travelDurationPercentage);
  console.log("waitingDurationPercentage", waitingDurationPercentage);
  return (
    <TargetTime>
      <TravelTime percentage={travelDurationPercentage} />
      <InAdvanceTime percentage={waitingDurationPercentage} />
    </TargetTime>
  );
};

const TargetTime = styled.div`
  background-color: ${() => colors.color3};
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 25px;
`;

const TravelTime = styled.div`
  background-color: ${() => colors.color5};
  width: ${props => props.percentage + "%"};
`;

const InAdvanceTime = styled.div`
  background-color: ${() => colors.color4};
  width: ${props => props.percentage + "%"};
`;

export default DurationLine;
