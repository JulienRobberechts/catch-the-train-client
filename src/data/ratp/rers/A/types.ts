import { Coordinates } from "viewport-mercator-project";

export interface StationDefinition {
  slug: string;
  name: string;
  altName?: string;
  pos?: Coordinates;
}

export interface MissionStationDefinition {
  stations: StationDefinition[];
}
