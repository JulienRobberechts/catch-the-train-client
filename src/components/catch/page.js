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
    durationToTrain,
    trainDeparture,
    travelDuration,
    percentageTravelToRemainingTime,
    delayDuration,
    delayType
  } = SelectData();

  return (
    <div>
      <div>Catch the train</div>
      <TrainRoute station={station} direction={direction} />
      <Timeline
        now={now}
        durationToTrain={durationToTrain}
        trainDeparture={trainDeparture}
        travelDuration={travelDuration}
        percentageTravelToRemainingTime={percentageTravelToRemainingTime}
      />
      <DelaySummary delayDuration={delayDuration} delayType={delayType} />
    </div>
  );
};

export default CatchPage;
