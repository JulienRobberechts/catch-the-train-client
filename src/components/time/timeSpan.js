import React from "react";
import styled from "styled-components";

const twoDigits = number =>
  number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

const TimeSpan = ({
  timeSpan,
  displaySeconds = true,
  displayPositiveSign = false
}) => {
  const totalMilliseconds = timeSpan.valueOf() * 1000;
  const negative = totalMilliseconds < 0;
  const positive = totalMilliseconds > 0;

  const days = timeSpan.as("days");
  const moreThanOneDay = days >= 1 || days <= -1;

  if (moreThanOneDay) {
    return (
      <Panel>
        <>
          <SymbolText>J</SymbolText>
          <NumberText>
            {negative && <Sign>-</Sign>}
            {positive && <Sign>+</Sign>}1
          </NumberText>
        </>
      </Panel>
    );
  }

  const hours = Math.abs(timeSpan.hours());
  const minutes = Math.abs(timeSpan.minutes());
  const seconds = Math.abs(timeSpan.seconds());

  const showHours = hours !== 0;
  const showMinutes = minutes !== 0 || showHours;
  const showSeconds = !showHours && !!displaySeconds;

  const doubleDigitHours = false;
  const doubleDigitMinutes = showHours;
  const doubleDigitSeconds = showMinutes;

  const hoursStr = doubleDigitHours ? twoDigits(hours) : hours;
  const minutesStr = doubleDigitMinutes ? twoDigits(minutes) : minutes;
  const secondsStr = doubleDigitSeconds ? twoDigits(seconds) : seconds;

  const showHoursSign = true;
  const showMinutesSign = !showHours;
  const showSecondsSign = !showMinutes;

  return (
    <Panel>
      {negative && <Sign>-</Sign>}
      {displayPositiveSign && positive && <Sign>+</Sign>}
      {showHours && (
        <>
          <NumberText>{hoursStr}</NumberText>
          {showHoursSign && <SymbolText>h</SymbolText>}
        </>
      )}
      {showMinutes && (
        <>
          <NumberText>{minutesStr}</NumberText>
          {showMinutesSign && <SymbolText>min</SymbolText>}
        </>
      )}
      {showSeconds && (
        <>
          <NumberText>{secondsStr}</NumberText>
          {showSecondsSign && <SymbolText>s</SymbolText>}
        </>
      )}
    </Panel>
  );
};

const Panel = styled.span`
  margin: 0 auto;
`;

const NumberText = styled.span`
  margin: 0 0.05rem;
`;

const SymbolText = styled.span`
  margin: 0 0.05rem;
  font-weight: 500;
`;

const Sign = styled.span`
  font-weight: 900;
`;

export default TimeSpan;
