import React from "react";
import styled from "styled-components";
import { MarkerUserIcon } from "./assets";

interface Props {
  size: number;
  disabled?: boolean;
}

const MarkerUser: React.FC<Props> = ({ size, disabled = false }) => {
  return (
    <MarkerContainerUser size={size} disabled={disabled}>
      <MarkerUserIcon />
    </MarkerContainerUser>
  );
};

const MarkerContainerUser = styled.div<{ size: number; disabled: boolean }>`
  position: relative;
  top: -${(props) => props.size * 0.65}rem;
  left: -${(props) => props.size * 0.5}rem;
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;

  svg {
    fill: ${(props) => (props.disabled ? "#5b5a59" : "#00aaaa")};
  }

  svg #circle {
    fill: ${(props) => (props.disabled ? "#5b5a59" : "#e0ab19")};
  }
`;
export default MarkerUser;
