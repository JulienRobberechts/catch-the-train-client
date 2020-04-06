import React from "react";
import styled from "styled-components";

const twoDigits = (number) =>
  number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

const Time = ({ time, displaySeconds = false }) => {
  const hours = time.hours();

  const minutes = time.minutes();
  const minutesStr = twoDigits(minutes);

  const showSeconds = displaySeconds;
  const seconds = time.seconds();
  const secondsStr = twoDigits(seconds);

  return (
    <span>
      <span>{hours}</span>
      <span>h</span>
      <span>{minutesStr}</span>
      {showSeconds && (
        <>
          <Seconds>{secondsStr}</Seconds>
        </>
      )}
    </span>
  );
};

const Seconds = styled.span`
  font-size: 70%;
  position: relative;
  top: -0.3rem;
  margin-left: 0.1rem;
`;

export default Time;
