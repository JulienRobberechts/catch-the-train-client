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
  const {
    prefix,
    fullMessage,
    funSuffix,
    displaySeconds = false,
  } = getActionMessage(delayDuration, delayStatus);
  console.log("displaySeconds :>> ", displaySeconds);

  const { displayDestination, platform } = departure;

  return (
    <Train selected={selected} onClick={onSelect}>
      <VerticalLayout>
        <HorizontalLayout>
          <DurationBox>
            <DurationStyle>
              <DurationPrefixStyle>dans </DurationPrefixStyle>
              <TimeSpan
                timeSpan={departureDuration}
                displaySeconds={!!displaySeconds}
              />
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
                  <ActionMessageFunSuffix>{funSuffix}</ActionMessageFunSuffix>
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
              <FieldValuePlatform>{platform}</FieldValuePlatform>
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
    if (delayDurationAsMinute < 3) {
      return {
        prefix: "Vous avez moins de ",
        funSuffix: " ... pour prendre un café et partir",
        displaySeconds: true,
      };
    }
    if (delayDurationAsMinute < 10) {
      return {
        prefix: "Vous avez ",
        funSuffix: " ... pour vous préparer avant de partir",
      };
    }

    if (delayDurationAsMinute > 30) {
      return {
        prefix: "Vous avez plus de ",
        funSuffix: " ... pour vous amuser avant de partir",
      };
    }

    return {
      prefix: "Vous avez encore ",
      funSuffix: " ... pour manger un morceau avant de partir",
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
  padding-top: 0.2rem;
  svg {
    width: 3.2rem;
    fill: ${(props) => fontColorForDelayStatus(props.delayStatus)};
  }
`;

const Train = styled.div<{ selected: boolean }>`
  background: ${(props) => (props.selected ? "white" : "#eee")};

  & + & {
    border-top: 1px solid;
  }

  padding: 0.2rem;

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

const TimeStyle = styled.span`
  font-size: 1rem;
`;

const DurationBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 5rem;
`;

const DurationPrefixStyle = styled.div`
  font-size: 60%;
  vertical-align: 20%;
  font-style: italic;
  font-weight: 100;
  line-height: 100%;
`;

const DurationStyle = styled.span`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
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

  line-height: 150%;
  margin: 0.3rem;
  padding: 0.3rem;
  width: 100%;

  border-radius: 0.2rem;
`;

const ActionMessage = styled.div`
  font-size: clamp(100%, 0.5rem + 1vw, 18px);
`;

const ActionMessageFunSuffix = styled.div`
  padding: 0.2rem 0;
`;
const MessageBoxDuration = styled.span`
  font-weight: 100;
  font-size: 140%;
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
  font-size: 120%;
  font-weight: 700;
`;

const FieldValuePlatform = styled.span`
  font-size: 120%;
  font-weight: 700;
`;

const HorizontalLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Departure;
