import React from "react";
import getIcon from "./timeIcons";
import styled from "styled-components";
import { colors } from "../../design/colors";

const TimeSpan = ({
  timeSpan,
  icon: iconName = "none",
  displayPositiveSign = false
}) => {
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
      {Icon && (
        <IconContainer>
          <Icon width="5%" height="5%" />
        </IconContainer>
      )}
      <TimeText>
        {negative && <Sign>-</Sign>}
        {displayPositiveSign && positive && <Sign>+</Sign>}
        {minutes !== 0 && (
          <>
            <span>{minutes}</span>
            <span>:</span>
          </>
        )}
        <span>
          {seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}
        </span>
        {minutes === 0 && (
          <>
            <span> secondes</span>
          </>
        )}
      </TimeText>
    </span>
  );
};

const TimeText = styled.span`
  font-size: 1.3em;
  color: ${() => colors.color6};
`;

const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin-right: 0.2rem;
  svg {
    width: 1rem;
    height: 1rem;
    color: ${() => colors.color6};
  }
`;

const Sign = styled.span`
  font-weight: 900;
`;

export default TimeSpan;
