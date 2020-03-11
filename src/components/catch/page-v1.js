import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";

import { SelectData } from "./logic/catchSelector";
import TrainRoute from "./trainRoute";
import DelayBox from "./delayBox";
import Timeline from "./timeline";
import Title from "./appTitle";

const CatchPage = () => {
  const {
    station,
    direction,
    nowTime,
    targetDuration,
    targetTime,
    travelDuration,
    travelDurationPercentage,
    delayDuration,
    waitingDuration,
    waitingDurationPercentage,
    delayType
  } = SelectData();

  return (
    <Page>
      <Title />
      <TrainRoute station={station} direction={direction} />
      <Timeline
        nowTime={nowTime}
        targetTime={targetTime}
        targetDuration={targetDuration}
        travelDuration={travelDuration}
        waitingDuration={waitingDuration}
        waitingDurationPercentage={waitingDurationPercentage}
        travelDurationPercentage={travelDurationPercentage}
      />
      <DelayBox delayDuration={delayDuration} delayType={delayType} />
    </Page>
  );
};

const Page = styled.div`
  background-color: ${() => colors.color1};
  height: 100vh;
  padding: 0.7rem;
`;

export default CatchPage;
