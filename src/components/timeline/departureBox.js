import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Time, TimeSpan } from "../time";
import { Train, Sandglass } from "../../design/icons";

const DepartureBox = data => {
  console.log("data", data);
  return (
    <Box>
      <Row1>
        <TimeLegendText>Départ du train</TimeLegendText>
      </Row1>
      <Row2>
        <IconTrainContainer>
          <Train />
        </IconTrainContainer>
        <TimeBigStyle>
          <Time time={data.targetTime} />
        </TimeBigStyle>
      </Row2>
      <Row3>
        <IconSandglassContainer>
          <Sandglass />
        </IconSandglassContainer>
        <TimeSpanStyle>
          <TimeSpan timeSpan={data.targetDuration} />
        </TimeSpanStyle>
      </Row3>
    </Box>
  );
};

const Box = styled.div`
  background: ${() => colors.dark.panel.one.background};
  color: ${() => colors.dark.panel.one.text.normal};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 4px;
`;

const TimeLegendText = styled.span`
  font-size: 0.8rem;
  text-align: center;
  margin: 0 auto;
`;
const Row = styled.div`
  padding: 0 0.3rem;
`;
const Row1 = styled(Row)``;
const Row2 = styled(Row)``;
const Row3 = styled(Row)``;

const TimeBigStyle = styled.span`
  margin: 0 0.2rem;
  font-size: calc(1.5rem + 2vw);
`;

const IconTrainContainer = styled.span`
  svg {
    width: calc(0.9rem + 2vw);
    height: calc(0.9rem + 2vw);
    fill: ${() => colors.dark.panel.one.text.normal};
  }
`;

const TimeSpanStyle = styled.span`
  margin: 0 0.2rem;
  font-size: calc(1.2rem + 2vw);
`;

const IconSandglassContainer = styled.span`
  svg {
    width: calc(0.7rem + 2vw);
    height: calc(0.7rem + 2vw);
    fill: ${() => colors.dark.panel.one.text.normal};
  }
`;

export default DepartureBox;
