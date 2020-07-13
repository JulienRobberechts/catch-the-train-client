import React from "react";
import styled from "styled-components";
import { Time, TimeSpan } from "../time";
import { fontColorForDelayStatus } from "../delayDesign";
import moment from "moment";
import DelayStatus from "../../domains/toTheStation/pure/delayStatus";
import { Walk } from "../../design/icons";
// import { colors } from "../../design/colors";

interface Props {
  selected: boolean;
  departureTime: moment.Moment;
  departureDuration: moment.Duration;
  onSelect: () => void;
  delayStatus: DelayStatus;
}

function Departure({
  selected,
  departureTime,
  departureDuration,
  onSelect,
  delayStatus,
}: Props) {
  const actionMessagePrefix = "Vous avez ";
  const actionMessageFun = " pour prendre un café avant de partir";

  // TODO: to get from the store
  const delayDuration = moment.duration({ seconds: 3.5 * 60 });

  const durationLarge = departureDuration.as("minutes") < 30;
  const direction = "Marne la Vallée Chessy";

  return (
    <Train selected={selected} onClick={onSelect}>
      <VerticalLayout>
        <HorizontalLayout>
          <TimeBox>
            <DurationStyle large={durationLarge}>
              <DurationPrefixStyle>dans </DurationPrefixStyle>
              <TimeSpan timeSpan={departureDuration} displaySeconds={false} />
            </DurationStyle>
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
              {actionMessagePrefix}
              <MessageBoxDuration>
                <TimeSpan timeSpan={delayDuration} displaySeconds={false} />
              </MessageBoxDuration>
              <div>{actionMessageFun}</div>
            </ActionMessage>
          </MessageBox>
        </HorizontalLayout>
        <DirectionBox>
          <div>
            <DirectionField>Direction: </DirectionField>
            <DirectionValue>{direction}</DirectionValue>
          </div>
        </DirectionBox>
      </VerticalLayout>
    </Train>
  );
}

const IconContainer = styled.span<{ delayStatus: DelayStatus }>`
  margin-right: 0rem;
  padding-top: 0rem;
  margin: 0;
  svg {
    width: 3.6rem;
    height: 5.4rem;
    fill: ${(props) => fontColorForDelayStatus(props.delayStatus)};
  }
`;

const Train = styled.div<{ selected: boolean }>`
  background: ${(props) => (props.selected ? "white" : "#eee")};

  & + & {
    border-top: 1px solid;
  }

  padding: 0.4rem;

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
  font-size: ${(props) => (props.large ? 1.4 : 0.9)}rem;
`;
const DurationPrefixStyle = styled.span`
  font-size: 60%;
  vertical-align: 20%;
  font-style: italic;
  font-weight: 100;
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

  min-width: 6rem;
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
`;

const ActionMessage = styled.div`
  font-size: 1rem;
`;
const MessageBoxDuration = styled.span`
  font-weight: 900;
  font-size: 1.8rem;
`;

const DirectionBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`;

const DirectionField = styled.span`
  font-size: 100%;
  font-style: italic;
  font-weight: 100;
`;

const DirectionValue = styled.span`
  font-size: 100%;
  font-weight: 700;
`;

const HorizontalLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Departure;
