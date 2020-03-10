import React from "react";

import { SelectData } from "./logic/catchSelector";
import TrainRoute from "./trainRoute";
import LateSummary from "./lateSummary";
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
    delay
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
      <LateSummary delay={delay} />
    </div>
  );
};

export default CatchPage;
