import { MapPosition } from "../../../../domains/map/geoTypes";

export interface StationDefinition {
  slug: string;
  name: string;
  altName?: string;
  pos?: MapPosition;
}

export interface LineDefinition {
  network: string;
  line: string;
  stations: StationDefinition[];
}
