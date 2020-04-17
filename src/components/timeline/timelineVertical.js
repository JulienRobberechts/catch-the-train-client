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
import {
  selectRequestStatus,
  selectTimeTableRequest,
} from "../../domains/timeTable/selectors";
import TimeSpan from "../time/timeSpan";
import ErrorPanel from "./errorPanel";
import LoadingPanel from "./loadingPanel";
import { getStationBySlug } from "../../domains/journey/service";

const TimelineVertical = () => {
  const data = useSelector(selectEnhancedTimeTable);
  const requestStatus = useSelector(selectRequestStatus);
  const request = useSelector(selectTimeTableRequest);

  if (!data || !data.travel) {
    return <div>... no travel data </div>;
  }

  const {
    travel: { nowTime, travelDuration, waitingDuration },
  } = data;

  const departureName = getStationBySlug(request?.station)?.name;

  // currentDeparture can be null for 2 reasons:
  // - stationConfiguration empty
  // - userConfiguration empty
  // TODO: expose this

  if (!data?.currentDeparture?.code || !data?.enhancedDepartures) {
    return (
      <div>
        {requestStatus?.loading && (
          <LoadingPanel departureName={departureName} />
        )}
        {!requestStatus?.loading && requestStatus?.error && (
          <ErrorPanel error={requestStatus?.error} />
        )}
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
