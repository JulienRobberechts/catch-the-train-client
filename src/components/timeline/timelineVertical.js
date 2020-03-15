import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import DepartureBox from "./departureBox";
import DelayBox from "./delayBox";
import WaitingBox from "./waitingBox";
import TravelBox from "./travelBox";
import NowBox from "./nowBox";
import { CaretRight } from "../../design/icons";

import { getDurationPercentage } from "../../domains/toTheStation/pure";
import { useSelector } from "react-redux";
import {
  selectEnhancedToTheStation,
  selectToTheStation
} from "../../domains/toTheStation/selectors";

const TimelineVertical = () => {
  // const toTheStation = useSelector(selectToTheStation);

  const data = useSelector(selectEnhancedToTheStation);

  if (!data) {
    return <div>...</div>;
  }
  const {
    travelDuration,
    waitingDuration,
    delayDuration,
    targetDuration
  } = data;

  const getSizePercentage = duration => {
    const sizePercentage = getDurationPercentage(duration, targetDuration);

    if (isNaN(sizePercentage)) {
      return 0;
    }
    if (sizePercentage < 0) {
      return 0;
    }
    if (isFinite(sizePercentage)) {
      return sizePercentage;
    }
    return 100;
  };

  const travelDurationPercentage = getSizePercentage(travelDuration);
  const waitingDurationPercentage = getSizePercentage(waitingDuration);
  const delayDurationPercentage = getSizePercentage(delayDuration);
  return (
    <TwoColumnLayout>
      <ColumnLeft>
        <TimeColumnLayout>
          <DepartureBox {...data} />
          <NowBox {...data} />
        </TimeColumnLayout>
      </ColumnLeft>
      <ColumnMargin>
        <IconCaretContainer>
          <CaretRight />
        </IconCaretContainer>
        <IconCaretContainer>
          <CaretRight />
        </IconCaretContainer>
      </ColumnMargin>
      <ColumnRight>
        <DurationColumnLayout>
          <DelayBoxLayout percentage={delayDurationPercentage}>
            <DelayBox {...data} largeSpace={delayDurationPercentage > 25} />
          </DelayBoxLayout>
          <WaitingBoxLayout percentage={waitingDurationPercentage}>
            <WaitingBox {...data} largeSpace={waitingDurationPercentage > 25} />
          </WaitingBoxLayout>
          <TravelBoxLayout percentage={travelDurationPercentage}>
            <TravelBox {...data} largeSpace={travelDurationPercentage > 30} />
          </TravelBoxLayout>
        </DurationColumnLayout>
      </ColumnRight>
    </TwoColumnLayout>
  );
};

const TwoColumnLayout = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  flex-grow: 2;
`;

const ColumnLeft = styled.div`
  flex-basis: 50%;
`;

const TimeColumnLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

const ColumnMargin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ColumnRight = styled.div`
  flex-basis: 50%;
`;

const DurationColumnLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

const IconCaretContainer = styled.span`
  margin-right: 0rem;
  padding-top: 0rem;

  svg {
    width: 1rem;
    height: 1rem;
    fill: ${() => colors.dark.text.normal};
  }
`;

const DelayBoxLayout = styled.div`
  flex-basis: ${props => props.percentage}%;
  > * {
    height: 100%;
  }
`;

const WaitingBoxLayout = styled.div`
  flex-basis: ${props => props.percentage}%;
  > * {
    height: 100%;
  }
`;

const TravelBoxLayout = styled.div`
  flex-basis: ${props => props.percentage}%;
  > * {
    height: 100%;
  }
`;

export default TimelineVertical;
