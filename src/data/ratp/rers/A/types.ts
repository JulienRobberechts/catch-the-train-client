export interface StationDefinition {
  name: string;
  slug: string;
}

export interface MissionStationDefinition {
  stations: StationDefinition[];
}
