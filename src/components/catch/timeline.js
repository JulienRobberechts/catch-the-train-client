import React from "react";
import Time from "./time";
import TimeSpan from "./timeSpan";

import DurationLine from "./durationLine";

const Timeline = ({
  now,
  durationToTrain,
  trainDeparture,
  travelDuration,
  percentageTravelToRemainingTime
}) => {
  return (
    <div>
      <div>
        <Time time={now} icon="clock" />
        <TimeSpan timeSpan={durationToTrain} icon="sandglass" />
        <Time time={trainDeparture} icon="traindark" />
      </div>

      <div>
        <TimeSpan timeSpan={travelDuration} icon="walk" />

        <DurationLine ratio={percentageTravelToRemainingTime} />
      </div>
    </div>
  );
};

export default Timeline;
