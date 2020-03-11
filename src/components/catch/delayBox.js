import React from "react";
import TimeSpan from "./timeSpan";
import styled from "styled-components";
import { colors } from "../../design/colors";

const DelayBox = data => {
  console.log("data", data);
  const { delayDuration, delayType, delayDurationPercentage } = data;

  // const largeSpace = delayDurationPercentage > 25;

  return (
    <Panel>
      <DelayType delayType={delayType} />
      <DelayValue>
        <TimeSpan timeSpan={delayDuration} displayPositiveSign={true} />
      </DelayValue>
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

const Panel = styled.div`
  background-color: purple;
  color: ${() => colors.color5};
`;

const DelayValue = styled.div`
  background-color: ${() => colors.color3};
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  color: ${() => colors.color5};
  font-weight: bold;
  font-size: 1.2em;
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

export default DelayBox;
