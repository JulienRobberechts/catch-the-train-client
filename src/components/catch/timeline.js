import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import DurationLine from "./durationLine";
import Time from "./time";
import TimeSpan from "./timeSpan";
import { CaretDown } from "../../design/icons";

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
      <TimeContainer>
        <Time time={nowTime} icon="clock" />
        <div>
          Prochain train:
          <Time time={targetTime} icon="traindark" />
        </div>
      </TimeContainer>
      <CaretLine>
        <IconContainer>
          <CaretDown />
        </IconContainer>
        <IconContainer>
          <CaretDown />
        </IconContainer>
      </CaretLine>
      <RestrictedTimeLine>
        <TimeContainerCenter>
          <TimeText>dans </TimeText>
          <TimeSpan timeSpan={targetDuration} />
        </TimeContainerCenter>
        <LineParent>
          <DurationLine
            travelDuration={travelDuration}
            travelDurationPercentage={travelDurationPercentage}
            waitingDuration={waitingDuration}
            waitingDurationPercentage={waitingDurationPercentage}
          />
        </LineParent>
      </RestrictedTimeLine>
    </Panel>
  );
};

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0;
`;

const TimeText = styled.span`
  font-size: 1.3em;
  color: ${() => colors.color6};
  margin-right: 0.3rem;
`;

const RestrictedTimeLine = styled.div`
  margin: 0 2rem;
  margin-bottom: 0.5rem;
`;

const TimeContainerCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const Panel = styled.div`
  background-color: ${() => colors.color1};
  color: ${() => colors.color5};
`;
const LineParent = styled.div``;

const CaretLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin: 0 1.5rem;
  padding-top: 0.2rem;
  svg {
    width: 1rem;
    height: 1rem;
    color: ${() => colors.color6};
  }
`;

export default Timeline;
