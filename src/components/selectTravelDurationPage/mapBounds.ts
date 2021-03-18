import { WebMercatorViewport } from "react-map-gl";
import {
  MapPosition,
  MapExactSize,
  ViewBounds,
} from "../../domains/map/geoTypes";

type DukePadding = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

const DefaultPadding : DukePadding = {
  top: 40,
  bottom: 40,
  left: 40,
  right: 40,
};

type WebMercatorViewportOptions = {
  // Map state
  width: number;
  height: number;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  pitch?: number;
  bearing?: number;
  altitude?: number;
  nearZMultiplier?: number;
  farZMultiplier?: number;
};


function convertRemToPixels(rem: number) : DukePadding {
   const margin = rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
   return {
    top: margin,
    bottom: margin,
    left: margin,
    right: margin,
  }
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
  padding: DukePadding = DefaultPadding
) => {
  const bounds: [MapPosition, MapPosition] = [position1, position2];
  const vp = new WebMercatorViewport(viewport);

  try {
    return vp.fitBounds(bounds, { padding });
  } catch (err) {
    return undefined;
  }
};
