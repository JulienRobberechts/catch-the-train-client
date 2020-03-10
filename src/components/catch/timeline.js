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
      <div>
        <Time time={nowTime} icon="clock" />
        <TimeSpan
          timeSpan={targetDuration}
          icon="sandglass"
          displaySign={false}
        />
        <Time time={targetTime} icon="traindark" />
      </div>

      <LineParent>
        <TimeSpan timeSpan={travelDuration} icon="walk" />
        <TimeSpan timeSpan={waitingDuration} icon="sandglass" />
        <DurationLine
          travelDurationPercentage={travelDurationPercentage}
          waitingDurationPercentage={waitingDurationPercentage}
        />
      </LineParent>
    </Panel>
  );
};

const Panel = styled.div`
  background-color: ${() => colors.color1};
  padding: 0.3rem;
  color: ${() => colors.color5};
`;
const LineParent = styled.div``;

export default Timeline;
