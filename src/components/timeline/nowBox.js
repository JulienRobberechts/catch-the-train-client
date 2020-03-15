import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Time } from "../time";
import { Clock } from "../../design/icons";

const NowBox = ({ nowTime }) => {
  return (
    <Box>
      <Row1>
        <TimeLegendText>Il est exactement</TimeLegendText>
      </Row1>
      <Row2>
        <IconContainer>
          <Clock />
        </IconContainer>
        <TimeBigStyle>
          <Time time={nowTime} displaySeconds />
        </TimeBigStyle>
      </Row2>
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

const TimeBigStyle = styled.span`
  margin-left: 0.3rem;
  font-size: calc(1rem + 2vw);
`;

const IconContainer = styled.span`
  svg {
    width: calc(0.6rem + 2vw);
    height: calc(0.6rem + 2vw);
    fill: ${() => colors.dark.panel.one.text.normal};
  }
`;

export default NowBox;
