import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import Time from "../time/time";
import { Clock } from "../../design/icons";

const NowBox = data => {
  console.log("data", data);
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
          <Time time={data.nowTime} displaySeconds />
        </TimeBigStyle>
      </Row2>
    </Box>
  );
};

const Box = styled.div`
  background: ${() => colors.color4};
  color: ${() => colors.color6};
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
  background: ${() => colors.color1};
  padding: 0 0.3rem;
`;
const Row1 = styled(Row)`
  background: ${() => colors.color1};
`;
const Row2 = styled(Row)`
  background: ${() => colors.color2};
`;

const TimeBigStyle = styled.span`
  color: ${() => colors.color6};
  margin-left: 0.3rem;
  font-size: calc(1rem + 2vw);
`;

const IconContainer = styled.span`
  svg {
    width: calc(0.6rem + 2vw);
    height: calc(0.6rem + 2vw);
    fill: ${() => colors.color6};
  }
`;

export default NowBox;
