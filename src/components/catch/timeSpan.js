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

  return (
    <Panel>
      {Icon && (
        <IconContainer>
          <Icon />
        </IconContainer>
      )}
      <TimeText>
        {negative && <Sign>-</Sign>}
        {displayPositiveSign && positive && <Sign>+</Sign>}
        {minutes !== 0 && (
          <>
            <NumberText>{minutes}</NumberText>
            <SymbolText>min</SymbolText>
          </>
        )}
        <NumberText>
          {seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}
        </NumberText>
        <SymbolText>s</SymbolText>
      </TimeText>
    </Panel>
  );
};

const Panel = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NumberText = styled.span`
  margin: 0 0.1rem;
`;

const SymbolText = styled.span`
  margin: 0 0.05rem;
`;

const TimeText = styled.span`
  font-size: 1.3em;
  color: ${() => colors.color6};
`;

const IconContainer = styled.span`
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
