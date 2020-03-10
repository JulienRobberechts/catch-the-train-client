import React from "react";
import styled from "styled-components";

const DurationLine = ({
  travelDurationPercentage,
  inAdvanceDurationPercentage
}) => {
  console.log("travelDurationPercentage", travelDurationPercentage);
  console.log("inAdvanceDurationPercentage", inAdvanceDurationPercentage);
  return (
    <TargetTime>
      <TravelTime percentage={travelDurationPercentage} />
      <InAdvanceTime percentage={inAdvanceDurationPercentage} />
    </TargetTime>
  );
};

const TargetTime = styled.div`
  background-color: #a3b1c2;
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 25px;
`;

const TravelTime = styled.div`
  background-color: #232b34;
  width: ${props => props.percentage + "%"};
`;

const InAdvanceTime = styled.div`
  background-color: #414e5d;
  width: ${props => props.percentage + "%"};
`;

export default DurationLine;
