import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import DepartureBox from "./departureBox";
import DelayBox from "./delayBox";
import WaitingBox from "./waitingBox";
import TravelBox from "./travelBox";
import NowBox from "./nowBox";
import { CaretRight } from "../../design/icons";

const TimelineVertical = data => {
  return (
    <TwoColumnLayout>
      <ColumnLeft>
        <TimeColumnLayout>
          <DepartureBox {...data} />
          <NowBox {...data} />
        </TimeColumnLayout>
      </ColumnLeft>
      <ColumnMargin>
        <IconContainer>
          <CaretRight />
        </IconContainer>
        <IconContainer>
          <CaretRight />
        </IconContainer>
      </ColumnMargin>
      <ColumnRight>
        <DurationColumnLayout>
          <DelayBoxLayout percentage={data.delayDurationPercentage}>
            <DelayBox {...data} />
          </DelayBoxLayout>
          <WaitingBoxLayout percentage={data.waitingDurationPercentage}>
            <WaitingBox {...data} />
          </WaitingBoxLayout>
          <TravelBoxLayout percentage={data.travelDurationPercentage}>
            <TravelBox {...data} />
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
  background: ${() => colors.color2};
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
  background: ${() => colors.color2};
`;

const DurationColumnLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

const IconContainer = styled.span`
  margin-right: 0rem;
  padding-top: 0rem;
  svg {
    width: 1rem;
    height: 1rem;
    color: ${() => colors.color6};
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
