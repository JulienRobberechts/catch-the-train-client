import React from "react";
import getIcon from "./timeIcons";

const TimeSpan = ({ timeSpan, icon: iconName = "sandglass" }) => {
  const Icon = getIcon(iconName);

  // console.log("timeSpan", timeSpan);
  const minutes = timeSpan.minutes();
  const seconds = timeSpan.seconds();
  // console.log("timeSpan minutes", minutes);
  // console.log("timeSpan seconds", seconds);

  return (
    <span>
      <span>
        <Icon width="5%" height="5%" />
      </span>
      <span>
        <span>{minutes}</span>
        <span>min</span>
        <span>{seconds}</span>
      </span>
    </span>
  );
};

export default TimeSpan;
