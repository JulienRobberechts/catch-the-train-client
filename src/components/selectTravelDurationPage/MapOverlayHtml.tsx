import React from "react";
import styled from "styled-components";
import { HTMLOverlay, HTMLRedrawOptions } from "react-map-gl";
import { MapPosition } from "../../domains/map/geoTypes";

interface Props {
  position: MapPosition | undefined;
}

const redrawOverlayHTML = (
  children: React.ReactNode,
  position: MapPosition | undefined
) => ({ project }: HTMLRedrawOptions) => {
  if (!position) return;

  const [cx, cy] = project(position);

  return (
    <AbsoluteDiv left={cx} top={cy}>
      {children}
    </AbsoluteDiv>
  );
};

const MapOverlayHtml: React.FC<Props> = ({ children, position }) => {
  return <HTMLOverlay redraw={redrawOverlayHTML(children, position)} />;
};

const AbsoluteDiv = styled.div<{ left: number; top: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

export default MapOverlayHtml;
