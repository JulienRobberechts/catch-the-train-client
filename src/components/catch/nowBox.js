import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import Time from "./time";
import { CaretDown, Clock } from "../../design/icons";

const NowBox = ({
  nowTime,
  targetDuration,
  targetTime,
  travelDuration,
  travelDurationPercentage,
  waitingDuration,
  waitingDurationPercentage
}) => {
  return (
    <TimeBlock>
      <TimeLegendText>il est</TimeLegendText>
      <TimeBigStyle>
        <Time time={nowTime} />
      </TimeBigStyle>
      <IconContainer>
        <Clock />
      </IconContainer>
      <IconCaretContainer>
        <CaretDown />
      </IconCaretContainer>
    </TimeBlock>
  );
};

const TimeLegendText = styled.span`
  font-size: 0.8rem;
  text-align: center;
  margin: 0 auto;
`;

const TimeBlock = styled.div`
  color: ${() => colors.color6};
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 4px;
  border: 1px solid ${() => colors.color5};
  border-radius: 7px;

  background: ${() => colors.color3};
`;

const TimeBigStyle = styled.span`
  color: ${() => colors.color6};
  margin: 0 0.2rem;
`;

const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin-top: 4px;
  svg {
    width: 1.6rem;
    height: 1.6rem;
    color: ${() => colors.color6};
  }
`;

const IconCaretContainer = styled.span`
  vertical-align: text-bottom;
  padding-top: 0.2rem;
  svg {
    width: 1rem;
    height: 1rem;
    color: ${() => colors.color6};
  }
`;

export default NowBox;
