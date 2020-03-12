import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import Departure from "./departure";
import { ArrowLeft, ArrowRight, More, Clock } from "../../design/icons";
import { useHistory, useParams } from "react-router-dom";

const NUMBER_OF_DEPARTURE_VISIBLE = 3;

function TimeTable({ timeTable }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const previousVisible = minIndex > 0;
  const nextVisible =
    minIndex < timeTable.length - NUMBER_OF_DEPARTURE_VISIBLE - 1;

  const { push } = useHistory();
  const { station, direction, departureTimeCode } = useParams();
  console.log({ station, direction, departureTimeCode });

  useEffect(() => {
    const departureIndex = timeTable.findIndex(
      departure => departure.departureTimeCode === departureTimeCode
    );

    const minIndex = Math.max(
      0,
      Math.min(
        departureIndex - 1,
        timeTable.length - NUMBER_OF_DEPARTURE_VISIBLE
      )
    );
    // console.log("TimeTableTimeTableTimeTableTimeTable", {
    //   departureIndex,
    //   minIndex,
    //   timeTableLength: timeTable.length
    // });
    setCurrentIndex(departureIndex);
    setMinIndex(minIndex);
  }, [timeTable, departureTimeCode]);

  return (
    <Panel>
      <Title>Prochains trains</Title>
      <ScrollPanel>
        {previousVisible ? (
          <PreviousButton
            onClick={() => {
              setMinIndex(minIndex => minIndex - 1);
              setCurrentIndex(index => index - 1);
              const item = timeTable[currentIndex - 1];
              push(`/sg/paris/${item.departureTimeCode}`);
            }}
          >
            <IconContainer>
              <ArrowLeft />
            </IconContainer>
          </PreviousButton>
        ) : (
          <PreviousPlaceholder>
            <IconContainer>
              <Clock />
            </IconContainer>
          </PreviousPlaceholder>
        )}

        {timeTable.slice(minIndex, minIndex + 3).map(departure => (
          <Departure
            key={departure.index}
            selected={departure.index === currentIndex}
            onSelect={() => {
              setCurrentIndex(departure.index);
              push(`/sg/paris/${departure.departureTimeCode}`);
            }}
            {...departure}
          />
        ))}
        {nextVisible ? (
          <NextButton
            disabled={minIndex >= timeTable.length - 4}
            onClick={() => {
              setMinIndex(minIndex => minIndex + 1);
              setCurrentIndex(index => index + 1);
              const item = timeTable[currentIndex + 1];
              push(`/sg/paris/${item.departureTimeCode}`);
            }}
          >
            <IconContainer>
              <ArrowRight />
            </IconContainer>
          </NextButton>
        ) : (
          <PreviousPlaceholder>
            <IconContainer>
              <More />
            </IconContainer>
          </PreviousPlaceholder>
        )}
      </ScrollPanel>
    </Panel>
  );
}

const Panel = styled.div`
  background: ${() => colors.dark.panel.one.background};
  color: ${() => colors.dark.panel.one.text.normal};
  margin-top: 0.3rem;
  border-radius: 3px;
`;

const Title = styled.div`
  font-size: 0.7rem;
  padding-left: 0.4rem;
`;

const ScrollPanel = styled.div`
  padding: 0.2rem;
  padding-top: 0;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const ScrollPanelItem = styled.button`
  background: ${() => colors.dark.panel.one.background};
  margin: 0.1rem;
  padding: 0.4rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border: 1px solid;
  flex-basis: 20%;
`;

const PreviousButton = styled(ScrollPanelItem)``;

const NextButton = styled(ScrollPanelItem)``;

const PreviousPlaceholder = styled.div`
  background: ${() => colors.dark.panel.one.background};
  color: ${() => colors.dark.panel.one.text.normal};
  margin: 0.3rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  flex-basis: 20%;
  text-align: center;

  font-weight: normal;
  font-size: 0.6rem;
`;

const IconContainer = styled.div`
  svg {
    width: 1.3rem;
    height: 1.3rem;
    fill: ${() => colors.dark.panel.one.button.one.text.normal};
  }
`;

export { TimeTable as default, ScrollPanelItem };
