import moment from "moment";

export interface enhanceTimeTable {
  currentDeparture?: {
    index: number;
    code: string;
  };
  travel?: {
    nowTime: moment.Moment;
    travelDuration: moment.Duration;
    accessDuration: moment.Duration;
  };
  enhancedDepartures?: enhancedDeparture[];
}

export interface enhancedDeparture {
  departure: string;
  departureIndex: string;
  nowTime: string;
  onTimeMarginDelaySeconds: string;
  travelDuration: string;
  accessDuration: string;
}
