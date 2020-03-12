import React from "react";
import styled from "styled-components";
import { TimeSpan } from "../time";
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
      <LeftArrow>
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
      </LeftArrow>
    </>
  );
};

const LeftArrow = styled.div`
  border-left: 6px dotted ${() => colors.dark.text.highlight};
`;

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
  left: -10px;
  top: -3px;

  margin-right: 3px;
  padding-top: 0rem;
  svg {
    width: 1.2rem;
    fill: ${() => colors.dark.text.highlight};
  }
`;

const Box = styled.div`
  background: ${() => colors.dark.panel.one.background};
  color: ${() => colors.dark.panel.one.text};
  display: flex;
  height: 100%;

  margin-left: 10px;
  border-radius: 0 0 3px 3px;

  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Text = styled.span`
  margin: 0 0.2rem;
  font-size: 1rem;
`;
const TimeSpanStyle = styled.span`
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
    fill: ${() => colors.dark.panel.one.text};
  }
`;

export default TravelBox;
