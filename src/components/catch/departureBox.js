import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import Time from "./time";
import TimeSpan from "./timeSpan";
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
  color: ${() => colors.color6};
  display: flex;
  flex-direction: column;
  align-items: stretch;

  padding: 4px;

  background: ${() => colors.color3};
`;

const TimeLegendText = styled.span`
  font-size: 0.8rem;
  text-align: center;
  margin: 0 auto;
`;
const Row = styled.div`
  background: ${() => colors.color1};
  padding: 0 0.3rem;
`;
const Row1 = styled(Row)`
  background: ${() => colors.color1};
`;
const Row2 = styled(Row)`
  background: ${() => colors.color2};
`;
const Row3 = styled(Row)`
  background: ${() => colors.color4};
`;

const TimeBigStyle = styled.span`
  color: ${() => colors.color6};
  margin: 0 0.2rem;
  font-size: calc(1.5rem + 2vw);
`;

const IconTrainContainer = styled.span`
  svg {
    width: calc(0.9rem + 2vw);
    height: calc(0.9rem + 2vw);
    color: ${() => colors.color6};
  }
`;

const TimeSpanStyle = styled.span`
  color: ${() => colors.color6};
  margin: 0 0.2rem;
  font-size: calc(1.2rem + 2vw);
`;

const IconSandglassContainer = styled.span`
  svg {
    width: calc(0.7rem + 2vw);
    height: calc(0.7rem + 2vw);
    color: ${() => colors.color6};
  }
`;

export default DepartureBox;
