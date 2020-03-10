import React from "react";
import getIcon from "./timeIcons";
import styled from "styled-components";
import { colors } from "../../design/colors";

const Time = ({ time, icon: iconName = "clock" }) => {
  const Icon = getIcon(iconName);

  return (
    <span>
      <IconContainer>
        <Icon />
      </IconContainer>
      <TimeText>
        <span>{time.hours()}</span>
        <span>h</span>
        <span>{time.minutes()}</span>
      </TimeText>
    </span>
  );
};

const TimeText = styled.span`
  font-size: 1.3em;
  color: ${() => colors.color6};
`;

const IconContainer = styled.span`
  vertical-align: text-bottom;
  margin-right: 0.2rem;
  svg {
    width: 1.6rem;
    height: 1.6rem;
    color: ${() => colors.color6};
  }
`;

export default Time;
