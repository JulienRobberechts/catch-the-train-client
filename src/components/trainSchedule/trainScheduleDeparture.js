import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Time, TimeSpan } from "../time";

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

const Train = styled.div`
  background: ${props =>
    props.selected
      ? colors.dark.panel.one.button.highlight.background
      : colors.dark.panel.one.button.one.background};
  color: ${props =>
    props.selected
      ? colors.dark.panel.one.button.highlight.text
      : colors.dark.panel.one.button.one.text};
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
  font-size: 0.7rem;
`;

export default TrainScheduleDeparture;
