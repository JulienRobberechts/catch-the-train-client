import React from "react";
import MapGL, { ViewportProps } from "react-map-gl";
import config from "../../config";
import {
  MapExactSize,
  ViewBounds,
  MapPosition,
} from "../../domains/map/geoTypes";

const getViewBoundsFromViewport = (viewport: ViewportProps): ViewBounds => {
  return {
    zoom: viewport.zoom || 17,
    center: [viewport.longitude || 0, viewport.latitude || 0],
  };
};

interface Props {
  mapExactSize: MapExactSize;
  viewBounds: ViewBounds;
  onViewBoundsChange: (viewBounds: ViewBounds) => void;
  backgroundColor: string;
  onFirstClick: (position: MapPosition) => void;
}

const Map: React.FC<Props> = ({
  children,
  mapExactSize,
  viewBounds,
  onViewBoundsChange,
  backgroundColor,
  onFirstClick,
}) => {
  const [isFirstClick, setIsFirstClick] = React.useState<boolean>(true);

  return (
    <MapGL
      style={{ backgroundColor: backgroundColor }}
      width={mapExactSize.width}
      height={mapExactSize.height}
      longitude={viewBounds.center[0]}
      latitude={viewBounds.center[1]}
      zoom={viewBounds.zoom}
      minZoom={12}
      maxZoom={20}
      mapboxApiAccessToken={config.MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onViewportChange={(viewport : ViewportProps) => {
        const newViewBounds = getViewBoundsFromViewport(viewport);
        onViewBoundsChange(newViewBounds);
      }}
      reuseMaps={false}
      onClick={(position) => {
        if (isFirstClick) {
          setIsFirstClick(false);
          onFirstClick(position.lngLat);
        }
      }}
    >
      {children}
    </MapGL>
  );
};

export default Map;
