import React from "react";
import TimeSpan from "./timeSpan";

const DelaySummary = ({ delayDuration, delayType }) => {
  return (
    <div>
      <TimeSpan timeSpan={delayDuration} />
      <DelayType delayType={delayType} />
    </div>
  );
};

const DelayType = ({ delayType }) => {
  switch (delayType) {
    case "early":
      return <Early />;
    case "ontime":
      return <OnTime />;
    case "late":
      return <Late />;
    default:
      return <div>???</div>;
  }
};

const Early = () => {
  return (
    <div>
      <span>en avance</span>
    </div>
  );
};

const OnTime = () => {
  return (
    <div>
      <span>Vous êtes à l'heure</span>
    </div>
  );
};

const Late = () => {
  return (
    <div>
      <span>en retard</span>
    </div>
  );
};
export default DelaySummary;
