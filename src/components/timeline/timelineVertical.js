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

import { useSelector } from "react-redux";
import { selectEnhancedTimeTable } from "../../domains/timeTableToTheStation/selectors";
import { selectRequestStatus } from "../../domains/timeTable/selectors";
import TimeSpan from "../time/timeSpan";
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 1.3rem auto;
`;

const TimelineVertical = () => {
  const data = useSelector(selectEnhancedTimeTable);
  const requestStatus = useSelector(selectRequestStatus);

  if (!data || !data.travel) {
    return <div>... no travel data </div>;
  }

  const {
    travel: { nowTime, travelDuration, waitingDuration },
  } = data;

  // currentDeparture can be null for 2 reasons:
  // - stationConfiguration empty
  // - userConfiguration empty
  // TODO: expose this

  if (!data?.currentDeparture?.code || !data?.enhancedDepartures) {
    return (
      <div>
        <div> ...</div>
        <div>edge case UI v1</div>
        {requestStatus?.loading && (
          <LoadingPanel>
            <LoadingText>
              <div>recherche du prochain départ</div>
              <div>XXX</div>
            </LoadingText>
            <CircleLoader css={override} size={100} color={"#E0AB19"} />
          </LoadingPanel>
        )}
        {!requestStatus?.loading && requestStatus?.error && (
          <ErrorPanel>
            <LoadingText>
              <div>Oups !!</div>
              <div>XXX</div>
            </LoadingText>
          </ErrorPanel>
        )}
        {requestStatus?.error && "Error"}
        <div>no departure</div>
        <div>
          <NowBox nowTime={nowTime} />
          <div>
            travelDuration:
            <TimeSpan timeSpan={travelDuration} />
          </div>
          <div>
            waitingDuration:
            <TimeSpan timeSpan={waitingDuration} />
          </div>
        </div>
      </div>
    );
  }

  const {
    currentDeparture: { index: departureIndex } = { index: undefined },
    enhancedDepartures,
  } = data;

  const departure = enhancedDepartures[departureIndex];
  if (!departure) {
    throw Error("Departure is empty. It should never happen");
  }

  const {
    departureTime,
    departureDuration,
    delayDuration,
    delayStatus,
  } = departure;

  const getSizeRatio = getSizeRatioFor(departureDuration);
  const travelDurationPercentage = getSizeRatio(travelDuration);
  const waitingDurationPercentage = getSizeRatio(waitingDuration);
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
          <WaitingBoxLayout percentage={waitingDurationPercentage}>
            <WaitingBox
              waitingDuration={waitingDuration}
              largeSpace={waitingDurationPercentage > 25}
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

const LoadingPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e0ab19;
  font-size: 1.2rem;
`;
const LoadingText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e6716e;
  font-size: 1.2rem;
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
  flex-basis: ${(props) => props.percentage}%;
  > * {
    height: 100%;
  }
`;

const WaitingBoxLayout = styled.div`
  flex-basis: ${(props) => props.percentage}%;
  > * {
    height: 100%;
  }
`;

const TravelBoxLayout = styled.div`
  flex-basis: ${(props) => props.percentage}%;
  > * {
    height: 100%;
  }
`;

export default TimelineVertical;
