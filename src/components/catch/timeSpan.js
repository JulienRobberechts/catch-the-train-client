import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";

const TimeSpan = ({ timeSpan, displayPositiveSign = false }) => {
  const totalMilliseconds = timeSpan.valueOf() * 1000;
  const negative = totalMilliseconds < 0;
  const positive = totalMilliseconds > 0;

  const minutes = Math.abs(timeSpan.minutes());
  const seconds = Math.abs(timeSpan.seconds());

  return (
    <Panel>
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
    </Panel>
  );
};

const Panel = styled.span`
  margin: 0 auto;
  color: ${() => colors.color6};
`;

const NumberText = styled.span`
  margin: 0 0.05rem;
`;

const SymbolText = styled.span`
  margin: 0 0.05rem;
`;

const Sign = styled.span`
  font-weight: 900;
`;

export default TimeSpan;
