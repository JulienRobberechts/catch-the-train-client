import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import Departure from "./departure";
import { ArrowLeft, ArrowRight, More, Clock } from "../../design/icons";

function TimeTable({
  enhancedDepartures,
  minIndex,
  currentTrainCode,
  handleDepartureNav,
  previousVisible,
  handlePreviousDepartureNav,
  nextVisible,
  handleNextDepartureNav,
  numberOfDepartureVisible,
}) {
  return (
    <Panel>
      <ScrollPanel>
        {previousVisible ? (
          <PreviousButton onClick={handlePreviousDepartureNav}>
            <IconContainer>
              <ArrowLeft />
            </IconContainer>
          </PreviousButton>
        ) : (
          <PlaceholderItem>
            <IconContainer>
              <Clock />
            </IconContainer>
          </PlaceholderItem>
        )}
        {enhancedDepartures
          .slice(minIndex, minIndex + numberOfDepartureVisible)
          .map((departure) => (
            <Departure
              key={departure.trainCode}
              selected={departure.trainCode === currentTrainCode}
              onSelect={handleDepartureNav(departure.trainCode)}
              {...departure}
            />
          ))}
        {nextVisible ? (
          <NextButton onClick={handleNextDepartureNav}>
            <IconContainer>
              <ArrowRight />
            </IconContainer>
          </NextButton>
        ) : (
          <PlaceholderItem>
            <IconContainer>
              <More />
            </IconContainer>
          </PlaceholderItem>
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
  height: 6rem;
  display: flex;
  flex-direction: column;
`;

const ScrollPanel = styled.div`
  flex-grow: 1;
  margin: 0.1rem;
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

const PlaceholderItem = styled(ScrollPanelItem)`
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
    width: 1.5rem;
    height: 100%;
    fill: ${() => colors.dark.panel.one.button.one.text.normal};
  }
`;

export { TimeTable as default };
