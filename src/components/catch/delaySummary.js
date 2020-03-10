import React from "react";
import TimeSpan from "./timeSpan";

const DelaySummary = ({ delayDuration, delayType }) => {
  switch (delayType) {
    case "early":
      return <Early delayDuration={delayDuration} />;
    case "ontime":
      return <OnTime />;
    case "late":
      return <Late delayDuration={delayDuration} />;
    default:
      return <div>???</div>;
  }
};

const Early = ({ delayDuration }) => {
  return (
    <div>
      <TimeSpan timeSpan={delayDuration} />
      <span> d'avance</span>
    </div>
  );
};

const OnTime = () => {
  return (
    <div>
      <span>A l'heure !</span>
    </div>
  );
};

const Late = ({ delayDuration }) => {
  return (
    <div>
      <TimeSpan timeSpan={delayDuration} />
      <span> de retard</span>
    </div>
  );
};
export default DelaySummary;
