import React from "react";
import getIcon from "./timeIcons";

const Time = ({ time, icon: iconName = "clock" }) => {
  const Icon = getIcon(iconName);

  return (
    <span>
      <span>
        <Icon width="5%" height="5%" />
      </span>
      <span>
        <span>{time.hours()}</span>
        <span>h</span>
        <span>{time.minutes()}</span>
      </span>
    </span>
  );
};

export default Time;
