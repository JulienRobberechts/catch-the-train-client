import React from "react";
import getIcon from "./timeIcons";

const TimeSpan = ({ timeSpan, icon: iconName = "none" }) => {
  const Icon = getIcon(iconName);

  // console.log("timeSpan", timeSpan);
  // const totalMilliseconds = timeSpan.valueOf();

  // const negative = totalMilliseconds < 0;

  const minutes = Math.abs(timeSpan.minutes());
  const seconds = Math.abs(timeSpan.seconds());
  // console.log("timeSpan minutes", minutes);
  // console.log("timeSpan seconds", seconds);

  return (
    <span>
      <span>{Icon && <Icon width="5%" height="5%" />}</span>
      <span>
        <span>{minutes}</span>
        <span>min</span>
        <span>{seconds}</span>
      </span>
    </span>
  );
};

export default TimeSpan;
