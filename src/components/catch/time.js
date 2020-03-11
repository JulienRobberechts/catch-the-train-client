import React from "react";

const Time = ({ time, icon: iconName = "clock" }) => {
  return (
    <span>
      <span>{time.hours()}</span>
      <span>h</span>
      <span>{time.minutes()}</span>
    </span>
  );
};

export default Time;
