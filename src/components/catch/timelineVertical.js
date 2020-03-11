import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import DepartureBox from "./departureBox";
import DelayBox from "./delayBox";
import WaitingBox from "./waitingBox";
import TravelBox from "./travelBox";
import NowBox from "./nowBox";

const TimelineVertical = data => {
  return (
    <TwoColumnLayout>
      <ColumnLeft>
        <TimeColumnLayout>
          <DepartureBox {...data} />
          <NowBox {...data} />
        </TimeColumnLayout>
      </ColumnLeft>
      <ColumnMargin></ColumnMargin>
      <ColumnRight>
        <DurationColumnLayout>
          <DelayBox {...data} />
          <WaitingBox {...data} />
          <TravelBox {...data} />
        </DurationColumnLayout>
      </ColumnRight>
    </TwoColumnLayout>
  );
};

const TwoColumnLayout = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: yellow;
  flex-grow: 2;
`;

const ColumnLeft = styled.div`
  flex-basis: 50%;
  background-color: ${() => colors.color2};
`;

const TimeColumnLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

const ColumnMargin = styled.div`
  background-color: purple;
  width: 5px;
  display: flex;
  flex-direction: column;
`;

const ColumnRight = styled.div`
  flex-basis: 50%;
  background-color: ${() => colors.color2};
  display: flex;
  flex-direction: column;
`;

const DurationColumnLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

export default TimelineVertical;
