import React from "react";
import getIcon from "./timeIcons";
import styled from "styled-components";
import { colors } from "../../design/colors";

const TimeSpan = ({
  timeSpan,
  icon: iconName = "none",
  displaySign = true
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
        <ImageContainer>
          <Icon width="5%" height="5%" />
        </ImageContainer>
      )}
      <span>
        {displaySign && negative && <Sign>-</Sign>}
        {displaySign && positive && <Sign>+</Sign>}
        {minutes !== 0 && (
          <>
            <span>{minutes}</span>
            <span>:</span>
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

const Sign = styled.span`
  font-weight: 900;
`;

const ImageContainer = styled.span`
  margin: 0.3rem;
`;

export default TimeSpan;
