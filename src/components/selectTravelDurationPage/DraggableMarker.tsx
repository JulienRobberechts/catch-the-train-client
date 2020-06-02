import React from "react";
import styled from "styled-components";
import { Marker } from "react-map-gl";
import { MapPosition } from "../../domains/map/geoTypes";

interface Props {
  markerPosition: MapPosition | undefined;
  onMarkerMoved?: (position: MapPosition) => void;
}

const DraggableMarker: React.FC<Props> = ({
  markerPosition,
  onMarkerMoved,
  children,
}) => {
  return (
    <>
      {markerPosition && (
        <MarkerWithVisibility
          latitude={markerPosition[1]}
          longitude={markerPosition[0]}
          draggable
          onDragEnd={(newMarkerPosition) => {
            if (newMarkerPosition.lngLat && onMarkerMoved)
              onMarkerMoved(newMarkerPosition.lngLat);
          }}
        >
          {children}
        </MarkerWithVisibility>
      )}
    </>
  );
};

const MarkerWithVisibility = styled(Marker)`
  visibility: hidden; // to hide the original position

  * {
    visibility: visible; // to show the new position
  }
`;

export default DraggableMarker;
