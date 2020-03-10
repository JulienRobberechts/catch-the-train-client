import React from "react";

import { SelectData } from "./logic/catchSelector";
import TrainRoute from "./trainRoute";
import DelaySummary from "./delaySummary";
import Timeline from "./timeline";

const CatchPage = () => {
  const {
    station,
    direction,
    nowTime,
    targetDuration,
    targetTime,
    travelDuration,
    travelDurationPercentage,
    delayDuration,
    waitingDuration,
    waitingDurationPercentage,
    delayType
  } = SelectData();

  return (
    <div>
      <div>Catch the train</div>
      <TrainRoute station={station} direction={direction} />
      <Timeline
        nowTime={nowTime}
        targetTime={targetTime}
        targetDuration={targetDuration}
        travelDuration={travelDuration}
        waitingDuration={waitingDuration}
        waitingDurationPercentage={waitingDurationPercentage}
        travelDurationPercentage={travelDurationPercentage}
      />
      <DelaySummary delayDuration={delayDuration} delayType={delayType} />
    </div>
  );
};

export default CatchPage;
