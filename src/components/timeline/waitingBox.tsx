import React from "react";
import { TimeSpan } from "../time";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Station, CaretUp } from "../../design/icons";
import moment from "moment";

interface Props {
  accessDuration: moment.Duration;
  largeSpace: boolean;
}

const WaitingBox : React.FC<Props>= ({ accessDuration, largeSpace }) => {
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
          <Text>en gare</Text>
          <TimeSpan timeSpan={accessDuration} />
          {largeSpace && (
            <IconContainer>
              <Station />
            </IconContainer>
          )}
        </Box>
      </LeftArrow>
    </>
  );
};

const LeftArrow = styled.div`
  border-left: 3px dashed ${() => colors.dark.text.highlight};
  margin-left: 1px;
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
  top: -5px;

  margin-right: 3px;
  padding-top: 0rem;
  svg {
    width: 1.2rem;
    fill: ${() => colors.dark.text.highlight};
  }
`;

const Box = styled.div`
  background: ${() => colors.dark.panel.special.background};
  color: ${() => colors.dark.panel.special.text.normal};
  height: 100%;

  margin-left: 12px;
  border-radius: 3px 3px 0 0;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Text = styled.span`
  margin: 0 0.2rem;
  font-size: 1rem;
`;

const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin-right: 0rem;
  padding-top: 0rem;
  svg {
    width: 2.4rem;
    height: 3.6rem;
    fill: ${() => colors.dark.panel.special.text.normal};
  }
`;

export default WaitingBox;
