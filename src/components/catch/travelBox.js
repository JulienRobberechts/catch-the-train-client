import React from "react";
import TimeSpan from "../time/timeSpan";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Walk, CaretUp } from "../../design/icons";

const TravelBox = ({ travelDuration, travelDurationPercentage }) => {
  const largeSpace = travelDurationPercentage > 25;
  return (
    <>
      <CaretParent>
        <SubContainer>
          <IconCaretUpContainer>
            <CaretUp />
          </IconCaretUpContainer>
        </SubContainer>
      </CaretParent>
      <Box>
        <Text>trajet</Text>
        {largeSpace && (
          <IconContainer>
            <Walk />
          </IconContainer>
        )}
        <TimeSpanStyle>
          <TimeSpan timeSpan={travelDuration} />
        </TimeSpanStyle>
        <IconContainer>
          <Walk />
        </IconContainer>
      </Box>
    </>
  );
};

const CaretParent = styled.div`
  position: absolute;
  margin-right: 3px;
  height: 0% !important;
`;
const SubContainer = styled.div`
  position: relative;
  left: 3px;
`;
const IconCaretUpContainer = styled.div`
  position: relative;
  left: -0.6rem;

  margin-right: 3px;
  padding-top: 0rem;
  svg {
    width: 1.2rem;
    fill: ${() => colors.color6};
  }
`;

const Box = styled.div`
  background: ${() => colors.color4};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-left: 6px dotted ${() => colors.color6};
`;

const Text = styled.span`
  color: ${() => colors.color6};
  margin: 0 0.2rem;
  font-size: 1rem;
`;
const TimeSpanStyle = styled.span`
  color: ${() => colors.color6};
  margin: 0 0.2rem;
  font-size: 1.6rem;
`;
const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin-right: 0rem;
  padding-top: 0rem;
  svg {
    width: 2.4rem;
    height: 3.6rem;
    fill: ${() => colors.color6};
  }
`;

export default TravelBox;
