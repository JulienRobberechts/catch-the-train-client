import React from "react";

const twoDigits = number =>
  number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

const Time = ({ time, displaySeconds = false }) => {
  const minutes = time.minutes();
  const minutesStr = twoDigits(minutes);

  const showSeconds = displaySeconds;
  const seconds = time.seconds();
  const secondsStr = twoDigits(seconds);

  return (
    <span>
      <span>{time.hours()}</span>
      <span>h</span>
      <span>{minutesStr}</span>
      {showSeconds && (
        <>
          <span>:</span>
          <span>{secondsStr}</span>
        </>
      )}
    </span>
  );
};

export default Time;
