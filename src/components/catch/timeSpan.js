import React from "react";
import getIcon from "./timeIcons";

const TimeSpan = ({ timeSpan, icon: iconName = "none" }) => {
  const Icon = getIcon(iconName);

  // console.log("timeSpan", timeSpan);
  const totalMilliseconds = timeSpan.valueOf() * 1000;
  console.log("totalMilliseconds", totalMilliseconds);
  const negative = totalMilliseconds < 0;
  const positive = totalMilliseconds > 0;

  const minutes = Math.abs(timeSpan.minutes());
  const seconds = Math.abs(timeSpan.seconds());
  // console.log("timeSpan minutes", minutes);
  // console.log("timeSpan seconds", seconds);

  return (
    <span>
      <span>{Icon && <Icon width="5%" height="5%" />}</span>
      <span>
        {negative && <span>- </span>}
        {positive && <span>+ </span>}
        {minutes !== 0 && (
          <>
            <span>{minutes}</span>
            <span>min</span>
          </>
        )}
        <span>{seconds}</span>
        {minutes === 0 && (
          <>
            <span> secondes</span>
          </>
        )}
      </span>
    </span>
  );
};

export default TimeSpan;
