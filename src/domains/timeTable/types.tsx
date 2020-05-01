export interface ReduxStateTimeTable {
  loading?: boolean;
  error?: any;
  data?: { departures: RawDeparture[] };
}

export interface RawDeparture {
  trainCode: string;
  departureTime?: string;
  platform?: string;
  isDeparture?: boolean;
  mission?: string;
  displayAttributes?: string;
  displayDestination?: string;
}
