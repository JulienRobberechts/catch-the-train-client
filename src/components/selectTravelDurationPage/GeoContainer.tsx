import React from "react";
import { usePosition } from "./usePosition";
import Map from "./Map";
import MapLayers from "./MapLayers";
import MapControls from "./MapControls";
import { getCenteredViewBounds } from "./mapBounds";
import {
  MapExactSize,
  ViewBounds,
  MapPosition,
} from "../../domains/map/geoTypes";
import DraggableMarker from "./DraggableMarker";
import MarkerUser from "./MarkerUser";
import MapOverlayHtml from "./MapOverlayHtml";
import MarkerStation from "./MarkerStation";
import getDirection from "../../domains/direction/getDirection";

interface Props {
  mapExactSize: MapExactSize;
  backgroundColor: string;
  initialStationPosition: MapPosition;
  onRouteDurationChanged: (newRoute: number) => void;
}

// Responsible for geographic calculation:
// - keep track of the viewBounds
// - user Position
// - recenter the map (ViewBounds)
const GeoContainer: React.FC<Props> = ({
  mapExactSize,
  backgroundColor,
  initialStationPosition,
  onRouteDurationChanged,
}) => {
  const [userDetectedPosition, updateUserDetectedPosition] = usePosition();
  const [userOfficialPosition, setUserOfficialPosition] = React.useState<
    MapPosition | undefined
  >();
  const [stationPosition, setStationPosition] = React.useState<MapPosition>(
    initialStationPosition
  );

  const defaultViewBounds = {
    zoom: 15.5,
    center: stationPosition,
  };

  const [viewBounds, setViewBounds] = React.useState<ViewBounds>(
    defaultViewBounds
  );

  // each time the detect position is updated, the Official Position follow
  React.useEffect(() => {
    if (userDetectedPosition.Last) {
      setUserOfficialPosition(userDetectedPosition.Last);
    }
  }, [userDetectedPosition]);

  // first time we detect a position it become the official position
  React.useEffect(() => {
    if (userDetectedPosition.Last && !userOfficialPosition) {
      setUserOfficialPosition(userDetectedPosition.Last);
    }
  }, [userDetectedPosition, userOfficialPosition]);

  // each time the userOfficialPosition change (first time or updated), we update the ViewBounds
  React.useEffect(() => {
    if (userOfficialPosition) {
      const newViewBounds = getCenteredViewBounds(
        userOfficialPosition,
        stationPosition,
        mapExactSize
      );
      if (newViewBounds) setViewBounds(newViewBounds);
    }
  }, [userOfficialPosition, stationPosition, mapExactSize]);

  const [route, setRoute] = React.useState<any>(undefined);

  // each time the userOfficialPosition or stationPosition change, we update the route
  React.useEffect(() => {
    if (!userOfficialPosition || !stationPosition) return;
    const updateDirection = async () => {
      const newRoute = await getDirection(
        userOfficialPosition,
        stationPosition
      );
      setRoute(newRoute);
      onRouteDurationChanged(newRoute?.duration);
    };
    updateDirection();
  }, [userOfficialPosition, stationPosition, onRouteDurationChanged]);

  return (
    <Map
      backgroundColor={backgroundColor}
      viewBounds={viewBounds}
      mapExactSize={mapExactSize}
      onViewBoundsChange={(viewBounds: ViewBounds) => {
        setViewBounds(viewBounds);
      }}
      onFirstClick={(position) => {
        if (!userOfficialPosition) setUserOfficialPosition(position);
      }}
    >
      <MapOverlayHtml position={userDetectedPosition.Last}>
        <MarkerUser size={4} disabled />
      </MapOverlayHtml>
      <MapOverlayHtml position={initialStationPosition}>
        <MarkerStation size={3} disabled />
      </MapOverlayHtml>

      <MapLayers selectedRoute={route} />
      <DraggableMarker
        markerPosition={userOfficialPosition}
        onMarkerMoved={setUserOfficialPosition}
      >
        <MarkerUser size={4} />
      </DraggableMarker>
      <DraggableMarker
        markerPosition={stationPosition}
        onMarkerMoved={setStationPosition}
      >
        <MarkerStation size={3} />
      </DraggableMarker>
      <MapControls
        updateUserPosition={updateUserDetectedPosition}
        selectedRoute={route}
        userPosition={userDetectedPosition}
        showGpsMessage={!userOfficialPosition}
      />
    </Map>
  );
};

export default GeoContainer;
