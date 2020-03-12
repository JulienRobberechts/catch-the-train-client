import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import TrainScheduleDeparture from "./trainScheduleDeparture";
import { ArrowLeft, ArrowRight, More, Clock } from "../../design/icons";

function TrainSchedule({ schedule }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [minIndex, setMinCurrentIndex] = useState(0);
  const previousVisible = minIndex > 0;
  const nextVisible = minIndex < schedule.length - 4;

  return (
    <Panel>
      <Title>Prochains trains</Title>
      <ScrollPanel>
        {previousVisible ? (
          <PreviousButton
            onClick={() => {
              setMinCurrentIndex(minIndex => minIndex - 1);
              setCurrentIndex(index => index - 1);
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

        {schedule.slice(minIndex, minIndex + 3).map(item => (
          <TrainScheduleDeparture
            key={item.index}
            selected={item.index === currentIndex}
            onSelect={() => setCurrentIndex(item.index)}
            {...item}
          />
        ))}
        {nextVisible ? (
          <NextButton
            disabled={minIndex >= schedule.length - 4}
            onClick={() => {
              setMinCurrentIndex(minIndex => minIndex + 1);
              setCurrentIndex(index => index + 1);
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

export { TrainSchedule as default, ScrollPanelItem };
