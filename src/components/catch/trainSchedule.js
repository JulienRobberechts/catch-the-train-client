import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import TrainScheduleDeparture from "./trainScheduleDeparture";

function TrainSchedule({ schedule }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  console.log("currentIndex", currentIndex);
  return (
    <Panel>
      <Title>Prochains trains</Title>
      <ScrollPanel>
        <PreviousButton
          disabled={currentIndex <= 0}
          onClick={() => setCurrentIndex(index => index - 1)}
        >
          {"<<"}
        </PreviousButton>
        {schedule.map(item => (
          <TrainScheduleDeparture
            key={item.index}
            selected={item.index === currentIndex}
            onSelect={() => setCurrentIndex(item.index)}
            {...item}
          />
        ))}
        <NextButton
          disabled={currentIndex >= schedule.length - 1}
          onClick={() => setCurrentIndex(index => index + 1)}
        >
          {">>"}
        </NextButton>
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
  margin: 0.2rem;
  padding: 0.3rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  border: none;
`;

const PreviousButton = styled(ScrollPanelItem)`
  :disabled {
    visibility: hidden;
  }
`;

const NextButton = styled(ScrollPanelItem)`
  :disabled {
    visibility: hidden;
  }
`;

export { TrainSchedule as default, ScrollPanelItem };
