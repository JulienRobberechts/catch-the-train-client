import { WebMercatorViewport } from "react-map-gl";
import { WebMercatorViewportOptions, Padding } from "viewport-mercator-project";
import {
  MapPosition,
  MapExactSize,
  ViewBounds,
} from "../../domains/map/geoTypes";

function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
const defaultBoundsPaddingRem = 7;
const defaultBoundsPaddingPx = convertRemToPixels(defaultBoundsPaddingRem);

export const getCenteredViewBounds = (
  position1: MapPosition,
  position2: MapPosition,
  mapExactSize: MapExactSize
): ViewBounds | undefined => {
  const viewportOptions = {
    width: mapExactSize.width,
    height: mapExactSize.height,
    longitude: position1[0],
    latitude: position1[1],
  };

  const newViewport = adjustViewport(
    viewportOptions,
    position1,
    position2,
    defaultBoundsPaddingPx
  );

  if (!newViewport) return undefined;
  return {
    zoom: newViewport.zoom,
    center: [newViewport.longitude, newViewport.latitude],
  };
};

const adjustViewport = (
  viewport: WebMercatorViewportOptions,
  position1: MapPosition,
  position2: MapPosition,
  padding: Padding = 40
) => {
  const bounds: [MapPosition, MapPosition] = [position1, position2];
  const vp = new WebMercatorViewport(viewport);

  try {
    return vp.fitBounds(bounds, { padding });
  } catch (err) {
    return undefined;
  }
};
