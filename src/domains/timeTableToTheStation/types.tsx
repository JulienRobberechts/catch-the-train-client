import moment from "moment";
import DelayStatus from "../toTheStation/pure/delayStatus";
import { RawDeparture } from "../timeTable/types";

export interface EnhanceTimeTable {
  currentDeparture?: {
    index: number;
    code: string;
  };
  travel?: {
    nowTime: moment.Moment;
    travelDuration: moment.Duration;
    accessDuration: moment.Duration;
  };
  enhancedDepartures?: EnhancedDeparture[];
}

export interface EnhancedDeparture {
  departureIndex: number;
  trainCode: string;
  departure: RawDeparture;

  departureTime: moment.Moment;
  departureDuration: moment.Duration;

  delayDuration: moment.Duration;
  delayStatus: DelayStatus;
  onTimeMarginDelaySeconds: number;
}
