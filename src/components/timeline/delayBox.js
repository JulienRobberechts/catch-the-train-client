import React from "react";
import { TimeSpan } from "../time";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { fontColorForDelayStatus } from "../delayDesign";

import { Break } from "../../design/icons";

const DelayBox = data => {
  // console.log("data", data);
  const { delayDuration, delayStatus, largeSpace } = data;
  const delayStatusText = textForDelayStatus(delayStatus);

  return (
    <Box delayStatus={delayStatus}>
      <div>
        <PreText>vous êtes</PreText>
        <DelayStatusPanel>{delayStatusText}</DelayStatusPanel>
      </div>
      <DelayValue>
        <TimeSpan timeSpan={delayDuration} displayPositiveSign={true} />
      </DelayValue>
      {largeSpace && (
        <IconContainer delayStatus={delayStatus}>
          <Break />
        </IconContainer>
      )}
    </Box>
  );
};

const textForDelayStatus = delayStatus => {
  switch (delayStatus) {
    case "early":
      return "en avance";
    case "ontime":
      return "à l'heure";
    case "late":
      return "en retard";
    default:
      return "...";
  }
};

const Box = styled.div`
  background: ${() => colors.dark.background};
  color: ${props => fontColorForDelayStatus(props.delayStatus)};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  margin-left: 2px;
`;

const PreText = styled.div`
  text-align: center;
  font-size: 0.7em;
`;

const DelayStatusPanel = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.6em;
  text-align: center;
`;

const DelayValue = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  font-weight: bold;
  font-size: 1.2em;
`;

const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin: 0 auto;
  padding-top: 0rem;
  svg {
    width: 2.4rem;
    height: 3.6rem;
    fill: ${props => fontColorForDelayStatus(props.delayStatus)};
  }
`;

export default DelayBox;
