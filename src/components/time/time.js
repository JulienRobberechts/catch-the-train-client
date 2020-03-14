import React from "react";

const Time = ({ time, displaySeconds = false }) => {
  const minutes = Math.abs(time.minutes()).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  console.log("time.isUTC", time.isUTC());

  return (
    <span>
      <span>{time.hours()}</span>
      <span>h</span>
      <span>{minutes}</span>
      {displaySeconds && (
        <>
          <span>:</span>
          <span>{time.seconds()}</span>
        </>
      )}
    </span>
  );
};

export default Time;
