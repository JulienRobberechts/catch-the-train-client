import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";

function TrainSchedule() {
  return (
    <Panel>
      <Title>Prochains trains</Title>
      <ScrollPanel>
        <PreviousButton>{"<<"}</PreviousButton>
        <Train>
          <div>9h15</div>
          <div>12 mins 04 s</div>
        </Train>
        <Train>
          <div>9h15</div>
          <div>12 mins 04 s</div>
        </Train>
        <Train>
          <div>9h15</div>
          <div>12 mins 04 s</div>
        </Train>
        <NextButton>{">>"}</NextButton>
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

const ScrollPanelItem = styled.div`
  background-color: ${() => colors.color3};
  margin: 0.2rem;
  padding: 0.3rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PreviousButton = styled(ScrollPanelItem)``;

const Train = styled(ScrollPanelItem)`
  font-size: 0.7rem;
`;

const NextButton = styled(ScrollPanelItem)``;

export default TrainSchedule;
