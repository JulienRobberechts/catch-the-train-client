import React from "react";
import styled from "styled-components";
import { MarkerStationIcon } from "./assets";

interface Props {
  size: number;
  disabled?: boolean;
}

const MarkerStation: React.FC<Props> = ({ size, disabled = false }) => {
  return (
    <MarkerContainerUser size={size} disabled={disabled}>
      <MarkerStationIcon />
    </MarkerContainerUser>
  );
};

const MarkerContainerUser = styled.div<{ size: number; disabled: boolean }>`
  position: relative;
  top: -${(props) => props.size}rem;
  left: -${(props) => props.size * 0.5}rem;
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;

  svg {
    fill: ${(props) => (props.disabled ? "#5b5a59" : "#e0ab19")};
  }

  svg #circle {
    fill: ${(props) => (props.disabled ? "#5b5a59" : "#e0ab19")};
  }
`;
export default MarkerStation;
