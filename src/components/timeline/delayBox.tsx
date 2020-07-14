import React from "react";
import moment from "moment";

import { TimeSpan } from "../time";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { getColorForDelayStatus } from "../delayDesign";
import DelayStatus from "../../domains/toTheStation/pure/delayStatus";

import { Break } from "../../design/icons";

interface Props {
  delayDuration: moment.Duration;
  delayStatus: DelayStatus;
  largeSpace: boolean;
}

const DelayBox: React.FC<Props> = ({
  delayDuration,
  delayStatus,
  largeSpace,
}) => {
  const delayStatusText = textForDelayStatus(delayStatus);

  const showWaitIcon = largeSpace && delayStatus === DelayStatus.Early;

  return (
    <Box delayStatus={delayStatus}>
      <div>
        <PreText>vous êtes</PreText>
        <DelayStatusPanel>{delayStatusText}</DelayStatusPanel>
      </div>
      <DelayValue>
        <TimeSpan timeSpan={delayDuration} displayPositiveSign={true} />
      </DelayValue>
      {showWaitIcon && (
        <IconContainer delayStatus={delayStatus}>
          <Break />
        </IconContainer>
      )}
    </Box>
  );
};

const textForDelayStatus = (delayStatus: DelayStatus) => {
  switch (delayStatus) {
    case DelayStatus.Early:
      return "en avance";
    case DelayStatus.OnTime:
      return "à l'heure";
    default:
      return "en retard";
  }
};

const Box = styled.div`
  background: ${() => colors.dark.background};
  color: ${(props: { delayStatus: DelayStatus }) =>
    getColorForDelayStatus(props.delayStatus)};
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
    fill: ${(props: { delayStatus: DelayStatus }) =>
      getColorForDelayStatus(props.delayStatus)};
  }
`;

export default DelayBox;
