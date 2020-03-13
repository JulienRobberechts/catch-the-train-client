import React from "react";
import { timeToLocal } from "../../domains/train";

const Time = ({ time, displaySeconds = false }) => {
  const minutes = Math.abs(time.minutes()).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  console.log("time.isUTC", time.isUTC());

  const localTime = timeToLocal(time);

  return (
    <span>
      <span>{localTime.hours()}</span>
      <span>h</span>
      <span>{minutes}</span>
      {displaySeconds && (
        <>
          <span>:</span>
          <span>{localTime.seconds()}</span>
        </>
      )}
    </span>
  );
};

export default Time;
