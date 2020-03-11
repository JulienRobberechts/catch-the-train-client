import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import DurationLine from "./durationLine";
import Time from "./time";
import TimeSpan from "./timeSpan";
import { CaretDown, Clock, Train, Sandglass } from "../../design/icons";

const Timeline = ({
  nowTime,
  targetDuration,
  targetTime,
  travelDuration,
  travelDurationPercentage,
  waitingDuration,
  waitingDurationPercentage
}) => {
  return (
    <Panel>
      <FirstRow>
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
        </TimeBlock>{" "}
        <TimeBlock>
          <TimeLegendText>dans </TimeLegendText>
          <TimeSpan timeSpan={targetDuration} />
          <IconContainer>
            <Sandglass />
          </IconContainer>
        </TimeBlock>
        <TimeBlock>
          <TimeLegendText>prochain train à</TimeLegendText>
          <TimeBigStyle>
            <Time time={targetTime} />
          </TimeBigStyle>
          <IconContainer>
            <Train />
          </IconContainer>
          <IconCaretContainer>
            <CaretDown />
          </IconCaretContainer>
        </TimeBlock>
      </FirstRow>
      <RestrictedTimeLine>
        <DurationLine
          travelDuration={travelDuration}
          travelDurationPercentage={travelDurationPercentage}
          waitingDuration={waitingDuration}
          waitingDurationPercentage={waitingDurationPercentage}
        />
      </RestrictedTimeLine>
    </Panel>
  );
};

const Panel = styled.div`
  background-color: ${() => colors.color1};
  color: ${() => colors.color5};
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  font-size: calc(12px + 2vw);
  * + * {
    margin-left: 5px;
  }
`;

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
  width: calc(80px + 5vw);

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

const RestrictedTimeLine = styled.div`
  margin: 0 2rem;
  margin-bottom: 0.5rem;
`;

export default Timeline;
