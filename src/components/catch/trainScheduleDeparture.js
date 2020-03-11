import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import Time from "./time";
import TimeSpan from "./timeSpan";

function TrainScheduleDeparture({
  index,
  selected,
  departureTime,
  departureDuration,
  onSelect
}) {
  return (
    <Train selected={selected} onClick={onSelect}>
      <Time time={departureTime} />
      <TimeSpan timeSpan={departureDuration} />
    </Train>
  );
}

const ScrollPanelItem = styled.div`
  background-color: ${() => colors.color3};
  margin: 0.1rem;
  padding: 0.4rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  flex-basis: 20%;
`;

const Train = styled(ScrollPanelItem)`
  font-size: 0.7rem;
  background-color: ${props =>
    props.selected ? colors.color1 : colors.color3};
`;

export default TrainScheduleDeparture;
