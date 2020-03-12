import React from "react";
import { TimeSpan } from "../time";
import styled from "styled-components";
import { colors } from "../../design/colors";

import { Break } from "../../design/icons";

const DelayBox = data => {
  console.log("data", data);
  const { delayDuration, delayType, delayDurationPercentage } = data;

  const largeSpace = delayDurationPercentage > 25;

  return (
    <Box delayType={delayType}>
      <DelayTypeComponent delayType={delayType} />
      <DelayValue>
        <TimeSpan timeSpan={delayDuration} displayPositiveSign={true} />
      </DelayValue>
      {largeSpace && (
        <IconContainer delayType={delayType}>
          <Break />
        </IconContainer>
      )}
    </Box>
  );
};

const DelayTypeComponent = ({ delayType }) => {
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

const fontColorForDelayType = delayType => {
  switch (delayType) {
    case "early":
      return colors.dark.text.original;
    case "late":
      return colors.dark.text.warning;
    default:
      return colors.dark.text.normal;
  }
};

const Early = () => {
  return <EarlyPanel>en avance</EarlyPanel>;
};

const OnTime = () => {
  return <OnTimePanel>Vous êtes à l'heure</OnTimePanel>;
};

const Late = () => {
  return <LatePanel>en retard</LatePanel>;
};

const Box = styled.div`
  background: ${() => colors.dark.background};
  color: ${props => fontColorForDelayType(props.delayType)};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  margin-left: 2px;
`;

const DelayValue = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  font-weight: bold;
  font-size: 1.2em;
`;

const EarlyPanel = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.6em;
`;

const OnTimePanel = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1em;
  text-align: center;
`;

const LatePanel = styled.div`
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
    fill: ${props => fontColorForDelayType(props.delayType)};
  }
`;

export default DelayBox;
