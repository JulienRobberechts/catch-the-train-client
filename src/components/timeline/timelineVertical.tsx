import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import DepartureBox from "./departureBox";
import DelayBox from "./delayBox";
import WaitingBox from "./waitingBox";
import TravelBox from "./travelBox";
import NowBox from "./nowBox";
import { CaretRight } from "../../design/icons";
import { getSizeRatioFor } from "./pure";
import moment from "moment";
import DelayStatus from "../../domains/toTheStation/pure/delayStatus";

interface Props {
  nowTime: moment.Moment;
  departureTime: moment.Moment;
  departureDuration: moment.Duration;
  delayDuration: moment.Duration;
  delayStatus: DelayStatus;
  travelDuration: moment.Duration;
  accessDuration: moment.Duration;
}

const TimelineVertical: React.FC<Props> = ({
  nowTime,
  departureTime,
  departureDuration,
  delayDuration,
  delayStatus,
  travelDuration,
  accessDuration,
}) => {
  const getSizeRatio = getSizeRatioFor(departureDuration);
  const travelDurationPercentage = getSizeRatio(travelDuration);
  const accessDurationPercentage = getSizeRatio(accessDuration);
  const delayDurationPercentage = getSizeRatio(delayDuration);

  return (
    <TwoColumnLayout>
      <ColumnLeft>
        <TimeColumnLayout>
          <DepartureBox
            departureTime={departureTime}
            departureDuration={departureDuration}
          />
          <NowBox nowTime={nowTime} />
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
            <DelayBox
              delayDuration={delayDuration}
              delayStatus={delayStatus}
              largeSpace={delayDurationPercentage > 25}
            />
          </DelayBoxLayout>
          <WaitingBoxLayout percentage={accessDurationPercentage}>
            <WaitingBox
              accessDuration={accessDuration}
              largeSpace={accessDurationPercentage > 25}
            />
          </WaitingBoxLayout>
          <TravelBoxLayout percentage={travelDurationPercentage}>
            <TravelBox
              travelDuration={travelDuration}
              largeSpace={travelDurationPercentage > 30}
            />
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
  flex-basis: ${(props: { percentage: number }) => props.percentage}%;
  > * {
    height: 100%;
  }
`;

const WaitingBoxLayout = styled.div`
  flex-basis: ${(props: { percentage: number }) => props.percentage}%;
  > * {
    height: 100%;
  }
`;

const TravelBoxLayout = styled.div`
  flex-basis: ${(props: { percentage: number }) => props.percentage}%;
  > * {
    height: 100%;
  }
`;

export default TimelineVertical;
