import React from "react";
import TimeSpan from "./timeSpan";
import styled from "styled-components";
import { colors } from "../../design/colors";

const DelaySummary = ({ delayDuration, delayType }) => {
  return (
    <Panel>
      <DelayValue>
        <TimeSpan timeSpan={delayDuration} displayPositiveSign={true} />
      </DelayValue>
      <DelayType delayType={delayType} />
    </Panel>
  );
};

const DelayType = ({ delayType }) => {
  switch (delayType) {
    case "early":
      return <Early />;
    case "ontime":
      return <OnTime />;
    case "late":
      return <Late />;
    default:
      return <div>???</div>;
  }
};

const Early = () => {
  return (
    <EarlyPanel>
      <span>en avance</span>
    </EarlyPanel>
  );
};

const OnTime = () => {
  return (
    <OnTimePanel>
      <span>Vous êtes à l'heure</span>
    </OnTimePanel>
  );
};

const Late = () => {
  return (
    <LatePanel>
      <span>en retard</span>
    </LatePanel>
  );
};

const DelayValue = styled.div`
  background-color: ${() => colors.color2};
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  color: ${() => colors.color5};
  font-weight: bold;
  font-size: 1.2em;
  margin: 0.2rem 0;
`;

const EarlyPanel = styled.div`
  background-color: ${() => colors.color2};
  display: flex;
  justify-content: center;
  color: ${() => colors.color6};
  font-weight: bold;
  font-size: 1.6em;
`;

const OnTimePanel = styled.div`
  background-color: ${() => colors.color2};
  display: flex;
  justify-content: center;
  color: ${() => colors.color6};
  font-weight: bold;
  font-size: 1.6em;
`;

const LatePanel = styled.div`
  background-color: ${() => colors.color2};
  display: flex;
  justify-content: center;
  color: ${() => colors.color6};
  font-weight: bold;
  font-size: 1.6em;
`;

const Panel = styled.div`
  background-color: ${() => colors.color1};
  color: ${() => colors.color5};
`;

export default DelaySummary;
