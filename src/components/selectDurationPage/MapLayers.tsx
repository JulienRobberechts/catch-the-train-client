import React from "react";
import { Layer, LayerProps, Source } from "react-map-gl";

const getGeojsonLineString = (
  coordinates: GeoJSON.Position[]
): GeoJSON.FeatureCollection<GeoJSON.LineString> => {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      },
    ],
  };
};

const layerDirection: LayerProps = {
  id: "route",
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#00aaaa",
    "line-width": 5,
    "line-opacity": 0.75,
  },
};

interface Props {
  selectedRoute: any;
}

const MapLayers: React.FC<Props> = ({ selectedRoute }) => {
  return (
    <>
      {selectedRoute && (
        <Source
          id="route"
          type="geojson"
          data={getGeojsonLineString(selectedRoute.geometry.coordinates)}
        >
          <Layer {...layerDirection} />
        </Source>
      )}
    </>
  );
};

export default MapLayers;
