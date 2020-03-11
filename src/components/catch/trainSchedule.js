import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import TrainScheduleDeparture from "./trainScheduleDeparture";

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
            {" "}
            {"<<"}
          </PreviousButton>
        ) : (
          <PreviousPlaceholder>premier train:</PreviousPlaceholder>
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
            {">>"}
          </NextButton>
        ) : (
          <PreviousPlaceholder>pas encore disponible...</PreviousPlaceholder>
        )}
      </ScrollPanel>
    </Panel>
  );
}

const Panel = styled.div`
  background-color: ${() => colors.color5};
  margin-top: 0.3rem;
`;

const Title = styled.div`
  color: ${() => colors.color2};
  font-size: 0.7rem;
  padding-left: 0.4rem;
`;

const ScrollPanel = styled.div`
  background-color: ${() => colors.color5};
  padding: 0.2rem;
  padding-top: 0;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const ScrollPanelItem = styled.button`
  background-color: ${() => colors.color3};
  margin: 0.1rem;
  padding: 0.4rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border: none;
  flex-basis: 20%;
`;

const PreviousButton = styled(ScrollPanelItem)``;

const NextButton = styled(ScrollPanelItem)``;

const PreviousPlaceholder = styled.div`
  background-color: ${() => colors.color3};
  margin: 0.1rem;
  padding: 0.4rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  flex-basis: 20%;

  background-color: ${() => colors.color5};
  color: ${() => colors.color2};
  font-style: italic;
  font-size: 0.7rem;
`;

export { TrainSchedule as default, ScrollPanelItem };
