import React from "react";
import Time from "./time";
import TimeSpan from "./timeSpan";

import DurationLine from "./durationLine";

const Timeline = ({
  now,
  targetDuration,
  trainDeparture,
  travelDuration,
  travelDurationPercentage,
  inAdvanceDurationPercentage
}) => {
  return (
    <div>
      <div>
        <Time time={now} icon="clock" />
        <TimeSpan timeSpan={targetDuration} icon="sandglass" />
        <Time time={trainDeparture} icon="traindark" />
      </div>

      <div>
        <TimeSpan timeSpan={travelDuration} icon="walk" />

        <DurationLine
          travelDurationPercentage={travelDurationPercentage}
          inAdvanceDurationPercentage={inAdvanceDurationPercentage}
        />
      </div>
    </div>
  );
};

export default Timeline;
