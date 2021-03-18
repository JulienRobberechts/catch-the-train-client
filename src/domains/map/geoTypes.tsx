export type MapPosition = [number, number];

export interface UserPosition {
  Last?: MapPosition;
  Unavailable?: boolean;
  PermissionDenied?: boolean;
}

export interface MapExactSize {
  width: number;
  height: number;
}

export interface ViewBounds {
  zoom: number;
  center: MapPosition;
}
