export interface ReduxStateStation {
  userConfiguration: UserConfiguration;
  stationConfigurations: StationConfigurationMap;
}

export interface StationConfigurationMap {
  [stationSlug: string]: StationConfiguration;
}

export interface StationConfiguration {
  travelDurationSeconds: number;
  accessDurationSeconds: number;
}

export interface StationConfigurationWithStation {
  station: string;
  travelDurationSeconds: number;
  accessDurationSeconds: number;
}

export interface PayloadStationConfiguration {
  station: string;
  travelDurationSeconds: number;
  accessDurationSeconds?: number;
}

export interface UserConfiguration {
  onTimeMarginDelaySeconds: number;
  timezone?: string;
}
