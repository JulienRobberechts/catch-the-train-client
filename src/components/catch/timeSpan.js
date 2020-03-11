import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";

const TimeSpan = ({ timeSpan, displayPositiveSign = false }) => {
  // console.log("timeSpan", timeSpan);
  const totalMilliseconds = timeSpan.valueOf() * 1000;
  console.log("totalMilliseconds", totalMilliseconds);
  const negative = totalMilliseconds < 0;
  const positive = totalMilliseconds > 0;

  const minutes = Math.abs(timeSpan.minutes());
  const seconds = Math.abs(timeSpan.seconds());

  return (
    <Panel>
      <Panel2>
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
      </Panel2>
    </Panel>
  );
};

const Panel = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  color: ${() => colors.color6};
  overflow: hidden;
`;

const Panel2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const NumberText = styled.span`
  margin: 0 0.1rem;
`;

const SymbolText = styled.span`
  margin: 0 0.05rem;
`;

const Sign = styled.span`
  font-weight: 900;
`;

export default TimeSpan;
