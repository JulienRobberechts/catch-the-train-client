import React from "react";
import styled from "styled-components";
import { Time, TimeSpan } from "../time";
import { fontColorForDelayStatus } from "../delayDesign";
import moment from "moment";
import DelayStatus from "../../domains/toTheStation/pure/delayStatus";

interface Props {
  index: number;
  selected: boolean;
  departureTime: moment.Moment;
  departureDuration:moment.Duration;
  onSelect: ()=> void;
  delayStatus: DelayStatus;
}


function Departure ({
  index,
  selected,
  departureTime,
  departureDuration,
  onSelect,
  delayStatus,
}: Props) {
  return (
    <Train selected={selected} onClick={onSelect} delayStatus={delayStatus}>
      <TimeStyle>
        <Time time={departureTime} />
      </TimeStyle>

      <DurationStyle>
        <TimeSpan timeSpan={departureDuration} displaySeconds={false} />
      </DurationStyle>
    </Train>
  );
}

const Train = styled.div`
  background: ${(props) => fontColorForDelayStatus(props.delayStatus)};
  border: ${(props) => (props.selected ? 4 : 1)}px solid;
  margin: 0.1rem;
  padding: 0.4rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-basis: 20%;
  font-size: 0.7rem;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const TimeStyle = styled.span`
  font-size: 1.3rem;
`;

const DurationStyle = styled.span`
  font-size: 1rem;
`;

export default Departure;
