import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import DurationLine from "./durationLine";
import Time from "./time";
import TimeSpan from "./timeSpan";

const Timeline = ({
  nowTime,
  targetDuration,
  targetTime,
  travelDuration,
  travelDurationPercentage,
  waitingDuration,
  waitingDurationPercentage
}) => {
  return (
    <Panel>
      <TimeContainer>
        <Time time={nowTime} icon="clock" />
        <TimeSpan timeSpan={targetDuration} icon="sandglass" />
        <Time time={targetTime} icon="traindark" />
      </TimeContainer>
      <TimeContainer>
        <TimeSpan timeSpan={travelDuration} icon="walk" />
        <TimeSpan timeSpan={waitingDuration} icon="sandglass" />
      </TimeContainer>
      <LineParent>
        <DurationLine
          travelDurationPercentage={travelDurationPercentage}
          waitingDurationPercentage={waitingDurationPercentage}
        />
      </LineParent>
    </Panel>
  );
};

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Panel = styled.div`
  background-color: ${() => colors.color1};
  padding: 0.3rem;
  color: ${() => colors.color5};
`;
const LineParent = styled.div``;

export default Timeline;
