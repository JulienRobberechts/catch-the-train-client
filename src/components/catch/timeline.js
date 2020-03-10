import React from "react";
import Time from "./time";
import TimeSpan from "./timeSpan";

import DurationLine from "./durationLine";

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
    <div>
      <div>
        <Time time={nowTime} icon="clock" />
        <TimeSpan timeSpan={targetDuration} icon="sandglass" />
        <Time time={targetTime} icon="traindark" />
      </div>

      <div>
        <TimeSpan timeSpan={travelDuration} icon="walk" />
        <TimeSpan timeSpan={waitingDuration} icon="sandglass" />
        <DurationLine
          travelDurationPercentage={travelDurationPercentage}
          waitingDurationPercentage={waitingDurationPercentage}
        />
      </div>
    </div>
  );
};

export default Timeline;
