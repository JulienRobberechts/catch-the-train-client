import React from "react";
import TimeSpan from "./timeSpan";
import styled from "styled-components";
import { colors } from "../../design/colors";

import { Break } from "../../design/icons";

const DelayBox = data => {
  console.log("data", data);
  const { delayDuration, delayType, delayDurationPercentage } = data;

  const largeSpace = delayDurationPercentage > 25;

  return (
    <Box>
      <DelayType delayType={delayType} />
      <DelayValue>
        <TimeSpan timeSpan={delayDuration} displayPositiveSign={true} />
      </DelayValue>
      {largeSpace && (
        <IconContainer>
          <Break />
        </IconContainer>
      )}
    </Box>
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

const Box = styled.div`
  background: ${() => colors.color2};
  color: ${() => colors.color5};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;

  border-left: 1px solid black;
  margin-left: 2px;
`;

const DelayValue = styled.div`
  color: ${() => colors.color5};
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  font-weight: bold;
  font-size: 1.2em;
`;

const EarlyPanel = styled.div`
  background: ${() => colors.color2};
  color: ${() => colors.color6};
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.6em;
`;

const OnTimePanel = styled.div`
  background: ${() => colors.color2};
  color: ${() => colors.color6};
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.6em;
`;

const LatePanel = styled.div`
  background: ${() => colors.color5};
  color: ${() => colors.color2};
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.6em;
`;

const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin: 0 auto;
  padding-top: 0rem;
  svg {
    width: 2.4rem;
    height: 3.6rem;
    color: ${() => colors.color6};
  }
`;

export default DelayBox;
