import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import Departure from "./departure";
import { ArrowLeft, ArrowRight, More, Clock } from "../../design/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentTrainCode } from "../../domains/toTheStation/selectors";
import { selectTimeTableContext } from "../../domains/timeTable/selectors";
import { selectEnhancedTimeTable } from "../../domains/timeTableToTheStation/selectors";

const NUMBER_OF_DEPARTURE_VISIBLE = 3;

function TimeTable() {
  const { push } = useHistory();

  const enhancedDepartures = useSelector(selectEnhancedTimeTable);
  const currentTrainCode = useSelector(selectCurrentTrainCode);

  const context = useSelector(selectTimeTableContext);

  if (!enhancedDepartures || !currentTrainCode) {
    return <Panel>...</Panel>;
  }

  const {
    network,
    line,
    station: { slug: station },
    missions,
  } = context;
  const missionsString = missions ? missions.join(",") : undefined;

  const trainCode = currentTrainCode;

  const currentIndex = Math.max(
    0,
    enhancedDepartures.findIndex(
      (departure) => departure.trainCode === trainCode
    )
  );

  const minIndex = Math.max(
    0,
    Math.min(
      currentIndex - 1,
      enhancedDepartures.length - NUMBER_OF_DEPARTURE_VISIBLE
    )
  );

  const previousVisible = minIndex > 0;
  const nextVisible =
    minIndex < enhancedDepartures.length - NUMBER_OF_DEPARTURE_VISIBLE;

  return (
    <Panel>
      <Title>Prochains trains</Title>
      <ScrollPanel>
        {previousVisible ? (
          <PreviousButton
            onClick={() => {
              const departure = enhancedDepartures[currentIndex - 1];
              push(
                `/${network}/${line}/${station}/${departure.trainCode}?missions=${missionsString}`
              );
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

        {enhancedDepartures.slice(minIndex, minIndex + 3).map((departure) => (
          <Departure
            key={departure.index}
            selected={departure.index === currentIndex}
            onSelect={() => {
              push(
                `/${network}/${line}/${station}/${departure.trainCode}?missions=${missionsString}`
              );
            }}
            {...departure}
          />
        ))}
        {nextVisible ? (
          <NextButton
            disabled={
              minIndex >=
              enhancedDepartures.length - NUMBER_OF_DEPARTURE_VISIBLE
            }
            onClick={() => {
              const departure = enhancedDepartures[currentIndex + 1];
              push(
                `/${network}/${line}/${station}/${departure.trainCode}?missions=${missionsString}`
              );
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
