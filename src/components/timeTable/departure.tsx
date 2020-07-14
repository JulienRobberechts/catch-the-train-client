import React from "react";
import styled from "styled-components";
import { Time, TimeSpan } from "../time";
import { fontColorForDelayStatus } from "../delayDesign";
import moment from "moment";
import DelayStatus from "../../domains/toTheStation/pure/delayStatus";
import { Walk } from "../../design/icons";
import { RawDeparture } from "../../domains/timeTable/types";
// import { colors } from "../../design/colors";

interface Props {
  selected: boolean;
  departureTime: moment.Moment;
  departureDuration: moment.Duration;
  onSelect: () => void;
  delayDuration: moment.Duration;
  delayStatus: DelayStatus;
  departure: RawDeparture;
}

function Departure({
  selected,
  departureTime,
  departureDuration,
  onSelect,
  delayDuration,
  delayStatus,
  departure,
}: Props) {
  const { prefix, fullMessage, funSuffix } = getActionMessage(
    delayDuration,
    delayStatus
  );
  const durationLarge = departureDuration.as("minutes") < 30;

  const { displayDestination, platform } = departure;

  return (
    <Train selected={selected} onClick={onSelect}>
      <VerticalLayout>
        <HorizontalLayout>
          <DurationBox>
            <DurationStyle large={durationLarge}>
              <DurationPrefixStyle>dans </DurationPrefixStyle>
              <TimeSpan timeSpan={departureDuration} displaySeconds={false} />
            </DurationStyle>
          </DurationBox>
          <TimeBox>
            <TimeStyle>
              <Time time={departureTime} />
            </TimeStyle>
          </TimeBox>
          <IconBox>
            <IconContainer delayStatus={delayStatus}>
              <Walk />
            </IconContainer>
          </IconBox>
          <MessageBox>
            <ActionMessage>
              {fullMessage ? (
                fullMessage
              ) : (
                <>
                  {prefix}
                  <MessageBoxDuration>
                    <TimeSpan timeSpan={delayDuration} displaySeconds={false} />
                  </MessageBoxDuration>
                  <div>{funSuffix}</div>
                </>
              )}
            </ActionMessage>
          </MessageBox>
        </HorizontalLayout>
        <BottomBox>
          <div>
            <FieldName>direction </FieldName>
            <FieldValue>{displayDestination}</FieldValue>
          </div>
          {platform && (
            <div>
              <FieldName>voie </FieldName>
              <FieldValue>{platform}</FieldValue>
            </div>
          )}
          <div>
            <MoreLink>détails</MoreLink>
          </div>
        </BottomBox>
      </VerticalLayout>
    </Train>
  );
}

const getActionMessage = (
  delayDuration: moment.Duration,
  delayStatus: DelayStatus
) => {
  if (delayStatus === "early") {
    const delayDurationAsMinute = delayDuration.as("minutes");
    if (delayDurationAsMinute < 4) {
      return {
        prefix: "Vous avez ",
        funSuffix: " pour prendre un café avant de partir",
      };
    }
    return {
      prefix: "Vous avez encore ",
      funSuffix: " pour manger un morceau avant de partir",
    };
  }

  if (delayStatus === "late") {
    return {
      fullMessage: "Il va falloir courir pour attraper le train !",
    };
  }

  if (delayStatus === "on-time") {
    return {
      fullMessage: "C'est le bon moment pour partir !",
    };
  }

  return {
    fullMessage: "...",
  };
};
const IconContainer = styled.span<{ delayStatus: DelayStatus }>`
  margin-right: 0rem;
  padding-top: 0rem;
  margin: 0;
  svg {
    width: 3.6rem;

    fill: ${(props) => fontColorForDelayStatus(props.delayStatus)};
  }
`;

const Train = styled.div<{ selected: boolean }>`
  background: ${(props) => (props.selected ? "white" : "#eee")};

  & + & {
    border-top: 1px solid;
  }

  padding: 0.1rem;

  cursor: pointer;
  flex-basis: 20%;
  font-size: 0.7rem;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const TimeStyle = styled.span`
  font-size: 1.3rem;
`;

const DurationStyle = styled.span<{ large: boolean }>`
  font-size: ${(props) => (props.large ? 1.2 : 1.2)}rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DurationPrefixStyle = styled.div`
  font-size: 60%;
  vertical-align: 20%;
  font-style: italic;
  font-weight: 100;
  line-height: 100%;
`;

const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 4rem;
`;
const DurationBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 4rem;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 0rem;
  padding: 0rem;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 0.3rem;
  padding: 0.3rem;
  width: 100%;

  border-radius: 0.2rem;
`;

const ActionMessage = styled.div`
  font-size: 1rem;
`;
const MessageBoxDuration = styled.span`
  font-weight: 900;
  font-size: 1.8rem;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 0 0.5rem;
`;

const FieldName = styled.span`
  font-size: 100%;
  font-style: italic;
  font-weight: 100;
`;

const MoreLink = styled.div`
  font-size: 100%;
  font-weight: 100;
`;

const FieldValue = styled.span`
  font-size: 100%;
  font-weight: 700;
`;

const HorizontalLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Departure;
