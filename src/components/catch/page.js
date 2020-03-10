import React from "react";

import { SelectData } from "./logic/catchSelector";
import TrainRoute from "./trainRoute";
import DelaySummary from "./delaySummary";
import Timeline from "./timeline";

const CatchPage = () => {
  const {
    station,
    direction,
    now,
    targetDuration,
    trainDeparture,
    travelDuration,
    travelDurationPercentage,
    delayDuration,
    inAdvanceDurationPercentage,
    delayType
  } = SelectData();

  return (
    <div>
      <div>Catch the train</div>
      <TrainRoute station={station} direction={direction} />
      <Timeline
        now={now}
        targetDuration={targetDuration}
        trainDeparture={trainDeparture}
        travelDuration={travelDuration}
        inAdvanceDurationPercentage={inAdvanceDurationPercentage}
        travelDurationPercentage={travelDurationPercentage}
      />
      <DelaySummary delayDuration={delayDuration} delayType={delayType} />
    </div>
  );
};

export default CatchPage;
