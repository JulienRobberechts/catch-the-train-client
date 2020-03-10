import React from "react";
import styled from "styled-components";

const DurationLine = ({ ratio }) => {
  const percentage = ratio * 100;
  return (
    <FullTime>
      <TravelTime percentage={percentage} />
    </FullTime>
  );
};

const FullTime = styled.div`
  background-color: lightgray;
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 25px;
`;

const TravelTime = styled.div`
  background-color: green;
  width: ${props => props.percentage + "%"};
`;

export default DurationLine;
