import React from "react";

const Time = ({ time }) => {
  const minutes = Math.abs(time.minutes()).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  return (
    <span>
      <span>{time.hours()}</span>
      <span>h</span>
      <span>{minutes}</span>
    </span>
  );
};

export default Time;
